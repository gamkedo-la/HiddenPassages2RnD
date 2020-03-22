using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Runtime.InteropServices;

public class SceneSet : MonoBehaviour
{
    [DllImport("__Internal")]
    static extern void OnScenesReady(); // in the javascript
    public void SceneLoad(string sceneName) {
        SceneManager.LoadScene(sceneName);
    }

    void Start()
    {
        Debug.Log("scene switcher is loaded and ready");
#if !UNITY_EDITOR && UNITY_WEBGL
        OnScenesReady();
#endif
    }
}
