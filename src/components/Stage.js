import React from 'react'
import Cell from './Cell'
import { Component } from 'react'

import {StyledStage}from './styles/StyledStage'

const Stage = ({stage})=>(//注props全程无类型检查；都是structure
    <StyledStage width={stage[0].length} height={stage.length}>
        {
            stage.map(row=>row.map((cell,x)=><Cell key={x} type={cell[0]}/>))//cell[0]意为cell array的第一个值，是0；x为其索引值；若有第三个参数为原数组
        }
    </StyledStage>
)

export default Stage