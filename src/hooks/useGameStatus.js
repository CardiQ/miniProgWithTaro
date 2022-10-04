import {useState,useEffect,useCallback} from 'react'

export const useGameStatus = clearState =>{
    const [score,setScore] = useState(0)
    const [rows,setRows] = useState(0)
    const [level,setLevel] = useState(0)

    const linePointCount = [40,100,300,1200]//古典计分

    const calcuScore = useCallback(()=>{
        if(clearState>0){
            setScore(prev=>prev+linePointCount[clearState-1]*(level+1))
            setRows(prev=>prev+clearState)
        }
    },[level,linePointCount,clearState])

    useEffect(()=>{
        calcuScore()
    },[calcuScore,clearState,score])

    return [score,setScore,rows,setRows,level,setLevel]
}