using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SeatLid : MonoBehaviour
{
    public float offset = 0.0f;
    void Update()
    {
        transform.rotation = Quaternion.AngleAxis(
            -Mathf.Clamp01(Mathf.Cos(offset*Mathf.PI+Time.timeSinceLevelLoad*3.0f)) * 45.0f-90.0f, Vector3.right);
    }
}
