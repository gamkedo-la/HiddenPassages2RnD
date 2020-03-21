using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraParentFromURL : MonoBehaviour
{
    public Transform parentOuter;
    public Transform parentInner;
    public bool outerCam = true;

    // Start is called before the first frame update
    void Start()
    {
        if(outerCam) {
            Camera.main.transform.SetParent(parentOuter);
        }
        else {
            Camera.main.transform.SetParent(parentInner);
            Camera.main.orthographic = false;
        }
        Camera.main.transform.localPosition = Vector3.zero;
        Camera.main.transform.localRotation = Quaternion.identity;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
