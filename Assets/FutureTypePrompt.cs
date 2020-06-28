using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FutureTypePrompt : MonoBehaviour
{
    InputField inputField;
    void Start()
    {
        inputField = GetComponent<InputField>();
        StartCoroutine(ForceFocus());
    }

    IEnumerator ForceFocus() {
        while (true) {
            inputField.Select();
            inputField.ActivateInputField();
             yield return new WaitForSeconds(0.1f);
        }
    }
}
