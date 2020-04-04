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
            Debug.Log("CLICKED!!!!!!!!!!!");
            if(is_special && !clicked)
            {
                clicked = true;
                var secret_text = GameObject.Find("/Canvas/secret_text");
                secret_text.GetComponent<Text>().enabled = true;
                var panel_secret_text = GameObject.Find("/Canvas/panel_secret_text");
                panel_secret_text.GetComponent<Image>().enabled = true;
            }
        }

    }
}