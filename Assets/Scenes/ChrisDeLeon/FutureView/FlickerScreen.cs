using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FlickerScreen : MonoBehaviour
{
    Material flickerMat;
    Transform parentTransform;
    Vector3 parentPosOrigin;

    // Start is called before the first frame update
    void Start()
    {
        flickerMat = GetComponent<Image>().material;
        parentTransform = transform.parent;
        parentPosOrigin = parentTransform.position;
        StartCoroutine(Flicker());
    }

    IEnumerator Flicker()
    {
        Color colCache = flickerMat.color;
        float mainFade = 174.0f/255.0f;
        float mainFadeLower = 170.0f / 255.0f;
        float lowAlpha = 162.0f / 255.0f;
        float jostleAmt = 0.02f; // either direction, so twice this range
        while (true) {
            // jostle and flicker screen
            colCache.a = Random.Range(lowAlpha, mainFade);
            flickerMat.color = colCache;
            parentTransform.position +=
                parentTransform.right * Random.Range(-jostleAmt, jostleAmt) +
                parentTransform.up* Random.Range(-jostleAmt, jostleAmt);
            // duration of flicker
            yield return new WaitForSeconds(Random.Range(0.0f,0.1f));

            // restore to normal
            colCache.a = Random.Range(mainFadeLower, mainFade);
            flickerMat.color = colCache;
            parentTransform.position = parentPosOrigin;
            // time between flickers
            yield return new WaitForSeconds(Random.Range(0.0f, 3.0f));
        }
    }
}
