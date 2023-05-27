import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewsScreen } from "./NewsScreen";
import { NewsDetailsScreen } from "./NewsDetailsScreen";
import { NewsContextProvider } from "../store/News-context";
import { GlobalStyles } from "../utls/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "./SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { languageContenxt } from "../store/Language-context";
import { useContext } from "react";

export function AppScreen() {
  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();
  const languageCtx = useContext(languageContenxt);

  const theme = useColorScheme();
  const themedColors =
    theme === "dark" ? GlobalStyles.darkColors : GlobalStyles.lightColors;

  function MyTabs() {
    return (
      <BottomTab.Navigator
        screenOptions={{
          tabBarBackground: () => (
            <View style={{ backgroundColor: themedColors.headerColor }} />
          )
        }}
      >
        <BottomTab.Screen
          name="NewsScreen"
          component={NewsScreen}
          options={{
            headerShown: false,
            tabBarLabel: languageCtx.language.home,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            )
          }}
        />
        <BottomTab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarLabel: languageCtx.language.settings,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            )
          }}
        />
      </BottomTab.Navigator>
    );
  }
  return (
    <>
      <StatusBar style="auto" />
      <NewsContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="MyTabs"
              component={MyTabs}
              options={{
                title: "Apple News",
                headerStyle: {
                  backgroundColor: themedColors.headerColor
                }
              }}
            />
            <Stack.Screen
              name="NewsDetailsScreen"
              component={NewsDetailsScreen}
              options={{
                title: "News Details",
                headerStyle: {
                  backgroundColor: themedColors.headerColor
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NewsContextProvider>
    </>
  );
}
