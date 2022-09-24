import React from 'react'//不知顶层界面到底如何渲染，先从已有的界面写
import Tetris from '../../components/Tetris'
import { Component } from 'react'
import { View, Text ,Swiper,SwiperItem,Image} from '@tarojs/components'
import './index.scss'


export default class Index extends Component {

  /*componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }*/

  render () {
    return (
      <View className='app'>
        <View className='Tetris'>
          <Tetris/>
        </View>
      </View>
    )
  }
}
