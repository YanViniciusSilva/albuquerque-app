import React, { Component } from 'react'
import Loading from '../../components/components/loading';
import FirebaseStorageService, { Budget } from '../../../services/firebase';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import BudgetCard from '../components/budget-card';
import dayjs from 'dayjs';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default class BudgetsList extends Component<{ navigation: any }> {
  state = {
    budgets: [] as Budget[],
    isLoading: true
  };

  async fetchBudgets(): Promise<void> {
    try {
      const fetchedBudgets = await FirebaseStorageService.getBudgets();

      const expireds = fetchedBudgets.filter((budget: Budget) => budget.status === 'expired');
      const pendings = fetchedBudgets.filter((budget: Budget) => budget.status === 'pending');
      const answers = fetchedBudgets.filter((budget: Budget) => budget.status === 'answered');

      const sortedObjcts = [
        ...expireds.sort((a: Budget, b: Budget) => dayjs(a.dateCreated).date() - dayjs(b.dateCreated).date()),
        ...pendings.sort((a: Budget, b: Budget) => dayjs(a.dateCreated).date() - dayjs(b.dateCreated).date()),
        ...answers.sort((a: Budget, b: Budget) => dayjs(a.dateCreated).date() - dayjs(b.dateCreated).date()),
      ]
      
      this.setState({ budgets: sortedObjcts });
    } catch (error) {
      console.error("Erro ao obter budgets:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  
  render() {
    const { budgets, isLoading } = this.state;

  
    this.fetchBudgets();

    if (isLoading) {
      return (<Loading/>)
    }

    if (!isLoading && budgets.length === 0) {
      return (
        <View className={"flex-1 flex-col h-full justify-center items-center bg-brand-black px-3 py-4"}>
          <Text className='my-2 text-brand-text font-Inter text-sm'>
            Sem orçamentos no momento :(
          </Text>
        </View>
      )
    }

    return (
        <ScrollView alwaysBounceVertical={true} horizontal={false} className="flex-1 flex-col bg-brand-black px-3 py-3" >
          <View className='flex-1 flex-col bg-transparent mb-5'>
          {
            budgets.map((budget: Budget, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={
                  () => this.props.navigation.navigate('details', { id: budget.id })
                }
              >
                <BudgetCard key={budget.id} budget={budget}/>
              </TouchableOpacity>
            ))
          }
          </View>
        </ScrollView>
    )
  }
}