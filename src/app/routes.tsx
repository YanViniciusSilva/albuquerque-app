import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Configurations from './configurations';
import Feather from '@expo/vector-icons/Feather';

import "../styles/global.css"
import '../../gesture-handler';
import Budgets from './budgets';
import { screenOptions } from '../styles/tabStyle';

const Tab = createBottomTabNavigator();

export default class Routes extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
          name="budgets" 
          component={Budgets}
          options={
            {
              tabBarIcon(props) {
                return <Feather name="activity" color={props.color} size={24} />
              },
              tabBarLabel: 'Orçamentos'
          }        
          }
        />
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
    )
  }
}