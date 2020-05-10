using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;

public class OpenLinkClickTest : MonoBehaviour
{
    public string forURL = "error.html";

    void OnMouseUp()
    {
        Debug.Log("Clicked on cube");
#if !UNITY_EDITOR
        openWindow(forURL);
#endif
    }
    // via https://github.com/valyard/UnityWebGLOpenLink
    // note: also requires the -- using System.Runtime.InteropServices;
    [DllImport("__Internal")]
    private static extern void openWindow(string url);
}
