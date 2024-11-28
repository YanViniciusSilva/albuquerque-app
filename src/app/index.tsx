import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes";

import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts
} from "@expo-google-fonts/inter";

import { SedgwickAveDisplay_400Regular } from "@expo-google-fonts/sedgwick-ave-display";

import {
  JacquesFrancois_400Regular
} from "@expo-google-fonts/jacques-francois";
import Loading from "./components/components/loading";


export default function App() {
  const fonts = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    JacquesFrancois_400Regular,
    SedgwickAveDisplay_400Regular
  });

  if (!fonts) {
    return (<Loading/>);
  }


  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}