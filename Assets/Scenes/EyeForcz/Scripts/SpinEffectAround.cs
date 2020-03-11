using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpinEffectAround : MonoBehaviour
{
    public Transform pivot;
    public float rate = 40.0f;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        transform.RotateAround(pivot.position, pivot.forward, rate * Time.deltaTime);
    }
}
