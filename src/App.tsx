import React from 'react'
import VolumeMeter from './Components/VolumeMeter'
import styled from 'styled-components';

export const CirclesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  width: 80px;
  height: 8px;


  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`

export const Circle = styled.div<{color: string;}>`
  width: 8px;
  height: 8px;

  background: ${(props) => props.color};
  border-radius: 12px;
`

const App = () => {
  return (
    <div>
      <VolumeMeter/>
      <br />
      <CirclesContainer>
        <Circle color='#FFB74A'/>
        <Circle color='#4DC660'/>
        <Circle color='#4DC65F'/>
        <Circle color='#4DC65F'/>
        <Circle color='#4DC65F'/>
        <Circle color='#DE6565'/>
        <Circle color='#DE6565'/>
      </CirclesContainer>
    </div>
  )
}

export default App