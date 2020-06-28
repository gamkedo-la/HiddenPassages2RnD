using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FutureTypePrompt : MonoBehaviour
{
    public string[] answers;
    InputField inputField;
    public Color answerColor;
    public Color nonAnswerColor;

    void Start()
    {
        inputField = GetComponent<InputField>();
        StartCoroutine(ForceFocusAndCheckAnswer());
    }

    IEnumerator ForceFocusAndCheckAnswer() {
        bool anyMatch;
        while (true) {
            inputField.Select();
            inputField.ActivateInputField();
            anyMatch = false;
            for(var i=0;i<answers.Length;i++) {
                if (inputField.text == answers[i]) {
                    anyMatch = true;
                    break;
                }
            }
            if(anyMatch) {
                inputField.textComponent.color = answerColor;
            } else {
                inputField.textComponent.color = nonAnswerColor;
            }
            yield return new WaitForSeconds(0.1f);
        }
    }
}

