using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace klaim
{
    public class SpecialCube : MonoBehaviour
    {
        public bool is_special = false;
        public bool clicked = false;
        
        public void mark_as_special(Color special_color)
        {
            is_special = true;

            foreach (var renderer in GetComponentsInChildren<Renderer>())
            {
                foreach (var material in renderer.materials)
                {
                    material.color = special_color;
                }
            }
        }

        public void OnMouseDown()
        {
            //Debug.Log("CLICKED!!!!!!!!!!!");
            if(is_special && !clicked)
            {
                clicked = true;
                const float seconds_to_destroy = 5.0f;
                
                var secret_text = GameObject.Find("/Canvas/attention");
                secret_text.GetComponent<Text>().enabled = true;
                GameObject.Destroy(secret_text, seconds_to_destroy);

                var panel_secret_text = GameObject.Find("/Canvas/panel_secret_text");
                panel_secret_text.GetComponent<Image>().enabled = true;
                GameObject.Destroy(panel_secret_text, seconds_to_destroy);

            }
        }

    }
}