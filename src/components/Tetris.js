import React from 'react'
import { Component } from 'react'

import Stage from './Stage'
import Display from './Display'
import StartButtonn from './StartButton'

import {createStage} from "../gamehelpers"

import{StyledTetrisWrapper,StyledTetris}from './styles/StyledTetris'

const Tetris = ()=>{//此处箭头函数使用花括号，因为内含更多逻辑编写

    return (
        <StyledTetrisWrapper>
            <StyledTetris>
            <Stage stage={createStage()}/>
                <aside>
                    <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                    </div>
                    <StartButtonn/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris