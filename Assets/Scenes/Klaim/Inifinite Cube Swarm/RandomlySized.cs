using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Used to help identify different objects when working with a lot of them generated.
public class RandomlySized : MonoBehaviour {

    public Vector3 min_scale = Vector3.one;
    public Vector3 max_scale = Vector3.one;

    void Start () {

        var initial_scale = transform.localScale;
        var new_scale = random_scale(initial_scale);
        transform.localScale = new_scale;
    }

    public Vector3 random_scale(Vector3 initial_scale)
    {
        var min_scale_x = initial_scale.x * min_scale.x;
        var min_scale_y = initial_scale.y * min_scale.y;
        var min_scale_z = initial_scale.z * min_scale.z;

        var max_scale_x = initial_scale.x * max_scale.x;
        var max_scale_y = initial_scale.y * max_scale.y;
        var max_scale_z = initial_scale.z * max_scale.z;


        var random_scale_x = Random.Range(min_scale_x, max_scale_x);
        var random_scale_y = Random.Range(min_scale_y, max_scale_y);
        var random_scale_z = Random.Range(min_scale_z, max_scale_z);

        var new_scale = new Vector3(random_scale_x, random_scale_y, random_scale_z);

        return new_scale;
    }

}
