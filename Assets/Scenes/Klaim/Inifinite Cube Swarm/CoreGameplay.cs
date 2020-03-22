using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace klaim
{
    public class CoreGameplay : MonoBehaviour
    {
        private struct Tile
        {
            public Transform tile;
            public Transform boundaries;
            public Transform cube;
            public Transform center;
        };

        private Tile[] puzzle_tiles;
        private Transform global_light;

        public float resize_speed = 1.0f;
        public float resize_min = 0.5f;
        public float resize_max = 1.0f;

        public Vector3 rotation_speed = Vector3.one;

        public float x_axis_move_speed = 1.0f;
        public float x_axis_min = 0.0f;
        public float x_axis_max = 1.0f;

        public Vector3 color_translate_speed = Vector3.one * 0.5f;
        public Vector3 color_min = Vector3.zero;
        public Vector3 color_max = Vector3.one;


        struct KeyAction
        {
            public delegate void Action();

            public KeyCode key;
            public Action action;

            public KeyAction(KeyCode key, Action action)
            {
                this.key = key;
                this.action = action;
            }

        }

        private KeyAction[] key_actions;

        private enum EvenOrOdd
        {
            Even, Odd
        }

        // Start is called before the first frame update
        void Start()
        {
            global_light = GameObject.Find("Directional Light").transform;
            reset_puzzle_tiles();

            KeyCode[] keys = new KeyCode[]
            {
                KeyCode.A, KeyCode.B, KeyCode.C, KeyCode.D, KeyCode.E, KeyCode.F, KeyCode.G, KeyCode.H, KeyCode.I, KeyCode.J, KeyCode.K, KeyCode.L, KeyCode.M,
                KeyCode.N, KeyCode.O, KeyCode.P, KeyCode.Q, KeyCode.R, KeyCode.S, KeyCode.T, KeyCode.U, KeyCode.V, KeyCode.W, KeyCode.X, KeyCode.Y, KeyCode.Z,
                KeyCode.Alpha0, KeyCode.Alpha1, KeyCode.Alpha2, KeyCode.Alpha3, KeyCode.Alpha4, KeyCode.Alpha5, KeyCode.Alpha6, KeyCode.Alpha7, KeyCode.Alpha8, KeyCode.Alpha9
            };
            shuffle(ref keys);

            key_actions = new KeyAction[]
            {
                new KeyAction( keys[0],  ()=> resize_puzzle_tiles(1.0f) ),
                new KeyAction( keys[1],  ()=> resize_puzzle_tiles(-1.0f) ),
                new KeyAction( keys[2],  ()=> rotate_puzzle_tiles_cubes(Vector3.left) ),
                new KeyAction( keys[3],  ()=> rotate_puzzle_tiles_cubes(Vector3.right) ),
                new KeyAction( keys[4],  ()=> rotate_puzzle_tiles_cubes(Vector3.up) ),
                new KeyAction( keys[5],  ()=> rotate_puzzle_tiles_cubes(Vector3.down) ),
                new KeyAction( keys[6],  ()=> rotate_puzzle_tiles_cubes(Vector3.forward) ),
                new KeyAction( keys[7],  ()=> rotate_puzzle_tiles_cubes(Vector3.back) ),
                new KeyAction( keys[8],  ()=> move_puzzle_tiles_along_x_axis(1.0f) ),
                new KeyAction( keys[9],  ()=> move_puzzle_tiles_along_x_axis(-1.0f) ),
                new KeyAction( keys[10], ()=> rotate_puzzle_tiles(Vector3.right) ),
                new KeyAction( keys[11], ()=> rotate_puzzle_tiles(Vector3.left) ),
                new KeyAction( keys[12], ()=> rotate_puzzle_tiles(Vector3.forward) ),
                new KeyAction( keys[13], ()=> rotate_puzzle_tiles(Vector3.back) ),
                new KeyAction( keys[14], ()=> rotate_light(Vector3.left) ),
                new KeyAction( keys[15], ()=> rotate_light(Vector3.right) ),
                new KeyAction( keys[16], ()=> rotate_light(Vector3.up) ),
                new KeyAction( keys[17], ()=> rotate_light(Vector3.down) ),
                new KeyAction( keys[18], ()=> translate_color_of_tiles_cubes(Vector3.left, EvenOrOdd.Even) ),
                new KeyAction( keys[19], ()=> translate_color_of_tiles_cubes(Vector3.right, EvenOrOdd.Even) ),
                new KeyAction( keys[20], ()=> translate_color_of_tiles_cubes(Vector3.up, EvenOrOdd.Even) ),
                new KeyAction( keys[21], ()=> translate_color_of_tiles_cubes(Vector3.down, EvenOrOdd.Even) ),
                new KeyAction( keys[22], ()=> translate_color_of_tiles_cubes(Vector3.forward, EvenOrOdd.Even) ),
                new KeyAction( keys[23], ()=> translate_color_of_tiles_cubes(Vector3.back, EvenOrOdd.Even) ),
                new KeyAction( keys[24], ()=> translate_color_of_tiles_cubes(Vector3.left, EvenOrOdd.Odd) ),
                new KeyAction( keys[25], ()=> translate_color_of_tiles_cubes(Vector3.right, EvenOrOdd.Odd) ),
                new KeyAction( keys[26], ()=> translate_color_of_tiles_cubes(Vector3.up, EvenOrOdd.Odd) ),
                new KeyAction( keys[27], ()=> translate_color_of_tiles_cubes(Vector3.down, EvenOrOdd.Odd) ),
                new KeyAction( keys[28], ()=> translate_color_of_tiles_cubes(Vector3.forward, EvenOrOdd.Odd) ),
                new KeyAction( keys[29], ()=> translate_color_of_tiles_cubes(Vector3.back, EvenOrOdd.Odd) ),
            };
        }

        // Update is called once per frame
        void Update()
        {
            reset_puzzle_tiles();

            foreach (var key_action in key_actions)
            {
                if (Input.GetKey(key_action.key))
                    key_action.action();
            }

            // TODO: Remove this in the final game
            if (Input.GetKey(KeyCode.DownArrow))
                resize_puzzle_tiles(-1.0f);
            if (Input.GetKey(KeyCode.UpArrow))
                resize_puzzle_tiles(1.0f);

        }

        public static void shuffle<T>(ref T[] array)
        {
            int n = array.Length;
            while (n > 1)
            {
                int k = Random.Range(0, n--);
                T temp = array[n];
                array[n] = array[k];
                array[k] = temp;
            }
        }

        void reset_puzzle_tiles()
        {
            var tiles = GameObject.FindGameObjectsWithTag("puzzle_tile");
            if (tiles.Length == 0 || (puzzle_tiles != null && tiles.Length == puzzle_tiles.Length))
                return; // Delay to later call

            puzzle_tiles = new Tile[tiles.Length];

            for (int i = 0; i < puzzle_tiles.Length; i++)
            {
                puzzle_tiles[i].tile = tiles[i].transform;
                puzzle_tiles[i].boundaries = puzzle_tiles[i].tile.GetChild(0);
                puzzle_tiles[i].cube = puzzle_tiles[i].boundaries.GetChild(0);
                puzzle_tiles[i].center = puzzle_tiles[i].boundaries.GetChild(1);
            }
        }

        void resize_puzzle_tiles(float factor)
        {
            var growth = factor * (resize_speed * Time.deltaTime);
            var max_scale = Vector3.one * resize_max;
            var min_scale = Vector3.one * resize_min;

            foreach (var tile in puzzle_tiles)
            {
                var new_scale = tile.cube.localScale + new Vector3(growth, growth, growth);
                new_scale = Vector3.Min(new_scale, max_scale);
                new_scale = Vector3.Max(new_scale, min_scale);
                tile.cube.localScale = new_scale;
            }
        }

        void rotate_puzzle_tiles_cubes(Vector3 factor)
        {
            var rotation = rotation_speed * Time.deltaTime;
            rotation.x *= factor.x;
            rotation.y *= factor.y;
            rotation.z *= factor.z;

            foreach (var tile in puzzle_tiles)
            {
                tile.cube.Rotate(rotation);
                tile.center.Rotate(rotation);
            }
        }

        void rotate_light(Vector3 factor)
        {
            var rotation = rotation_speed * Time.deltaTime;
            rotation.x *= factor.x;
            rotation.y *= factor.y;
            rotation.z *= factor.z;

            global_light.Rotate(rotation);
        }

        void move_puzzle_tiles_along_x_axis(float factor)
        {
            var max_pos = Vector3.right * x_axis_max;
            var min_pos = Vector3.right * x_axis_min;

            var speed = factor * (x_axis_move_speed * Time.deltaTime);
            var translation = Vector3.right * speed;

            foreach (var tile in puzzle_tiles)
            {
                var new_position = tile.cube.localPosition + translation;
                new_position = Vector3.Min(new_position, max_pos);
                new_position = Vector3.Max(new_position, min_pos);
                tile.cube.localPosition = new_position;
            }
        }

        void rotate_puzzle_tiles(Vector3 factor)
        {
            var rotation = rotation_speed * Time.deltaTime;
            rotation.x *= factor.x;
            rotation.y *= factor.y;
            rotation.z *= factor.z;

            foreach (var tile in puzzle_tiles)
            {
                tile.boundaries.Rotate(rotation);
            }
        }

        void translate_color_of_tiles_cubes(Vector3 factor, EvenOrOdd even_or_odd)
        {
            var color_translation = color_translate_speed * Time.deltaTime;
            color_translation.x *= factor.x;
            color_translation.y *= factor.y;
            color_translation.z *= factor.z;

            var max_color = Vector3.one;
            max_color.x *= color_max.x;
            max_color.y *= color_max.y;
            max_color.z *= color_max.z;

            var min_color = Vector3.one;
            min_color.x *= color_min.x;
            min_color.y *= color_min.y;
            min_color.z *= color_min.z;

            bool current_is_even = false;
            foreach (var tile in puzzle_tiles)
            {
                current_is_even = !current_is_even;

                switch (even_or_odd)
                {
                    case EvenOrOdd.Even:
                        if (!current_is_even)
                            continue;
                        break;
                    case EvenOrOdd.Odd:
                        if (current_is_even)
                            continue;
                        break;
                }

                var renderer = tile.cube.GetComponent<Renderer>();
                var material = renderer.materials[0];
                var initial_color = material.color;


                var new_color = new Vector3(initial_color.r, initial_color.g, initial_color.b) + color_translation;
                new_color = Vector3.Min(new_color, max_color);
                new_color = Vector3.Max(new_color, min_color);

                material.color = new Color(new_color.x, new_color.y, new_color.z);

            }




        }

    }
}