using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MouseSpin : MonoBehaviour
{
    public Transform pivot;
    public float rate = 100.0f;
    float spinMomentum = 0.0f;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void LateUpdate() // so I can use *= without frame rate variability issues
    {
        float edgeSpin = 0.0f;
        float marginPerc = 0.3f;
        var marginPx = marginPerc * Screen.width;
        float wasSign = 0.0f;
        if (Input.mousePosition.x <= marginPx)
        {
            wasSign = -1.0f;
            edgeSpin = 1.0f - (Input.mousePosition.x / marginPx);
        }

        float rightPx = Screen.width - marginPx;
        if (Input.mousePosition.x >= rightPx)
        {
            wasSign = 1.0f;
            edgeSpin = (Input.mousePosition.x - rightPx) / marginPx;
        }
        edgeSpin *= wasSign;
        float newSpinMomentum;
        if (wasSign != 0.0f) {
            newSpinMomentum = edgeSpin * rate;
        }
        else
        {
            newSpinMomentum = 0.0f;
        }
        float kVal = 0.95f;
        spinMomentum = spinMomentum * kVal + newSpinMomentum * (1.0f - kVal);
        transform.RotateAround(pivot.position, pivot.up, spinMomentum * Time.deltaTime);
    }
}
