import { StatusBar } from "expo-status-bar";
import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import Landing from "./components/Landing";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import Product from "./components/Product";
import { firebase } from "./src/firebase/config"
import SignUpWrapper from "./components/SignUpWrapper";
import SignUpSupplier from "./components/SignUpSupplier";
export default function App() {

  const [loading, setLoading] = useState()
  if (loading) {	
    return (	
      <></>	
    )	
  }
  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="SignUpWrapper" component={SignUpWrapper} />
        <Stack.Screen name="SignUpSupplier" component={SignUpSupplier} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
