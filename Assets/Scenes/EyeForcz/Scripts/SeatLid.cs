using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SeatLid : MonoBehaviour
{
    public float offset = 0.0f;
    public float stretchTilt = 1.0f;

    public randToot soundMaker;

    private float prevLevel;
    private float clampLevel;

    void Update()
    {
        clampLevel = -Mathf.Clamp01(Mathf.Cos(offset * Mathf.PI + Time.timeSinceLevelLoad * 1.9f)) * 45.0f * stretchTilt - 90.0f;
        transform.rotation = Quaternion.AngleAxis(clampLevel, Vector3.right);
        if(prevLevel==-90.0f && clampLevel < prevLevel) {
            soundMaker.PlayRandomSound();
        }
        prevLevel = clampLevel;
    }
}
