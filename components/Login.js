import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import WavyBody from "./WavyBody";
// import * as Font from "expo-font";
import { Fontisto, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { firebase } from "../src/firebase/config";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
export default function Login({ navigation }) {
  console.log(Dimensions.get("window").width);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // useEffect(() => {
  //   async function loadFont() {
  //     await Font.loadAsync({
  //       "regular": require("../assets/fonts/Chivo-Regular.ttf"),
  //       "light": require("../assets/fonts/Chivo-Light.ttf"),
  //       "bold": require("../assets/fonts/Chivo-Bold.ttf"),
  //     });
  //   }
  //   loadFont();
  // }, []);
  let [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Chivo-Regular.ttf"),
    light: require("../assets/fonts/Chivo-Light.ttf"),
    bold: require("../assets/fonts/Chivo-Bold.ttf"),
  });
  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            console.log(user)
            if(user.accType === "customer"){
              navigation.navigate("Main", { user });
            }else{
              navigation.navigate("SupplierMain", { user });

            }
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  const goToSignUp = () => {
    navigation.navigate("SignUp");
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
          <View style={styles.innerView}>
            {/* <WavyBody customStyles={styles.svgCurve} /> */}
            <View style={styles.inputView}>
              <View style={styles.textWrapper}>
                <Fontisto name="email" size={20} color="#c7c7c7" />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#c7c7c7"
                  onChangeText={(text) => setEmail(text)}
                  style={[
                    styles.textInput,
                    {
                      color: "black",
                    },
                  ]}
                  autoCapitalize="none"
                />
                <TouchableOpacity>
                  <Feather name="check" color="#c7c7c7" size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.textWrapper}>
                <Feather name="lock" size={20} color="#c7c7c7" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#c7c7c7"
                  onChangeText={(text) => setPassword(text)}
                  style={[
                    styles.textInput,
                    {
                      color: "black",
                    },
                  ]}
                  autoCapitalize="none"
                />
                <TouchableOpacity>
                  <Feather name="eye" color="#c7c7c7" size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => onLoginPress()}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Log In</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.lineWrapper}>
                  <View style={styles.line}></View>
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.line}></View>
                </View>
                <TouchableOpacity onPress={goToSignUp}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign Up</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  },
  imageStyle: {
    width: "100%",
    height: "100%",

    resizeMode: "cover",
    // justifyContent: "center",
    // alignItems: "center",
    justifyContent: "flex-end",

  },
  svgCurve: {
    width: Dimensions.get("window").width,
  },
  innerView: {
    width: Dimensions.get("window").width,
  },
  inputView: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopEndRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
    // position: "absolute",
    // bottom: 0,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 20,
    paddingTop: 10,
    color: "#000",
    fontFamily: "regular",
  },
  textWrapper: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    // paddingHorizontal: 20,
    marginTop: 20,
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
    color: "#c7c7c7",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "bold",
  },
  lineWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#c7c7c7",
    width: "40%",
    marginBottom: 6,
  },
  orText: {
    width: "20%",
    textAlign: "center",
    color: "#c7c7c7",
  },
});
