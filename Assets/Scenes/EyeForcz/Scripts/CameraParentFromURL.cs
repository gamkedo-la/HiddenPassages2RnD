using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraParentFromURL : MonoBehaviour
{
    public Transform parentOuter;
    public Transform parentInner;
    public bool outerCam = true;

    public void trainCamSpot(int spotNum) {
        if (spotNum == 1) {
            Camera.main.transform.SetParent(parentOuter);
            Camera.main.orthographic = true;
        } else {
            Camera.main.transform.SetParent(parentInner);
            Camera.main.orthographic = false;
        }
        Camera.main.transform.localPosition = Vector3.zero;
        Camera.main.transform.localRotation = Quaternion.identity;
    }

    // Start is called before the first frame update
    void Start()
    {
        trainCamSpot(outerCam ? 1 : 0);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
