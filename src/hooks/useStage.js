import React from 'react'
//import {useState,useEffect} from 'react'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from 'react'
import {createStage,checkCollision} from '../gamehelpers'
import {resetPlayer} from './usePlayer'

export const useStage = (player,resetPlayer)=>{
    const [stage,setStage]=useState(createStage())
    //行清空状态计分用
    const [clearState,setClearState]=useState(0)

    useEffect(() => {
        //清空计分
        setClearState(0)//?

        const sweepRows = (nStage)=>
            nStage.reduce((pre,row)=>{//易出错
                console.log('2')
                if(row.findIndex(cell=>cell[0]===0)===-1){
                    console.log('3')
                    setClearState(prev=>prev+1)
                    pre.unshift(new Array(nStage[0].length).fill([0,'clear']))//在数组顶部0行添加空行
                    return pre
                }
                console.log('4')
                pre.push(row)
                return pre
            },[])

        //更新stage
        const updateStage = prevStage=>{//将该函数放在useEffect内免去强调其和消息的联系
            //flash
                /*const newStage = prevStage.map(row=>{
                row.map(cell=>(cell[1]==='clear'?[0,'clear']:cell))//刷新，碰撞消除，一切变化在用户操作之前
            })*/
            const newStage=[];
            prevStage.forEach((row,y)=>{
                newStage[y]=prevStage[y].map(cell=>(cell[1]==='clear'?[0,'clear']:cell))
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
                resetPlayer()
                console.log('err')
                //刷新中清空计分
                return sweepRows(newStage)//注意三层调用必须返回reduce的返回值，reduce不会修改原数组
            }
            return newStage
        }

        setStage(prev=>updateStage(prev))

    },[player,resetPlayer])//依赖项参数表

    return [stage,setStage]
}