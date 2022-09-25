import React from 'react'
import { Component } from 'react'

import {StyledCell} from './styles/StyledCell'
import {TETROMINOS} from '../tetromino'

const Cell = ({type})=>(//type
    <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>
)

export default Cell