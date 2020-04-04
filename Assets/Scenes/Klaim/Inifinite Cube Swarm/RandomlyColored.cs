using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace klaim
{
    // Used to help identify different objects when working with a lot of them generated.
    public class RandomlyColored : MonoBehaviour
    {

        public bool allow_transparent = true;

        void Start()
        {

            foreach (var renderer in GetComponentsInChildren<Renderer>())
            {
                foreach (var material in renderer.materials)
                {
                    material.color = random_color(allow_transparent);
                }
            }
        }

        public static Color random_color(bool allow_alpha_steps)
        {
            // We force 3 kinds of alpha to avoid everything looking slightly alpha

            const float very_transparent_alpha = 0.1f;
            const float slightly_transparent_alpha = 0.8f;
            const float opaque_alpha = 10.0f;

            float alpha = opaque_alpha;

            if (allow_alpha_steps)
            {
                int transparency_choice = Random.Range(0, 2);
                switch (transparency_choice)
                {
                    case 0:
                        alpha = very_transparent_alpha;
                        break;
                    case 1:
                        alpha = slightly_transparent_alpha;
                        break;
                    default:
                        alpha = opaque_alpha;
                        break;
                }
            }

            return new Color(Random.value, Random.value, Random.value, alpha);
        }

    }
}