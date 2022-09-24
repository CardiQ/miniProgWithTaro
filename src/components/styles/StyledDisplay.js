import React from 'react';
import { View } from '@tarojs/components';
import {styled} from 'linaria/react';

export const StyledDisplay = styled(View)`
    box-sizing:border-box;
    display:flex;
    align-items:center;
    margin:0 0 20px 0;
    padding:20px;
    border:4px solid #fff;
    min-height:30px;
    width:100%;
    border-radius:20px;
    color:${props=>(props.gameOver?'red':'#999')};
    background:#81D8D0;
    font-family:Pixel,Arial,Helvetica,sans-serif;
    font-size:0.6rem;

`