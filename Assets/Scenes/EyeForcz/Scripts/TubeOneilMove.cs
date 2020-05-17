using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TubeOneilMove : MonoBehaviour
{
    public Transform[] tubeList;
    public float tubeSec = 12.0f;
    public float spinRate = 30.0f;
    private float tubeLen = 498.0f;

    private void Start() {
        if(SceneSet.param == 1) {
            Debug.Log("due to SceneSet.param being 1, tube will be slowed greatly");
            tubeSec *= 5.0f;
            spinRate *= 0.15f;
        }
    }

    // Update is called once per frame
    void Update()
    {
        float timePerc = Time.timeSinceLevelLoad / tubeSec;
        timePerc = timePerc - Mathf.Floor(timePerc); // 0.0-1.0 scale

        for (var i = 0; i<tubeList.Length; i++) {
            tubeList[i].position = transform.position + // tube mover as tube center origin
                    ((tubeLen*i) -
                    timePerc * tubeLen) * Vector3.back;
            tubeList[i].rotation = Quaternion.AngleAxis(Time.timeSinceLevelLoad * spinRate,
                    Vector3.forward);
        }
    }
}
