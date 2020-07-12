using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class randToot : MonoBehaviour
{
    public AudioClip[] soundList;

    public void PlayRandomSound() {
        PlayClipOn(soundList[Random.Range(0,soundList.Length)], transform.position, Random.Range(0.4f,0.7f), transform);
    }

    public void PlayClipOn(AudioClip clip, Vector3 pos, float atVol = 1.0f,
                           Transform attachToParent = null) {
        GameObject tempGO = new GameObject("TempAudio"); // create the temp object
        tempGO.transform.position = pos; // set its position
        if (attachToParent != null) {
            tempGO.transform.parent = attachToParent.transform;
        }
        AudioSource aSource = tempGO.AddComponent<AudioSource>() as AudioSource; // add an audio source
        aSource.clip = clip; // define the clip
        aSource.volume = atVol;
        aSource.pitch = Random.Range(0.7f, 1.4f);
        // set other aSource properties here, if desired
        aSource.Play(); // start the sound
        Destroy(tempGO, clip.length / aSource.pitch); // destroy object after clip duration
    }
}
