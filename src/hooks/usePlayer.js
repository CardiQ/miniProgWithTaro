import React from 'react'
//import {useCallback, useState} from 'react'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from 'react'
import { checkCollision, STAGE_WIDTH } from '../gamehelpers'
import {TETROMINOS,randomTetromino} from '../tetromino'

export const usePlayer = ()=>{//有use前缀react才知此为自定义hook
    const [player,setPlayer]=useState({
        pos:{x : 0,y : 0},
        tetromino: (TETROMINOS[0]).shape,
        collided:false
    })

    //核心:rotate&playRotate
    const rotate = (matrix,dir)=>{
        const rotateTetro = matrix.map((_,index)=>
            matrix.map(col=>col[index]))
        
        if(dir>0)//顺时针
            return rotateTetro.map(row=>row.reverse())
        return rotateTetro.reverse()
    }

    const playerRotate = (stage,dir)=>{
        const clonePlayer = JSON.parse(JSON.stringify(player))//深拷贝，分离状态
        clonePlayer.tetromino = rotate(clonePlayer.tetromino,dir)

        //check collision
        const pos = clonePlayer.pos.x
        let offset = 1
        while(checkCollision(clonePlayer,stage,{x:0,y:0})){
            clonePlayer.pos.x+=offset
            offset = -(offset+(dir>0?1:-1))
            if(offset>clonePlayer.tetromino[0].length){
                rotate(clonePlayer.tetromino,-dir)//退回旋转
                clonePlayer.pos.x = pos//退回位置
                return
            }
        }

        setPlayer(clonePlayer)
    }

    const updatePlayerPos = ({x,y,collided})=>{
        setPlayer(prevstate => ({
            ...prevstate,//展开运算符之于对象：复制/合并
            pos:{x:(prevstate.pos.x+=x),y:(prevstate.pos.y+=y)},
            collided
        }))
    }

    const resetPlayer = useCallback(()=>{
        setPlayer({
            pos:{x:STAGE_WIDTH/2-2,y:0},
            tetromino:(randomTetromino()).shape,
            collided:false
        })
    })

    return [player,updatePlayerPos,resetPlayer,playerRotate];
}