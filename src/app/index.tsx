import { NavigationContainer } from "@react-navigation/native";
import { SedgwickAveDisplay_400Regular } from "@expo-google-fonts/sedgwick-ave-display";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { headerOptions } from "../styles/tabStyle";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts
} from "@expo-google-fonts/inter";

import Tabs from "./tabs";
import Loading from "./components/components/loading";
import BudgetDetails from "./budgets/budget-details/[id]";

import "../styles/global.css"
import { View } from "react-native";
import { SplashScreen } from "expo-router";

const Stack = createNativeStackNavigator();

export default function App() {
  const fonts = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    SedgwickAveDisplay_400Regular
  });

  if (!fonts) {
    return (<Loading/>);
  }

  SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      <View className="flex-1 bg-brand-black">      
        <Stack.Navigator 
          initialRouteName='root'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen 
            options={{
              ...headerOptions,
              title: 'Albuquerque App',
            }}
            name="root" 
            component={Tabs} 
          />
          <Stack.Screen 
            options={{
              ...headerOptions,
              title: 'Detalhes',
            }} 
            name="details"
          >
            {(props) => <BudgetDetails route={props.route}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}