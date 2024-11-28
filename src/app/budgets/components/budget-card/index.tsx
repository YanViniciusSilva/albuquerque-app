import { Text, View } from 'react-native';
import React, { Component } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Budget } from '../../../../services/firebase';
import dayjs from 'dayjs';

const statusColors = {
  pending: '!text-brand-gold',
  answered: '!text-utils-neutral',
  expired: '!text-utils-danger'
}

export default class BudgetsList extends Component<{ budget: Budget}> {
  

  render () {
    const { budget } = this.props;
    const formatDate = dayjs(budget.dateCreated).format("DD/MM/YYYY [às] HH:mm");
    const iconStyle = statusColors[budget.status];
    return (
      <View className="relative">
        <View>
          <View className="flex flex-row justify-start items-center w-full h-24 rounded-lg bg-secondary-black p-5 my-1 gap-4">
            <View className="p-1">
              <MaterialIcons 
                name="receipt-long" 
                className={iconStyle} 
                size={24} 
              />
            </View>
            <View className="flex">
              <Text className="text-lg text-brand-text font-Inter font-semibold">
                {budget.name}
              </Text>
              <Text className="text-sm text-brand-text font-Inter">
                Orçamento feito em: {formatDate}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

// export default BudgetCard;