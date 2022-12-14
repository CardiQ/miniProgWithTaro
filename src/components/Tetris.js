import React from 'react'
import { Component } from 'react'
//import {useState} from 'react'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from 'react'
import {TETROMINOS} from '../tetromino'

//Components
import Stage from './Stage'
import Display from './Display'
import StartButtonn from './StartButton'

//StyledComponents&helpers
import {checkCollision, createStage} from "../gamehelpers"
import{StyledTetrisWrapper,StyledTetris}from './styles/StyledTetris'

//Hoooks
import {usePlayer} from '../hooks/usePlayer'
import {useStage} from '../hooks/useStage'
import {useInterval} from '../hooks/useInterval'
import {useGameStatus} from '../hooks/useGameStatus'

//Styles
import './styles/StyledBtn.scss'

const Tetris = ()=>{
    //state
    const [dropTime,setDropTime]=useState(null)
    const [gameOver,setGameOver]=useState(false)
    const [player,setPlayer,updatePlayerPos,resetPlayer,playerRotate]=usePlayer()
    const [stage,setStage,clearState]=useStage(player,resetPlayer)
    const [top,score,setScore,rows,setRows,level,setLevel]=useGameStatus(clearState)

    //function
    const movePlayer = dir=>{
        if(!checkCollision(player,stage,{x:dir,y:0})){
        updatePlayerPos({x:dir,y:0})}
    }

    const startGame = ()=>{
        //Reset everything
        setStage(createStage())
        //set droptime
        setDropTime(1000)//1s
        resetPlayer()
        setGameOver(false)

        setScore(0)
        setRows(0)
        setLevel(0)
    }

    const quitGame = ()=>{
        setStage(createStage())
        setDropTime(null)
        setPlayer({
            pos:{x : 0,y : 0},
            tetromino: (TETROMINOS[0]).shape,
            collided:false
        })
        setGameOver(false)

        setScore(0)
        setRows(0)
        setLevel(0)
    }

    const drop = ()=>{
        if(rows>(level+1)*10){
            setLevel(prev=>prev+1)
            setDropTime(1000/(level+1)+200)
        }

        if(!checkCollision(player,stage,{x:0,y:1})){
            updatePlayerPos({x:0,y:1,collided:false})
        }else{
            if(player.pos.y<1){//?????????????????????0??????????????????
                console.log("Game Over")
                setGameOver(true)
                setDropTime(null)//????????????
            }
            updatePlayerPos({x:0,y:0,collided:true})//????????????????????????
        }
        
    }

    const dropPlaer = ()=>{
        drop();
    }

    const move = num=>{
        if(!gameOver){
            if(num==2){//???
                movePlayer(-1)
            }else if(num==4){//???
                movePlayer(1)
            }else if(num==5){//???
                dropPlaer()
            }else if(num==3){
                playerRotate(stage,1)//?????????
            }
        }
    }

    const fbtn1=()=>{move(1)};
    const fbtn2=()=>{move(2);};
    const fbtn3=()=>{move(3)};
    const fbtn4=()=>{move(4)};
    const fbtn5=()=>{move(5)};
    
    //interval-incline function
    useInterval(()=>{
        drop()
    },dropTime)//dropTime???null?????????

    return (//???????????????????????????props????????????;wrapper????????????????????????????????????????????????????????????
        <StyledTetrisWrapper>
            <StyledTetris>
            <Stage stage={stage}/>
                <aside>
                {gameOver?(
                    <Display gameOver={gameOver} text="GameOver" />
                    ):(
                        <div>
                        <Display text={"TopScore: "+top}/>
                        <Display text={"Score: "+score}/>
                        <Display text={`Rows: ${rows}`}/>
                        <Display text={`Level: ${level}`}/>
                        </div>
                    )}
                {(dropTime==null)?(<StartButtonn callback={startGame} text="Start Game"/>
                    ):(
                        <div>
                        <StartButtonn callback={startGame} text="Restart Game"/>
                        <StartButtonn callback={quitGame} text="Quit Game"/>
                        </div>
                )}
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