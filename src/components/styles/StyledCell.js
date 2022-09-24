import React from 'react';
import { View } from '@tarojs/components';
import {styled} from 'linaria/react';//必须引入外部样式组件-改用linaria for miniprog
//``用于引入CSS ${}用于在CSS中使用JavaScript
export const StyledCell = styled(View)`
    width:auto;
    background: rgba(${props => props.color},0.7);
    border: ${props=>(props.type===0?'0px solid':'4px solid')};
    border-bottom-color:rgba(${props => props.color},0.1);
    border-right-color:rgba(${props => props.color},1);
    border-top-color:rgba(${props => props.color},1);
    border-left-color:rgba(${props => props.color},0.3);


`//获取color，alpha值为0.8;下为阴影设置