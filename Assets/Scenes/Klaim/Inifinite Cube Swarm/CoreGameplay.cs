using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CoreGameplay : MonoBehaviour
{
    private struct Tile
    {
        public Transform tile;
        public Transform cube;
        public Transform boundaries;
    };

    private Tile[] puzzle_tiles;

    public float resize_speed = 1.0f;
    public float resize_min = 0.5f;
    public float resize_max = 1.0f;
    public float current_size = 1.0f;

    public Vector3 rotation_speed = Vector3.one;

    // Start is called before the first frame update
    void Start()
    {
        
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

            puzzle_tiles[i] = tile;
        }
    }

    void resize_puzzle_tiles(float factor)
    {
        var growth = factor * (resize_speed * Time.deltaTime);
        var max_scale = new Vector3(resize_max, resize_max, resize_max);
        var min_scale = new Vector3(resize_min, resize_min, resize_min);

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
        }
    }


}
