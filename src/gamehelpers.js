export const STAGE_WIDTH=12
export const STAGE_HEIGHT=20

export const createStage=()=>(
    Array.from(Array(STAGE_HEIGHT),()=>(//函数为每个数组中的元素建立一个数组
        new Array(STAGE_WIDTH).fill([0,'clear'])//0在web意味nothing，clear意味着清除
    ))
)
