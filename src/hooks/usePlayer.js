import React from 'react'
//import {useCallback, useState} from 'react'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from 'react'
import { STAGE_WIDTH } from '../gamehelpers'
import {TETROMINOS,randomTetromino} from '../tetromino'

export const usePlayer = ()=>{//有use前缀react才知此为自定义hook
    const [player,setPlayer]=useState({
        pos:{x : 0,y : 0},
        tetromino: (TETROMINOS[0]).shape,
        collided:false
    })

    const updatePlayerPos = ({x,y,collided})=>{
        setPlayer(prevstate => ({
            ...prevstate,//展开运算符之于对象：复制/合并
            pos:{x:(prevstate.pos.x+=x),y:(prevstate.pos.y+=y)},
            collided
        }))
        console.log('nowy'+y)
    }

    const resetPlayer = useCallback(()=>{
        setPlayer({
            pos:{x:STAGE_WIDTH/2-2,y:0},
            tetromino:(randomTetromino()).shape,
            collided:false
        })
    })

    return [player,updatePlayerPos,resetPlayer];
}