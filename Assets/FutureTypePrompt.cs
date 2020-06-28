using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;

public class FutureTypePrompt : MonoBehaviour
{
    public string[] answers;
    public string[] URLs;
    public GameObject matchFoundActionPrompt;
    InputField inputField;
    public Color answerColor;
    public Color nonAnswerColor;

    void Start()
    {
        matchFoundActionPrompt.SetActive(false);
        inputField = GetComponent<InputField>();
        StartCoroutine(ForceFocusAndCheckAnswer());
    }

    private void Update() {
        if (Input.GetKeyDown(KeyCode.Return) || Input.GetMouseButtonDown(0)) {
            openMatchingSite();
        }
    }

    private int findMatchingAnswerIdx() {
        int matchIdx = -1;

        for (var i = 0; i < answers.Length; i++) {
            if (inputField.text.ToLower() == answers[i].ToLower()) {
                matchIdx = i;
                break;
            }
        }

        return matchIdx;
    }

    private void openMatchingSite() {
        int matchIdx = findMatchingAnswerIdx();

        if (matchIdx != -1) {
        Debug.Log("Opening site (if in browser): " + URLs[matchIdx]);
#if !UNITY_EDITOR
        openWindow(URLs[matchIdx]);
#endif
        }
    }

    IEnumerator ForceFocusAndCheckAnswer() {
        while (true) {
            inputField.Select();
            inputField.ActivateInputField();

            bool anyMatch = (findMatchingAnswerIdx() != -1);

            if (matchFoundActionPrompt.activeSelf != anyMatch) {
                matchFoundActionPrompt.SetActive(anyMatch);
            }

            if (anyMatch) {
                inputField.textComponent.color = answerColor;
            } else {
                inputField.textComponent.color = nonAnswerColor;
            }
            yield return new WaitForSeconds(0.1f);
        }
    }

    // via https://github.com/valyard/UnityWebGLOpenLink
    // note: also requires the -- using System.Runtime.InteropServices;
    [DllImport("__Internal")]
    private static extern void openWindow(string url);
}

