import React, { Component } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BudgetsList from './budget-list';
import BudgetDetails from './budget-details/[id]';

const Stack = createNativeStackNavigator();

export default class Budgets extends Component {
  render() {
    return (
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName='list'
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="list">
                {(props) => <BudgetsList navigation={props.navigation}/>}
            </Stack.Screen>
            <Stack.Screen name="details">
                {(props) => <BudgetDetails route={props.route}/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    )
  }
}