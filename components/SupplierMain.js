import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Alert
} from "react-native";
import { useFonts } from "expo-font";
import Sheet from "react-modal-sheet";
import * as ImagePicker from "expo-image-picker";
import { NavigationContainer } from "@react-navigation/native";
import { Camera } from "expo-camera";
let camera;
export default function SupplierMainMain({ navigation, route }) {
  const { user } = route.params;
  // const options = ["Add New Product", "Monitor Products", "Check Sales"];
  const [isOpen, setOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState();

  let [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Chivo-Regular.ttf"),
    light: require("../assets/fonts/Chivo-Light.ttf"),
    bold: require("../assets/fonts/Chivo-Bold.ttf"),
  });
  useEffect(() => {
    if (image !== null) {
      setOpen(!isOpen);
      navigation.navigate("AddImage", { image, user });
    }
  }, [image]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const takePhoto = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const __takePicture = async () => {
    if (!camera) return;
    const image = await camera.takePictureAsync();
    console.log(image);
    navigation.navigate("AddImage", { image: image.uri, user });
    setStartCamera(false)
    setOpen(false)
    // setPreviewVisible(true);
    // setCapturedImage(photo);
  };

  return (
    <View style={{flex: 1}}>
      {startCamera ? (
        <Camera
          style={{ flex: 1, width: "100%" }}
          ref={(r) => {
            camera = r;
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <View style={styles.container}>
          <View>
            <View style={styles.menuWrapper}>
              <Image
                source={require("../assets/images/profile.jpg")}
                style={styles.profileImage}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setOpen(!isOpen)}
                style={styles.optWrapper}
              >
                <Text style={styles.optText}>Add New Product</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optWrapper}>
                <Text style={styles.optText}>Monitor Products</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("CheckSales", { user })}
                style={styles.optWrapper}
              >
                <Text style={styles.optText}>Check Sales</Text>
              </TouchableOpacity>
            </View>
            <Sheet
              snapPoints={[600, 400, 100, 0]}
              initialSnap={1}
              isOpen={isOpen}
              onClose={() => setOpen(false)}
            >
              <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                  <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                    <TouchableOpacity
                      onPress={takePhoto}
                      style={styles.optWrapper}
                    >
                      <Text style={styles.optText}>Take a Picture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={pickImage}
                      style={styles.optWrapper}
                    >
                      <Text style={styles.optText}>Add From Cameraroll</Text>
                    </TouchableOpacity>
                  </View>
                </Sheet.Content>
              </Sheet.Container>

              <Sheet.Backdrop />
            </Sheet>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  menuWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
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
  optWrapper: {
    width: "100%",
    height: 50,
    paddingVertical: 15,
    paddingLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 20,
    borderRadius: 10,
  },
  optText: {
    fontSize: 18,
    color: "black",
  },
});
