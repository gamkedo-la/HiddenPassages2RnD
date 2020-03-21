using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneSet : MonoBehaviour
{
    public void SceneLoad(string sceneName) {
        SceneManager.LoadScene(sceneName);
    }

    void Start()
    {
        Debug.Log("scene switcher is loaded and ready");   
    }
}
