import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Fontisto,
  SimpleLineIcons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';
const height = Dimensions.get("window").height;

const Product = ({ route, navigation }) => {
  const { item } = route.params;
  const [like, setLike] = useState(false);

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

  const handleLike = () => {
    setLike(!like);
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground source={item.image} style={styles.backgroundImage}>
            <SafeAreaView>
              <View style={styles.menuWrapper}>
                <TouchableOpacity
                  style={styles.backIcon}
                  onPress={() => navigation.goBack()}
                >
                  <Entypo name="chevron-left" size={32} color="black" />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity>
                    <AntDesign
                      name="shoppingcart"
                      size={32}
                      color="black"
                      style={styles.menuIcon}
                    >
                      <Text style={styles.ribbonText}>2</Text>
                    </AntDesign>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
          <View style={styles.descriptionWrapper}>
            <TouchableOpacity onPress={handleLike}>
              <View style={styles.heartWrapper}>
                {like ? (
                  <Entypo name="heart" size={32} color="#0C2431" />
                ) : (
                  <Entypo name="heart-outlined" size={32} color="#0C2431" />
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.titleTextWrapper}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.priceText}>${item.price}</Text>
              <Text style={styles.pdtInfo}>Product Information</Text>
              <ScrollView style={styles.pdfScrollView}>
                <Text style={styles.productDescriptionText}>
                  {item.productDescription}
                </Text>
              </ScrollView>
            </View>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => alert("Added To Cart!")}
            >
              <Text style={styles.buttonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    height: height * 0.6,
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -20,
    borderRadius: 25,
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
  titlesWrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  itemTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 32,
    color: "white",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: "white",
  },
  heartWrapper: {
    position: "absolute",
    right: 40,
    top: -30,
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleTextWrapper: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  titleText: {
    fontFamily: "bold",
    fontSize: 24,
    color: "black",
  },
  descriptionText: {
    marginTop: 20,
    fontFamily: "regular",
    fontSize: 16,
    color: "gray",
    height: 85,
  },
  infoWrapper: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  infoItem: {},
  infoTitle: {
    fontFamily: "bold",
    fontSize: 12,
    color: "gray",
  },
  infoTextWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  infoText: {
    fontFamily: "bold",
    fontSize: 24,
    color: "orange",
  },
  infoSubText: {
    fontFamily: "bold",
    fontSize: 14,
    color: "gray",
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
  menuWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ribbonWrapper: {},
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
  priceText: {
    color: "gray",
    fontSize: 20,
    fontFamily: "bold",
    marginBottom: 10,
  },
  productDescriptionText: {
    fontFamily: "light",
  },
  pdtInfo: {
    fontFamily: "regular",
    fontSize: 18,
    marginBottom: 10,
  },
  pdfScrollView: {
    maxHeight: 110,
  },
});

export default Product;
