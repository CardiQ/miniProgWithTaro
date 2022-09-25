import React from 'react';
import { View } from '@tarojs/components';
import {styled} from 'linaria/react';

export const StyledStage = styled(View)`
    display:grid;
    grid-template-rows:repeat(
        ${props=>props.height},calc(100vw/${props=>props.height})
    );
    grid-template-columns:repeat(${props=>props.width},1fr);
    grid-gap:1px;
    border:8px solid #87CEFA;
    width:100%;
    max-width:180vw;
    background:#87CEFA;
`//1fr意为“分之一”