using UnityEngine;
using System.Collections;

namespace klaim
{
    public class ScrollingBackground : Background
    {
        public GameObject tile_prefab;
        public int min_tiles_per_side = 3;

        public Vector2 overlap;
        public Vector3 offset;
        public Vector3 velocity;
        public Vector3 acceleration;
        public float rotation = 0.0f;
        public float max_acceleration = 2.0f;
        public float max_speed = 2.0f;

        public float random_max_acceleration = 2.0f;
        public float random_max_speed = 2.0f;
        public float random_max_rotation = 0.0f;
        public float random_changes_every_secs = 10.0f;

        public float camera_view_size_per_side = GameCamera.SIZE_PER_SIDE;

        public bool change_movement_randomly = false;
        private IEnumerator current_random_coroutine;

        private GameObject[] tiles;
        private float tile_size;
        private float half_tile_size;
        private int tiles_per_side = 0;
        private float side_size = 0;
        private float half_side_size = 0;
        private float double_side_size = 0;
        private float tile_adjust_offset = 0;
        private float grid_diagonal = 0;
        private float tile_limit = 0;
        private float offset_limit = 0;


        new void Start()
        {
            base.Start();

            if (tile_prefab == null)
                Debug.LogError("Missing tile prefab!");


            create_tile_grid();
        }

        new void Update()
        {
            base.Update();

            if (change_movement_randomly)
                start_random_changes(random_changes_every_secs);
            else
                stop_random_changes();

            move();
            update_tiles_positions();
        }

        private void change_randomly()
        {
            max_acceleration = Random.value * random_max_acceleration;
            max_speed = Random.value * random_max_speed;

            var random_acceleration_x = Random.Range(-random_max_acceleration, random_max_acceleration);
            var random_acceleration_y = Random.Range(-random_max_acceleration, random_max_acceleration);
            acceleration = new Vector3(random_acceleration_x, random_acceleration_y, 0.0f);

            rotation = Random.Range(-random_max_rotation, random_max_rotation);
        }

        private IEnumerator update_random_changes(float interval_secs)
        {
            while (true)
            {
                change_randomly();
                yield return new WaitForSeconds(interval_secs);
            }
        }

        private void start_random_changes(float interval_secs)
        {
            if (current_random_coroutine != null)
                return;

            current_random_coroutine = update_random_changes(interval_secs);
            StartCoroutine(current_random_coroutine);
        }

        private void stop_random_changes()
        {
            if (current_random_coroutine != null)
            {
                StopCoroutine(current_random_coroutine);
                current_random_coroutine = null;
            }
        }


        private void move()
        {
            // Apply rotation first
            var keep_position = transform.position;
            transform.Rotate(Vector3.forward, rotation * Time.deltaTime, Space.Self);
            transform.position = keep_position; // Make sure the rotation doesn't change the referential's position in the world.


            acceleration = Vector3.ClampMagnitude(acceleration, max_acceleration);

            var local_acceleration = acceleration * Time.deltaTime;
            var next_velocity = velocity + local_acceleration;
            if (next_velocity.magnitude > max_speed)
            { // When the max speed changed to a lower speed than currently, we try to adjust by steering.
                var speed_difference = Mathf.Abs(next_velocity.magnitude - max_speed);
                if (speed_difference > 0.2f)
                {
                    var steering = Vector3.ClampMagnitude(local_acceleration * speed_difference, max_speed);
                    next_velocity = velocity - steering;
                }

                next_velocity = Vector3.ClampMagnitude(next_velocity, max_speed);
            }
            velocity = next_velocity;

            offset += velocity;
            offset = warp_around_limit(offset, double_side_size, double_side_size);
        }

        private static float diagonal_of_square(float side_length)
        {
            return Mathf.Sqrt(Mathf.Pow(side_length, 2.0f) + Mathf.Pow(side_length, 2.0f));
        }

        private void create_tile_grid()
        {
            // Here we assume that the camera will always be a square.
            tile_size = calculate_size(tile_prefab);
            half_tile_size = tile_size / 2.0f;
            tiles_per_side = Mathf.CeilToInt((camera_view_size_per_side) / tile_size) + 2;
            tiles_per_side = Mathf.Max(min_tiles_per_side, tiles_per_side);
            side_size = tiles_per_side * tile_size;
            half_side_size = side_size / 2.0f;
            double_side_size = side_size * 2.0f;
            grid_diagonal = diagonal_of_square(side_size);
            //tile_limit = (grid_diagonal / 2) - (diagonal_of_square(tile_size) / 2); // TODO: reactivate when rotation is not buggy anymore
            tile_limit = half_side_size + half_tile_size;
            tile_adjust_offset = half_side_size - half_tile_size;

            int required_tiles_count = tiles_per_side * tiles_per_side;

            tiles = new GameObject[required_tiles_count];

            for (int tile_idx = 0; tile_idx < tiles.Length; ++tile_idx)
            {
                tiles[tile_idx] = create_tile();

                const string name_format = "tile_{0}";
                tiles[tile_idx].name = string.Format(name_format, tile_idx);
            }

            update_tiles_positions();
        }

        private GameObject create_tile()
        {
            return GameObject.Instantiate(tile_prefab, this.transform);
        }

        private float warp_around_limit(float pos, float limit, float adjustment)
        {
            const int max_warp_count = 10;
            int warp_count = 0;

            while(Mathf.Abs(pos) > limit)
            {
                float sign = Mathf.Sign(pos);
                float reversed_sign = -sign;

                float correction = reversed_sign * adjustment;
                pos += correction;

                if (adjustment > limit * 2) // Avoids infinite loop when big tiles are moved away
                    break;

                ++warp_count;
                if (warp_count == max_warp_count) // This is to help debugging infinite loop
                {
                    Debug.LogErrorFormat("BACKGROUND WARP COUNT > {0}", max_warp_count);
                }
                if (warp_count > max_warp_count * 2) // This is to avoid the infinite loop
                {
                    break;
                }
            }
            return pos;
        }

        private Vector3 warp_around_limit(Vector3 pos, float limit, float adjustment)
        {
            pos.x = warp_around_limit(pos.x, limit, adjustment);
            pos.y = warp_around_limit(pos.y, limit, adjustment);
            return pos;
        }

        private Vector3 tile_position(int tile_idx)
        {
            int grid_x = tile_idx % tiles_per_side;
            int grid_y = tile_idx / tiles_per_side;

            float x = grid_x * (tile_size + overlap.x);
            float y = -grid_y * (tile_size + overlap.y);

            x -= tile_adjust_offset;
            y += tile_adjust_offset;

            var pos = new Vector3(x, y, 0.0f);
            pos += offset;

            pos = warp_around_limit(pos, tile_limit, side_size);

            return pos;
        }

        private void update_tiles_positions()
        {
            for (int tile_idx = 0; tile_idx < tiles.Length; ++tile_idx)
            {
                var new_pos = tile_position(tile_idx);
                tiles[tile_idx].transform.localPosition = new_pos;
            }
        }

        private static float calculate_size(GameObject obj)
        {

            float size = 0.0f;
            var renderers = obj.GetComponentsInChildren<Renderer>();
            foreach (var renderer in renderers)
            {
                size = Mathf.Max(renderer.bounds.size.x, renderer.bounds.size.y, size);
            }

            //Debug.Log("calculate_size for " + obj.name + " is " + size);

            return size;
        }
    }

}