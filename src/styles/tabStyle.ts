import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { colors } from "../styles/colors";

export const screenOptions: BottomTabNavigationOptions = {
  animation: "shift",
  headerTitle: "Albuquerque App",
  headerTitleAlign: "left",
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
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    borderTopWidth: 4,
    borderColor: colors.brand.black,
    backgroundColor: colors.secondary.black,
    paddingTop: 5,
  },
};
