import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Picker, TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
// import axios from "Axios";
import { v4 as uuidv4 } from "uuid";
import { MaterialIcons } from '@expo/vector-icons';
export default function Checkout({navigation}) {
  const abortController = new AbortController();
  const [selectedValue, setSelectedValue] = useState("mtn");
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("Main")
    }, 2500)
  })
  return (
    <View style={styles.container}>
      <MaterialIcons name="error" size={50} color="black" />
      <Text style={{fontSize: 24, textAlign: "center"}}>Thank You for Business</Text>
      <Text style={{fontSize: 24, textAlign: "center"}}>Currently, the account is sandbox account so you can't make live transactions...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  menuWrapper: {
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backIcon: {
    // marginLeft: 20,
    // marginTop: 60,
  },
  ribbonText: {
    backgroundColor: "#E7CAC2",
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: -10,
    borderRadius: 50,
    position: "absolute",
    fontFamily: "bold",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  totals: {
    fontWeight: "bold",
    fontSize: 18,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#0C2431",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 50,
  },
  buttonText: {
    fontFamily: "regular",
    fontSize: 18,
    color: "white",
  },
});
