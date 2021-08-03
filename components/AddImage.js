import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Button,
  Alert,
} from "react-native";
import {
  Fontisto,
  SimpleLineIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import { firebase } from "../src/firebase/config";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import "firebase/storage";
import { useEffect } from "react/cjs/react.production.min";

export default function AddImage({ route, navigation }) {
  const MAX_POINTS = 500;
  const [pdtDesc, setPdtDesc] = useState("");
  const [pdtName, setPdtName] = useState("");
  const [itemValue, setItemValue] = useState(0);
  const [price, setPrice] = useState(0);
  const storage = firebase.storage();
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const db = firebase.firestore();
  var storageRef = firebase.storage().ref();
  // db.settings({
  //   timestampsInSnapshots: true
  // });
  // const pdtInfo = db.collection("supplier products").add({
  //   name: pdtName,
  //   description: pdtDesc,
  //   image: image,
  //   numberinStock: itemValue,
  //   price
  // });
  var metadata = {
    contentType: "image/jpeg",
  };
  async function handleSubmit() {
    if (price > 0 && pdtDesc.length > 10 && itemValue > 0 && pdtName.length > 4) {
      setModalVisible(true);
      const response = await fetch(route.params.image);
      const blob = await response.blob();
      const uploadTask = storage
        .ref()
        .child(`images/${pdtName}`)
        .put(blob, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log(typeof progress);
          if (progress == 100) {
            navigation.navigate("SupplierMain");
          }
        },
        (error) => {
          console.log(error);
        }
      );
      uploadTask
        .then((res) => {
          console.log("Image uploaded to the bucket!");
          console.log(res);
          console.log(uploadTask);
          console.log(storage);
          setModalVisible(!modalVisible);
          const pdtInfo = db.collection("supplier products").add({
            name: pdtName,
            description: pdtDesc,
            numberInStock: itemValue,
            price,
            image: `gs://${uploadTask._ref.bucket}/images/${pdtName}`,
            path: `images/${pdtName}`,
            id: route.params.user.id,
          });
          console.log(pdtInfo);
        })
        .catch((e) => {
          console.log("uploading image error => ", e);
          setModalVisible(!modalVisible);
        });
    } else {
      Alert.alert(
        "Check Input Fields... Product must not be less than 4, Product Description must not be less 10, Price and Stock Number can't be 0"
      );
      console.log("Error")
  
    }
  }

  return (
    <View style={styles.container}>
      {route.params.image && (
        <Image
          source={{ uri: route.params.image || route.params.image }}
          style={{ width: "100%", height: 350 }}
        />
      )}
      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Product Name"
          placeholderTextColor="#c7c7c7"
          onChangeText={(text) => setPdtName(text)}
          style={[
            styles.textInput,
            {
              color: "black",
            },
          ]}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Product Description"
          placeholderTextColor="#c7c7c7"
          onChangeText={(text) => setPdtDesc(text)}
          style={[
            styles.textInput,
            {
              color: "black",
            },
          ]}
          autoCapitalize="none"
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <Text>Number in stock: </Text>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={styles.itemBtn}
              onPress={() => setItemValue(itemValue + 1)}
            >
              <Feather name="chevron-up" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ paddingHorizontal: 5 }}>{itemValue}</Text>
            <TouchableOpacity
              style={styles.itemBtn}
              onPress={() => setItemValue(itemValue - 1)}
            >
              <Feather name="chevron-down" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text>Price: </Text>
          <TextInput
            placeholder="$0"
            placeholderTextColor="#c7c7c7"
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
            style={[
              styles.textInputPrice,
              {
                color: "black",
              },
            ]}
            autoCapitalize="none"
          />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 100,
          // display: "flex",
          display: modalVisible ? "flex" : "none",
          backgroundColor: "#00000080",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 300,
            height: 300,
            borderRadius: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <AnimatedCircularProgress
            size={200}
            width={3}
            fill={progress}
            tintColor="red"
            backgroundColor="#3d5875"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {(progress) => <Text style={styles.points}>{progress}</Text>}
          </AnimatedCircularProgress>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemBtn: {
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 20,
    paddingVertical: 20,
    marginBottom: 20,
    color: "#000",
    fontFamily: "regular",
    // height: 40,
    borderRadius: 18,
    height: 40,
    paddingLeft: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  textInputPrice: {
    marginTop: 10,
    // flex: 1,
    marginLeft: 30,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 20,
    paddingVertical: 20,
    marginBottom: 20,
    color: "#000",
    fontFamily: "regular",
    // height: 40,
    borderRadius: 18,
    height: 40,
    paddingLeft: 20,
    width: "20%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  buttonWrapper: {
    marginHorizontal: 20,
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
  points: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 72,
    left: 56,
    width: 90,
    textAlign: "center",
    color: "#7591af",
    fontSize: 50,
    fontWeight: "100",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
