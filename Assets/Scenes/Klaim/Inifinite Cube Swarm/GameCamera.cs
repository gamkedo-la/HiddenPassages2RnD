using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace klaim
{

    public class GameCamera : MonoBehaviour
    {
        public const float SIZE_PER_HALF_SIDE = 41.0f;
        public const float SIZE_PER_SIDE = SIZE_PER_HALF_SIDE * 2;

        public Vector2Int screen_resolution;
        public int min_square_side_size = 800;
        public int min_side_padding = 100;

        private Camera game_camera;
        private Plane[] planes;

        // Use this for initialization
        void Start()
        {
            game_camera = GetComponent<Camera>();
            game_camera.orthographicSize = SIZE_PER_HALF_SIDE;
            force_square_game_view();
        }

        // Update is called once per frame
        void Update()
        {
            if (screen_resolution.x != Screen.currentResolution.width
            || screen_resolution.y != Screen.currentResolution.height)
            {
                force_square_game_view();
            }
        }

        // Source: https://answers.unity.com/questions/8003/how-can-i-know-if-a-gameobject-is-seen-by-a-partic.html
        public bool is_able_to_see(GameObject obj)
        {
            if (planes == null)
                return false;

            foreach (var renderer in obj.GetComponentsInChildren<Renderer>())
            {
                if (is_able_to_see(renderer.bounds))
                {
                    return true;
                }
            }

            return false;
        }

        private bool is_able_to_see(Bounds bounds)
        {
            if (planes == null)
                return false;

            if (GeometryUtility.TestPlanesAABB(planes, bounds))
                return true;
            else
                return false;
        }


        private void force_square_game_view()
        {
            screen_resolution = new Vector2Int(Screen.width, Screen.height);

            int square_side = Math.Max(min_square_side_size, Screen.height);
            int potential_padding = (Screen.width - square_side) / 2;
            int side_padding = Mathf.Max(min_side_padding, potential_padding);

            var half_square_side = square_side / 2;
            var pos_x = (Screen.width / 2) - half_square_side;
            var pos_y = (Screen.height / 2) - half_square_side;
            var sqare_view_rect = new Rect(pos_x, pos_y, square_side, square_side);

            game_camera.pixelRect = sqare_view_rect;
            //if (game_camera.orthographicSize != SIZE_PER_HALF_SIDE)
            //{
            //    Debug.LogError("WRONG SIZE PER CAMERA SIDE");
            //}
            planes = GeometryUtility.CalculateFrustumPlanes(game_camera);
        }


    }
}