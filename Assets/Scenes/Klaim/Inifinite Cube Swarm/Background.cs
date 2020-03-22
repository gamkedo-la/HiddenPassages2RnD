using UnityEngine;
using System.Collections;


namespace klaim
{
    // Handle generic behaviour of dynamic backgrounds
    public class Background : MonoBehaviour
    {

        public float FRONT_BACKGROUND_Z = 0.0f;
        public float BACK_BACKGROUND_Z = 10000.0f;

        public bool transition_back_to_front = true;
        public bool transition_front_to_back = true;

        public bool destroy_when_farther_than_background = false;
        public bool perspective_enabled = false;
        public float initial_entry_speed = -1000.0f;
        public float entry_acceleration = -1.0f;
        public float entry_max_speed = 100.0f;

        public float initial_exit_speed = 1000.0f;
        public float exit_acceleration = 2.0f;
        public float exit_max_speed = 100.0f;

        public float max_z_speed = 100.0f;
        public float z_speed = 0.0f;
        public float z_acceleration = 0.0f;
        public float target_z = 0.0f;

        protected void Start()
        {
            on_wave_begin(); // Only do the wave_begin when we are run by the ProceduralLevelBuilder
        }

        protected void Update()
        {
            var new_z_speed = z_speed + (z_acceleration * Time.deltaTime);
            new_z_speed = Mathf.Clamp(new_z_speed, -max_z_speed, max_z_speed);

            var distance_to_target = Mathf.Abs(target_z - transform.position.z);

            while (Mathf.Abs(new_z_speed) > distance_to_target)
            {
                new_z_speed /= 2.0f; // Totally Abitrary
            }


            z_speed = new_z_speed;
            transform.Translate(0.0f, 0.0f, z_speed, Space.World);

            if (destroy_when_farther_than_background
            && transform.position.z > BACK_BACKGROUND_Z + 2.0f) // Destroy the background if farther than the back
            {
                Debug.LogFormat("Destroying Background {0} : Exit background space (max = {1})", gameObject.name, BACK_BACKGROUND_Z);
                Destroy(gameObject);
            }
        }


        public void on_wave_begin()
        {
            Debug.LogFormat("BEGIN BACKGROUND {0}", gameObject.name);

            
            target_z = FRONT_BACKGROUND_Z;
            z_speed = initial_entry_speed;
            max_z_speed = entry_max_speed;
            z_acceleration = entry_acceleration;

            if (transition_back_to_front)
            {
                transform.position = new Vector3(0.0f, 0.0f, BACK_BACKGROUND_Z);
            }
            else
            {
                transform.position = new Vector3(0.0f, 0.0f, target_z);
            }


        }

        public void on_wave_end()
        {
            Debug.LogFormat("END BACKGROUND {0}", gameObject.name);
            
            if (transition_front_to_back)
            {
                target_z = BACK_BACKGROUND_Z + 10.0f; // We want to go farther than the background
                z_speed = initial_exit_speed;
                max_z_speed = exit_max_speed;
                z_acceleration = exit_acceleration;

            }

            Destroy(gameObject, 5.0f); // This is just to be sure we don't overload the game
        }

    }
}