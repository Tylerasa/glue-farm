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
    setModalVisible(true);
    const response = await fetch(route.params.image);
    const blob = await response.blob();
    const uploadTask = storage
      .ref()
      .child(`images/${pdtName}`)
      .put(blob, metadata);
      

    uploadTask
    .on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
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
        console.log(storage)
        setModalVisible(!modalVisible);
        const pdtInfo = db.collection("supplier products").add({
          name: pdtName,
          description: pdtDesc,
          numberInStock: itemValue,
          price,
          image: `gs://${uploadTask._ref.bucket}/images/${pdtName}`,
          path: `images/${pdtName}`
        });
        console.log(pdtInfo);
      })
      .catch((e) => {
        console.log("uploading image error => ", e);
        setModalVisible(!modalVisible);
      });
  }

  return (
    <View style={styles.container}>
      {route.params.image && (
        <Image
          source={{ uri: route.params.image }}
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
            marginTop: 20,
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
        <View>
          <Text>Stock: </Text>
          
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={modalVisible}>
        <View style={styles.centeredView}>
          <AnimatedCircularProgress
            size={200}
            width={3}
            fill={progress}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          >
            {(progress) => <Text style={styles.points}>{progress}</Text>}
          </AnimatedCircularProgress>
        </View>
      </Modal>
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
