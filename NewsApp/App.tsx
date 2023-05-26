import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewsScreen } from "./Screens/NewsScreen";
import { NewsDetailsScreen } from "./Screens/NewsDetailsScreen";
import { NewsContextProvider } from "./store/News-context";
import { GlobalStyles } from "./utls/Colors";

export default function App() {
  const Stack = createNativeStackNavigator();
  const theme = useColorScheme();
  const themedColors =
    theme === "dark" ? GlobalStyles.darkColors : GlobalStyles.lightColors;

  return (
    <>
      <StatusBar style="auto" />
      <NewsContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="NewsScreen"
              component={NewsScreen}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
