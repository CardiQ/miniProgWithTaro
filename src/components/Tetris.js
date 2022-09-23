import React from 'react'
import { Component } from 'react'

import Stage from './Stage'
import Display from './Display'
import StartButtonn from './StartButton'

const Tetris = ()=>{//此处箭头函数使用花括号，因为内含更多逻辑编写
    

    return (
        <div>
            <Stage/>
                <aside>
                    <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                    </div>
                    <StartButtonn/>
                </aside>
        </div>
    )
}

export default Tetris