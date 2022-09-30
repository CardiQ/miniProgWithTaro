import React from 'react'
import { Component } from 'react'
//import {useState} from 'react'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from 'react'

//Components
import Stage from './Stage'
import Display from './Display'
import StartButtonn from './StartButton'

//StyledComponents&helpers
import {checkCollision, createStage} from "../gamehelpers"
import{StyledTetrisWrapper,StyledTetris}from './styles/StyledTetris'

//Hoooks
import {usePlayer} from '../hooks/usePlayer'
import{useStage}from '../hooks/useStage'

//Styles
import './styles/StyledBtn.scss'

const Tetris = ()=>{//此处箭头函数使用花括号，因为内含更多逻辑编写
    //state
    const [dropTime,setDropTime]=useState(null)
    const [gameOver,setGameOver]=useState(false)
    const [player,updatePlayerPos,resetPlayer,playerRotate]=usePlayer();
    const [stage,setStage]=useStage(player,resetPlayer);

    //function
    const movePlayer = dir=>{
        if(!checkCollision(player,stage,{x:dir,y:0})){
        updatePlayerPos({x:dir,y:0})}
    }

    const startGame = ()=>{
        //Reset everything
        setStage(createStage())
        resetPlayer()
        setGameOver(false)
    }

    const drop = ()=>{
        if(!checkCollision(player,stage,{x:0,y:1})){
            updatePlayerPos({x:0,y:1,collided:false})
        }else{
            if(player.pos.y<1){//仅游戏开始时为0，之后再检查
                console.log("Game Over")
                setGameOver(true)
                setDropTime(null)//不再下降
            }
            updatePlayerPos({x:0,y:0,collided:true})//下降碰到就不动了
        }
        
    }

    const dropPlaer = ()=>{
        drop();
    }

    const move = num=>{
        if(!gameOver){
            if(num==2){//左
                movePlayer(-1)
            }else if(num==4){//右
                movePlayer(1)
            }else if(num==5){//下
                dropPlaer()
            }else if(num==3){
                playerRotate(1)//顺时针
            }
        }
    }

    const fbtn1=()=>{move(1)};
    const fbtn2=()=>{move(2);};
    const fbtn3=()=>{move(3)};
    const fbtn4=()=>{move(4)};
    const fbtn5=()=>{move(5)};

    console.log('render again')
    
    return (//样式布局做好后添加props控制动作;wrapper另外的作用为覆盖整个页面使按键可以被监听
        <StyledTetrisWrapper>
            <StyledTetris>
            <Stage stage={stage}/>
                <aside>
                {gameOver?(
                    <Display gameOver={gameOver} text="GameOver" />
                    ):(
                        <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                        </div>
                    )}
                    <StartButtonn callback={startGame}/>
                </aside>
            </StyledTetris>
            <div>
                <div style="display: flex;flex-direction: row;align-items: center;">
                    <button class='btn2' onClick={fbtn2}>L</button>
                    <button class='btn3' onClick={fbtn3}>ROT</button>
                    <button class='btn4' onClick={fbtn4}>R</button>
                </div>
                <button class='btn5' onClick={fbtn5}>DOWN</button>
            </div>
        </StyledTetrisWrapper>
    )
}

export default Tetris