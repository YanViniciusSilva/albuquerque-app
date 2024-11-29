import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Configurations from './configurations';
import Feather from '@expo/vector-icons/Feather';

import "../styles/global.css"
import '../../gesture-handler';
import { screenOptions } from '../styles/tabStyle';
import BudgetsList from './budgets/budget-list';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default class Tabs extends Component {
  render() {
    return (
      <View className='flex-1 bg-brand-black'>
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
              name="budgets" 
              options={
                {
                  tabBarIcon(props) {
                    return <Feather name="activity" color={props.color} size={24} />
                  },
                  tabBarLabel: 'Orçamentos',
                }        
              }
            >
              {(props) => <BudgetsList navigation={props.navigation}/>}
            </Tab.Screen>
            <Tab.Screen 
              name="configs" 
              component={Configurations} 
              options={
                  {tabBarIcon(props) {
                    return <Feather name="sliders" color={props.color} size={24} />
                  },
                  tabBarLabel: 'Configurações'}            
                }
            />
        </Tab.Navigator>
      </View>
    )
  }
}