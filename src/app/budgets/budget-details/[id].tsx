import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, Linking } from 'react-native';
import FirebaseStorageService, { Budget, FirebaseQuestionsModel } from '../../../services/firebase';
import Loading from '../../components/components/loading';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useFocusEffect } from '@react-navigation/native';

const statusByName = {
  pending: 'Pendente',
  answered: 'Respondido',
  expired: 'Expirado'
}

const statusColors = {
  pending: '!text-brand-gold',
  answered: '!text-utils-success',
  expired: '!text-utils-danger'
}

const IconByStatus = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return (
        <Feather name="alert-circle" size={24} className={statusColors[status]}/>
      )
    case 'answered':
      return (
        <Feather name="check-circle" size={24} className={statusColors[status]}/>
      )
    case 'expired':
      return (
        <Feather name="alert-triangle" size={24} className={statusColors[status]}/>
      )
  }
}

const onPressContactButton = async (budget: Budget) => {
  return await FirebaseStorageService.changeBudgetStatusById(budget.id, 'answered').then(() => {
    Linking.openURL(`https://api.whatsapp.com/send?phone=55${budget.phone.trim()})}&text=Olá ${budget.name}!`);
  }).catch(error => console.error(error));
}


const BudgetDetails = ({ route }: any) => {
  const { id } = route.params;
  const [budget, setBudget] = useState<Budget>({} as Budget);
  const [questions, setQuestions] = useState<FirebaseQuestionsModel[]>([] as FirebaseQuestionsModel[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const findQuestionById = (id: number) => questions.find(question => question.questionId === id);
  const getResponsePrize = (date: Date | string) => {
    const newdate = new Date(date);
    const thirtyDaysBefore = dayjs(newdate).add(1, 'day');
    return thirtyDaysBefore.format('DD/MM/YYYY [às] HH:mm');
  }

  useEffect(() => {
    const fetchBudgetDetails = async () => await FirebaseStorageService.getBudgetById(id);
    const fetchQuestions = async () => await FirebaseStorageService.getQuestions();
    
    Promise.all([
      fetchQuestions(),
      fetchBudgetDetails()
    ]).then(([fetchedQuestions, fetchedBudgets]) => {
      setBudget(fetchedBudgets);
      setQuestions(fetchedQuestions);
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <Loading/>;
  }


  return (
    <View className='flex-1 bg-brand-black px-3'>
      <Text className='my-6 text-brand-text font-SedgwickAveDisplay text-3xl text-center'>
        {budget.name}
      </Text>

      <View className='flex flex-col gap-4'>
          <View className='flex flex-col w-full gap-4 p-5 bg-secondary-black rounded-lg'>
            <View className='flex flex-col gap-2 justify-start'>
              <Text className='text-brand-text font-Inter text-base font-bold'>
                Telefone
              </Text>
              <Text className='text-brand-text font-Inter text-base'>
                {budget.phone}
              </Text>
            </View>

            { budget.optionsSelected?.map((option, index) => {
              return (
                <View key={index} className='flex flex-col gap-2 justify-start'>
                  <Text className='text-brand-text font-Inter text-base font-bold'>
                    { findQuestionById(option.questionId)?.questionName }
                  </Text>
                  <Text className='text-brand-text font-Inter text-base'>
                    {option.description}
                  </Text>
                </View>
              );
            })}
          </View>
          
          <View className='flex flex-row justify-start items-center w-full gap-4 p-5 bg-secondary-black rounded-lg'>
            <IconByStatus status={budget.status}></IconByStatus>
            <Text className='text-brand-text font-Inter text-base'>
              Status: { statusByName[budget.status] }
            </Text>
          </View>

          <View className='flex flex-col items-center w-full gap-4 p-5 bg-secondary-black rounded-lg'>
            <Text className='text-left w-full text-brand-text font-Inter text-base'>
              Data de abertura: { dayjs(budget.dateCreated).format('DD/MM/YYYY [às] HH:mm') }
            </Text>
            <Text className='text-left w-full text-brand-text font-Inter text-base'>
              Prazo de resposta: { getResponsePrize(budget.dateCreated) }
            </Text>
          </View>
      </View>
      
      <View className='mt-8 mb-5'>
        <TouchableHighlight onPress={async() => {
          setIsLoading(true);
          await onPressContactButton(budget).finally(() => setIsLoading(false));
          }}>
            <View className='flex flex-row justify-center items-center w-full h-12 bg-brand-gold rounded-lg'>
              <Text className='text-brand-text font-Inter text-base font-bold'>
                Chamar no Whatsapp
              </Text>
            </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default BudgetDetails;
