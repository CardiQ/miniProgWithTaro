//改了StartButton的样式，从样式组件改为组件和样式；？之后改回去试试
import React from 'react'
/*import { Component } from 'react'
import {StyledStartButton} from './styles/StyledStartButton'*/

import './styles/StyledStartBtn.scss'

const StartButton = ({callback})=>(//onClick为Button的特性
    /*<StyledStartButton onClick={callback}>
        Start Game
    </StyledStartButton>*/
    <button class='StyledStartButton' onClick={callback}>
        Start Game
    </button>
)

export default StartButton