using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Runtime.InteropServices;

public class SceneSet : MonoBehaviour
{
    [DllImport("__Internal")]
    static extern void JSInitialize(); // in the javascript

    public static int param = -1;

    public void SetParam(int paramVal) {
        param = paramVal;
    }
    public void SceneLoad(string sceneName) {
        SceneManager.LoadScene(sceneName);
    }

    private void Start()
    {
        Debug.Log("scene switcher is loaded and ready");
#if !UNITY_EDITOR && UNITY_WEBGL
        JSInitialize();
#endif
    }
}
