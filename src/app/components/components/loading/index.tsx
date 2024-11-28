import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <View className={"flex-1 flex-col h-full justify-center items-center bg-brand-black px-3 py-4"}>
          <View className='animate-spinner flex justify-between rounded-full'>
            <View className='flex justify-center items-center w-6 h-6 rounded-full'>
              <View className='w-2 h-2 bg-brand-gold rounded-full'></View>
            </View>
            <View className='flex justify-center items-center w-6 h-6 rounded-full'>
              <View className='w-2 h-2 bg-brand-gold rounded-full'></View>
            </View>
          </View>
          <Text className='my-2 text-brand-text font-Inter text-xs'>Aguarde...</Text>
        </View>
    )
  }
}