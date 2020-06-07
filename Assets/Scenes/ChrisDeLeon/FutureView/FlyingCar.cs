using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FlyingCar : MonoBehaviour
{
    Vector3 startPos;
    float driveDist = 0.0f;
    float resetDist = 160.0f;
    float mySpeed;
    TrailRenderer tr;
    // Start is called before the first frame update
    void Start()
    {
        startPos = transform.position;
        tr = GetComponent<TrailRenderer>();
        resetDist += Random.Range(0f,100.0f); // vary reset timers
        mySpeed = 25.0f + Random.Range(0.0f,10.0f);

        float randStart = Random.Range(0f, 1f) * resetDist;
        driveDist += randStart;
        transform.position += transform.forward * randStart;
        tr.Clear();
    }

    // Update is called once per frame
    void Update()
    {
        float moveNow = mySpeed * Time.deltaTime;
        driveDist += moveNow;
        transform.position += transform.forward * moveNow;
        if (driveDist > resetDist) {
            driveDist = 0.0f;
            transform.position = startPos;
            tr.Clear();
        }
    }
}
