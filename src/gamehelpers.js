export const STAGE_WIDTH=12
export const STAGE_HEIGHT=20

export const createStage=()=>(
    Array.from(Array(STAGE_HEIGHT),()=>(//函数为每个数组中的元素建立一个数组
        new Array(STAGE_WIDTH).fill([0,'clear'])//0在web意味nothing，clear意味着清除
    ))
)

export const checkCollision = ( player, stage, {x:movex,y:movey} )=>{
    for(let j=0;j<player.tetromino.length;j+=1){
        for(let i=0;i<player.tetromino[j].length;i+=1){
            if(player.tetromino[j][i]!==0){//对实体部分判断
                if(
                    (!stage[j+player.pos.y+movey])||
                    (!stage[j+player.pos.y+movey][i+player.pos.x+movex])||//不出，undefined
                    (stage[j+player.pos.y+movey][i+player.pos.x+movex][1]!=='clear')//不合并，分开看0和clear，clear只是merged的反面与cell样式无关
                ){
                    return true;
                }
            }
        }
    }
}