using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClickExpose : MonoBehaviour
{
    public GameObject clue;
    int shapesShown = 0;
    int shapesToShow = 6;

    void Update()
    {
        if (Input.GetMouseButtonUp(0)) {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit rhInfo;
            if (Physics.Raycast(ray, out rhInfo)) {
                Renderer rend = rhInfo.collider.GetComponent<Renderer>();
                if(rend.enabled == false) {
                    shapesShown++;
                    rend.enabled = true;
                    if (shapesShown >= shapesToShow) {
                        clue.SetActive(true);
                    }
                }
            }
        }
    }
}
