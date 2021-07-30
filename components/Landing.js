import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";


export default function Landing({ navigation }) {
 
  // useEffect(() => {
  //   async function loadFont() {
  //     await Font.loadAsync({
  //       regular: require("../assets/fonts/Chivo-Regular.ttf"),
  //       light: require("../assets/fonts/Chivo-Light.ttf"),
  //       bold: require("../assets/fonts/Chivo-Bold.ttf"),
  //     });
  //   }
  //   loadFont();
  // }, []);
  let [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Chivo-Regular.ttf"),
    light: require("../assets/fonts/Chivo-Light.ttf"),
    bold: require("../assets/fonts/Chivo-Bold.ttf"),
  });
  const goToSignUp = () => {
    navigation.navigate("SignUpWrapper");
  };
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageStyle}
          source={require("../assets/images/main.jpg")}
        >
          <View style={styles.mainTextView}>
            <Text style={styles.mainText}> Tech Dwom </Text>
          </View>

          <View style={styles.textView}>
            <View style={styles.pageText}>
              <Text style={styles.subText}>
                Platform for studets to find quality and affordable products
              </Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={goToSignUp}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Log In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
   
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  // mainTextView: {
  //   position: "absolute",
  //   top: "50%"
  // },
  textView: {
    position: "absolute",
    bottom: 0,
    marginBottom: 40,
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnText: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "bold",
  },
  pageText: {
    paddingHorizontal: 20,
  },
  mainText: {
    fontSize: 50,
    fontFamily: "bold",
    color: "white",
  },
  subText: {
    fontSize: 20,
    fontFamily: "regular",
    color: "white",
  },
});
