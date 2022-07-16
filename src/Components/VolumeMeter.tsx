import React, { useEffect } from 'react'
import './VolumeMeter.css';

const VolumeMeter = () => {
    useEffect(() => {
        (async () => {
            let volumeCallback = null;
            let volumeInterval = null;
            const volumeVisualizer = document.getElementById('volume-visualizer') as HTMLElement;
            const startButton = document.getElementById('start') as HTMLElement;
            const stopButton = document.getElementById('stop') as HTMLElement;
            // Initialize
            try {
              const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                  echoCancellation: true
                }
              });
              const audioContext = new AudioContext();
              const audioSource = audioContext.createMediaStreamSource(audioStream);
              const analyser = audioContext.createAnalyser();
              analyser.fftSize = 512;
              analyser.minDecibels = -127;
              analyser.maxDecibels = 0;
              analyser.smoothingTimeConstant = 0.4;
              audioSource.connect(analyser);
              const volumes = new Uint8Array(analyser.frequencyBinCount);
              volumeCallback = () => {
                analyser.getByteFrequencyData(volumes);
                let volumeSum = 0;
                for(const volume of volumes as any)
                  volumeSum += volume;
                const averageVolume = volumeSum / volumes.length;
                // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
                volumeVisualizer.style.setProperty('--volume', (averageVolume * 100 / 127) + '%');
              };
            } catch(e) {
              console.error('Failed to initialize volume visualizer, simulating instead...', e);
              // Simulation
              //TODO remove in production!
              let lastVolume = 50;
              volumeCallback = () => {
                const volume = Math.min(Math.max(Math.random() * 100, 0.8 * lastVolume), 1.2 * lastVolume);
                lastVolume = volume;
                volumeVisualizer.style.setProperty('--volume', volume + '%');
              };
            }
            // Use
            // 클릭해야 시작하게
            // startButton.addEventListener('click', () => {
            //   // Updating every 100ms (should be same as CSS transition speed)
            //   if(volumeCallback !== null && volumeInterval === null)
            //     volumeInterval = setInterval(volumeCallback, 100);
            // });
            // stopButton.addEventListener('click', () => {
            //   if(volumeInterval !== null) {
            //     clearInterval(volumeInterval);
            //     volumeInterval = null;
            //   }
            // });

            // 창 열자마자 자동으로 시작하게
            if(volumeCallback !== null && volumeInterval === null)
            volumeInterval = setInterval(volumeCallback, 100);
          })();
    }, [])
    
    return (
        <div>
            <div id="volume-visualizer"></div>
            <button id="start">Start</button>
            <button id="stop">Stop</button>
        </div>
    )
}

export default VolumeMeter