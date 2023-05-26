import { Text, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { getNews } from "../Network/http";

export function NewsDetailsScreen() {
  return (
    <View style={style.mainScreenView}>
      <Text style={style.mainText}>News Screen</Text>
    </View>
  );
}

const style = StyleSheet.create({
  mainText: {
    color: "red"
  },
  mainScreenView: {
    flex: 1
  }
});
