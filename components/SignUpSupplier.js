import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import WavyBody from "./WavyBody";
// import * as Font from "expo-font";
import { Fontisto, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { firebase } from "../src/firebase/config";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
export default function SignUpSupplier({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const onRegisterPress = () => {
    console.log(email, password);
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Main", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      style={styles.imageStyle}
      source={require("../assets/images/main.jpg")}
    >
      <View style={styles.container}>
        <View style={styles.innerView}>
          {/* <WavyBody customStyles={styles.svgCurve} /> */}

          <View style={styles.inputView}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <View style={styles.textWrapper}>
                    <SimpleLineIcons name="user" size={20} color="#c7c7c7" />
                    <TextInput
                      placeholder="Full Name"
                      placeholderTextColor="#c7c7c7"
                      onChangeText={(text) => setFullName(text)}
                      style={[
                        styles.textInput,
                        {
                          color: "black",
                        },
                      ]}
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.textWrapper}>
                    <Fontisto name="email" size={20} color="#c7c7c7" />
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#c7c7c7"
                      onChangeText={(text) => setEmail(text)}
                      value={email}
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
                    <Feather name="hash" size={20} color="#c7c7c7" />
                    <TextInput
                      placeholder="Ref. Number"
                      placeholderTextColor="#c7c7c7"
                      style={[
                        styles.textInput,
                        {
                          color: "black",
                        },
                      ]}
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.textWrapper}>
                    <Feather name="lock" size={20} color="#c7c7c7" />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#c7c7c7"
                      onChangeText={(text) => setPassword(text)}
                      value={password}
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
                  <View style={styles.textWrapper}>
                    <Feather name="lock" size={20} color="#c7c7c7" />
                    <TextInput
                      placeholder="Confirm Password"
                      placeholderTextColor="#c7c7c7"
                      onChangeText={(text) => setConfirmPassword(text)}
                      value={confirmPassword}
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
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <View style={styles.buttons}>
              <TouchableOpacity onPress={onRegisterPress}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.lineWrapper}>
                <View style={styles.line}></View>
                <Text style={styles.orText}>or</Text>
                <View style={styles.line}></View>
              </View>
              <TouchableOpacity onPress={goToLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Log In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
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
  svgCurve: {
    width: Dimensions.get("window").width,
  },
  innerView: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
  },
  inputView: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopEndRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
