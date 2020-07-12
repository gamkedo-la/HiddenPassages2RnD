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
    public randToot typeSounds;

    string cycleText(string inURL,int offBy)
    {
        char[] array = inURL.ToCharArray();
        int span = 1+'z' - 'a';
        for (int i = 0; i < array.Length; i++)
        {
            int number = (int)array[i];
            if(number >= 'a' && number <= 'z')
            {
                number += offBy;
                while (number < 'a')
                {
                    number += span;
                }
                while (number > 'z')
                {
                    number -= span;
                }
            }
            if (number >= 'A' && number <= 'Z')
            {
                number += offBy;
                while (number < 'A')
                {
                    number += span;
                }
                while (number > 'Z')
                {
                    number -= span;
                }
            }

            array[i] = (char)(number);
        }
        return new string(array);
    }
    string processURL(string inURL, int idx)
    {
        int cycleKey = (idx >>1);
        for(int i=0;i< inURL.Length + cycleKey; i++)
        {
            inURL = rollText(inURL);
        }
        int cycleBy = (inURL.Length * (idx + 1))%26;
        return cycleText(inURL, cycleBy);
    }
    string rollText(string inText)
    {
        return inText.Substring(1, inText.Length - 1) + inText.Substring(0, 1);
    }

    void Start()
    {
        matchFoundActionPrompt.SetActive(false);
        inputField = GetComponent<InputField>();
        StartCoroutine(ForceFocusAndCheckAnswer());
    }

    private void Update() {
        if (Input.GetMouseButtonDown(0)) {
            openMatchingSite();
        }
    }

    private int findMatchingAnswerIdx() {
        int matchIdx = -1;

        for (var i = 0; i < answers.Length; i++) {
            if (inputField.text.ToLower() == processURL(answers[i],i).ToLower()) {
                matchIdx = i;
                break;
            }
        }

        return matchIdx;
    }

    public void randTone() {
        typeSounds.PlayRandomSound();
    }

    private void openMatchingSite() {
        int matchIdx = findMatchingAnswerIdx();

        if (matchIdx != -1) {
            typeSounds.PlayRandomSound();
            inputField.text = "";
            string gotoPage = "https://" + processURL(URLs[matchIdx], matchIdx);
            Debug.Log("Erasing input and opening site (if in browser): " + gotoPage);
#if !UNITY_EDITOR
            openWindow(gotoPage);
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

