using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClickExpose : MonoBehaviour
{
    void Update()
    {
        if (Input.GetMouseButtonUp(0)) {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit rhInfo;
            if (Physics.Raycast(ray, out rhInfo)) {
                Renderer rend = rhInfo.collider.GetComponent<Renderer>();
                rend.enabled = true;
            }
        }
    }
}
