import {
  BottomTabNavigationOptions,
  TransitionSpecs,
} from "@react-navigation/bottom-tabs";
import { colors } from "../styles/colors";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  animation: "shift",
  headerTitle: "Albuquerque App",
  headerTitleAlign: "left",
  transitionSpec: TransitionSpecs.ShiftSpec,
  sceneStyle: {
    backgroundColor: colors.brand.black,
    shadowColor: colors.brand.black,
    borderColor: colors.brand.black,
  },
  headerTitleStyle: {
    color: colors.secondary.gray,
    fontFamily: "Inter_700Bold",
    fontSize: 14,
  },
  headerStyle: {
    backgroundColor: colors.secondary.black,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.brand.gold,
    height: 80,
  },
  tabBarActiveTintColor: colors.brand.gold,
  tabBarStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    borderTopWidth: 1,
    borderColor: colors.brand.black,
    backgroundColor: colors.secondary.black,
    paddingTop: 5,
  },
};

export const headerOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: colors.secondary.black },
  headerTintColor: colors.brand.text,
  navigationBarColor: colors.secondary.black,
  statusBarBackgroundColor: colors.secondary.black,
};
