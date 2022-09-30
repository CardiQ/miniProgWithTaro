import React from 'react'
//import {useState,useEffect} from 'react'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from 'react'
import {createStage,checkCollision} from '../gamehelpers'
import {resetPlayer} from './usePlayer'

export const useStage = (player,resetPlayer)=>{
    const [stage,setStage]=useState(createStage())
    
    useEffect(() => {
        const updateStage = prevStage=>{//将该函数放在useEffect内免去强调其和消息的联系
            //flash
                /*const newStage = prevStage.map(row=>{
                row.map(cell=>(cell[1]==='clear'?[0,'clear']:cell))//刷新，碰撞消除，一切变化在用户操作之前
            })*/
            const newStage=[]
            prevStage.forEach((row,y)=>{
                newStage[y]=prevStage[y].map(cell=>(cell[1]==='clear'?[0,'clear']:cell))
                /*row.forEach((cell,x)=>{
                    cell[1]==='clear'?[0,'clear']:cell
                })*/
            })//刷新，按clear'，一切变化在用户操作之前
            //draw
            player.tetromino.forEach((row,y)=>{//遍历player中的元素：俄罗斯方块形状；该player由useStage传入
                row.forEach((value,x)=>{
                    if(value!==0){//不是0的任何字母,字母仅代表形状
                        newStage[player.pos.y+y][player.pos.x+x]=[
                            value,
                            `${player.collided?'merged':'clear'}`//在此改状态，上面认证?为什么写作CSS
                        ]
                    }
                })
            })
            if(player.collided){
                resetPlayer();
            }
            return newStage
        }

        setStage(prev=>updateStage(prev))

    },[player,resetPlayer])//依赖项参数表

    return [stage,setStage]
}