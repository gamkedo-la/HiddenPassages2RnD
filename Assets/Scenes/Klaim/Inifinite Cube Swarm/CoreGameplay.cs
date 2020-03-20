using System.Collections;
using System.Collections.Generic;
using UnityEngine;

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

    // Start is called before the first frame update
    void Start()
    {
        global_light = GameObject.Find("Directional Light").transform;
    }

    // Update is called once per frame
    void Update()
    {
        if (puzzle_tiles == null)
            reset_puzzle_tiles();


        if(Input.GetKey(KeyCode.PageUp))
            resize_puzzle_tiles(1.0f);

        if(Input.GetKey(KeyCode.PageDown))
                resize_puzzle_tiles(-1.0f);

        if (Input.GetKey(KeyCode.LeftArrow))
            rotate_puzzle_tiles(Vector3.left);

        if (Input.GetKey(KeyCode.RightArrow))
            rotate_puzzle_tiles(Vector3.right);

        if (Input.GetKey(KeyCode.UpArrow))
            rotate_puzzle_tiles(Vector3.up);

        if (Input.GetKey(KeyCode.DownArrow))
            rotate_puzzle_tiles(Vector3.down);

        if (Input.GetKey(KeyCode.Home))
            rotate_puzzle_tiles(Vector3.forward);

        if (Input.GetKey(KeyCode.End))
            rotate_puzzle_tiles(Vector3.back);

        if (Input.GetKey(KeyCode.W))
            move_puzzle_tiles_along_x_axis(1.0f);

        if (Input.GetKey(KeyCode.S))
            move_puzzle_tiles_along_x_axis(-1.0f);



        if (Input.GetKey(KeyCode.A))
            rotate_puzzle_tiles_along_y_axis(1.0f);

        if (Input.GetKey(KeyCode.D))
            rotate_puzzle_tiles_along_y_axis(-1.0f);




        if (Input.GetKey(KeyCode.J))
            rotate_light(Vector3.left);

        if (Input.GetKey(KeyCode.L))
            rotate_light(Vector3.right);

        if (Input.GetKey(KeyCode.I))
            rotate_light(Vector3.up);

        if (Input.GetKey(KeyCode.K))
            rotate_light(Vector3.down);


    }

    void reset_puzzle_tiles()
    {
        var tiles = GameObject.FindGameObjectsWithTag("puzzle_tile");
        puzzle_tiles = new Tile[tiles.Length];

        for (int i = 0; i < puzzle_tiles.Length; i++)
        {
            var tile = new Tile();
            tile.tile = tiles[i].transform;
            tile.boundaries = tile.tile.Find("Boundaries");
            tile.cube = tile.boundaries.Find("Cube");
            tile.center = tile.boundaries.Find("Center");

            puzzle_tiles[i] = tile;
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

    void rotate_puzzle_tiles(Vector3 factor)
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

    void rotate_puzzle_tiles_along_y_axis(float factor)
    {
        var rotation = rotation_speed * Time.deltaTime;
        rotation.y *= factor;
        
        foreach (var tile in puzzle_tiles)
        {
            tile.boundaries.Rotate(rotation);
        }
    }
}
