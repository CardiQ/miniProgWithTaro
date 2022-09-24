import React from 'react'
import { Component } from 'react'
import {StyledStartButton} from './styles/StyledStartButton'

const StartButton = ({callback})=>(//onClick为Button的特性
    <StyledStartButton onClick={callback}>
        Start Game
    </StyledStartButton>
)

export default StartButton