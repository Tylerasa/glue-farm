import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
export default function SignUpWrapper({navigation}) {

  const goToCustomer = ()=>{
    navigation.navigate("SignUp")
  }

  const goToSupplier = ()=>{
    navigation.navigate("SignUpSupplier")

  }
  return (
    <View style={styles.container}>
        <ImageBackground
          style={styles.imageStyle}
          source={require("../assets/images/main.jpg")}
        >
        <View style={styles.buttons}>
          <TouchableOpacity onPress={goToCustomer}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Sign Up as Customer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToSupplier}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Sign Up as Supplier</Text>
            </View>
          </TouchableOpacity>
        </View>
    </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
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
  imageStyle: {
    width: "100%",
    height: "100%",

    resizeMode: "cover",
    // justifyContent: "center",
    // alignItems: "center",
    justifyContent: "flex-end",

  },
});
