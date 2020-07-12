using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SeatLid : MonoBehaviour
{
    public float offset = 0.0f;
    public float stretchTilt = 1.0f;
    void Update()
    {
        transform.rotation = Quaternion.AngleAxis(
            -Mathf.Clamp01(Mathf.Cos(offset*Mathf.PI+Time.timeSinceLevelLoad*1.9f)) * 45.0f* stretchTilt - 90.0f, Vector3.right);
    }
}
