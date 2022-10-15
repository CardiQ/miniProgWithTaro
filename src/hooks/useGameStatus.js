import {useState,useEffect,useCallback} from 'react'

export const useGameStatus = clearState=>{
    const [score,setScore] = useState(0)
    const [rows,setRows] = useState(0)
    const [level,setLevel] = useState(0)
    const [top,setTop] = useState(0)

    const linePointCount = [40,100,300,1200]//古典计分

    const calcuScore = useCallback(()=>{
        if(clearState>0){
            setScore(prev=>prev+linePointCount[clearState-1]*(level+1))
            console.log('score:'+score)//score值滞后:react特性，setState不会立刻改变而是入缓存一起改变
            if(score+linePointCount[clearState-1]*(level+1)>top)//更改最高分
            {
                console.log('happened')
                setTop(score+linePointCount[clearState-1]*(level+1))
                console.log('top:'+top)
            }
            setRows(prev=>prev+clearState)
        }
    },[level,linePointCount,clearState])

    useEffect(()=>{
        calcuScore()
    },[calcuScore,clearState,score,top])

    return [top,score,setScore,rows,setRows,level,setLevel]
}