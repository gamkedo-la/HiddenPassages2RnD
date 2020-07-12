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


        IEnumerator show_then_hide_secret()
        {
            const float seconds_to_hide = 5.0f;

            var secret_text = GameObject.Find("/Canvas/attention");
            var panel_secret_text = GameObject.Find("/Canvas/panel_secret_text");

            clicked = true;

            secret_text.GetComponent<Text>().enabled = true;
            panel_secret_text.GetComponent<Image>().enabled = true;

            yield return new WaitForSeconds(seconds_to_hide);

            secret_text.GetComponent<Text>().enabled = false;
            panel_secret_text.GetComponent<Image>().enabled = false;

            clicked = false;
        }

        public void OnMouseDown()
        {
            //Debug.Log("CLICKED!!!!!!!!!!!");
            if(is_special && !clicked)
            {
                StartCoroutine(show_then_hide_secret());

            }
        }

    }
}