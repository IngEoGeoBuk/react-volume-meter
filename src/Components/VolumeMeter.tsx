import React, { useEffect } from 'react'
import './VolumeMeter.css';
import styled from 'styled-components';


export const Circle = styled.div<{color: string;}>`
  width: 8px;
  height: 8px;

  background: ${(props) => props.color};
  border-radius: 12px;
`

const VolumeMeter = () => {

  function colorPids(vol: number) {
    const allPids = [...document.querySelectorAll('.pid') as any];
    const numberOfPidsToColor = Math.round(vol / 7);
    const pidsToColor = allPids.slice(0, numberOfPidsToColor);
    for (const pid of allPids) {
      pid.style.backgroundColor = "#e6e7e8";
    }
    for (let i = 0; i < pidsToColor.length; i++) {
      pidsToColor[i].style="display:block";
    }
  }

  useEffect(() => {
      (async () => {
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          })
            .then(function(stream) {
              const audioContext = new AudioContext();
              const analyser = audioContext.createAnalyser();
              const microphone = audioContext.createMediaStreamSource(stream);
              const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
          
              analyser.smoothingTimeConstant = 0.8;
              analyser.fftSize = 1024;
          
              microphone.connect(analyser);
              analyser.connect(scriptProcessor);
              scriptProcessor.connect(audioContext.destination);
              scriptProcessor.onaudioprocess = function() {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                const arraySum = array.reduce((a, value) => a + value, 0);
                const average = arraySum / array.length;
                colorPids(average);
              };
            })
            .catch(function(err) {
              console.error(err);
            });
        })();
  }, [])
    
    return (
        <div>
          <div className="pids-wrapper">
            <Circle className='pid' color='#FFB74A'/>
            <Circle className='pid' color='#4DC660'/>
            <Circle className='pid' color='#4DC65F'/>
            <Circle className='pid' color='#4DC65F'/>
            <Circle className='pid' color='#4DC65F'/>
            <Circle className='pid' color='#DE6565'/>
            <Circle className='pid' color='#DE6565'/>
          </div>
        </div>
    )
}

export default VolumeMeter