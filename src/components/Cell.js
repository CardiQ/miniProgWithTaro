import React from 'react'
import { Component } from 'react'

import {StyledCell} from './styles/StyledCell'
import {TETROMINOS} from '../tetromino'

const Cell = ({type})=>(//type
    <StyledCell type={'J'} color={TETROMINOS['J'].color}></StyledCell>
)

export default Cell