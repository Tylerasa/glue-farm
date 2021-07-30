import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";

import categories from "../assets/categories";
import shoes from "../assets/shoes";
import {
  Fontisto,
  SimpleLineIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import AppLoading from "expo-app-loading";
import Sheet from "react-modal-sheet";
export default function Main({ navigation }) {
  const [intensity, setIntensity] = useState(60);
  const [blurType, setBlurType] = useState("light");
  const [isOpen, setOpen] = useState(false);
  const [isOpenCart, setOpenCart] = useState(false);
  const [itemValue, setItemValue] = useState(0);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

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

  const tintColor = ["#ffffff", "#000000"];
  if (blurType === "xlight") {
    tintColor.reverse();
  }
  const handleCheckout = () => {
    setOpenCart(!isOpenCart)
    navigation.navigate("Checkout")
  };
  const renderCategorySelectedItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Product", {
            item: item,
          })
        }
      >
        <View
          style={[
            styles.categorySelectedItemWrapper,
            { marginLeft: item.id === "1" ? 20 : 0 },
          ]}
        >
          <Image source={item.image} style={styles.categorySelectedImage} />
          <View style={styles.subText}>
            <View>
              <Text style={styles.categorySelectedItem}>{item.title}</Text>
            </View>
            <View>
              <Text style={styles.categorySelectedItem}>${item.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView>
            <View style={styles.menuWrapper}>
              <Image
                source={require("../assets/images/profile.jpg")}
                style={styles.profileImage}
              />
              <TouchableOpacity onPress={() => setOpenCart(!isOpenCart)}>
                <View>
                  <AntDesign
                    name="shoppingcart"
                    size={32}
                    color="black"
                    style={styles.menuIcon}
                  >
                    <Text style={styles.ribbonText}>2</Text>
                  </AntDesign>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View style={styles.discoverWrapper}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.discoverCategoriesWrapper}>
                {categories.map((ele, i) => {
                  return (
                    <View style={styles.discoverCategoryTextWrapper}>
                      <Text style={styles.discoverCategoryText}>
                        {ele.text}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View style={styles.categorySelectedWrapper}>
            <FlatList
              data={shoes}
              renderItem={renderCategorySelectedItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.recomWrapper}>
            <View style={styles.recomTitleTextWapper}>
              <Text style={styles.recomTitleText}>Recommended For You</Text>
            </View>
            <FlatList
              data={shoes}
              renderItem={renderCategorySelectedItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <View style={styles.searchContainer}>
            <View style={styles.searchButton}>
              <Feather name="search" size={26} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
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
                <View style={styles.textWrapper}>
                  <Feather name="search" size={26} color="#c7c7c7" />
                  <TextInput
                    placeholder="Search..."
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
                <FlatList
                  data={shoes}
                  renderItem={renderCategorySelectedItem}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </Sheet.Content>
          </Sheet.Container>

          <Sheet.Backdrop />
        </Sheet>

        <Sheet
          snapPoints={[600, 400, 100, 0]}
          initialSnap={1}
          isOpen={isOpenCart}
          onClose={() => setOpenCart(false)}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                <ScrollView>
                  {[1, 2, 3].map((ele, i) => {
                    return (
                      <View style={styles.purItem}>
                        <View style={styles.purItemImageView}>
                          <Image
                            source={require("../assets/images/shoe1.jpg")}
                            style={styles.purItemImage}
                          />
                        </View>
                        <View style={styles.purItemDescView}>
                          <Text style={styles.titleText}>Shoe 1</Text>
                          <Text style={styles.priceText}>&cent;20</Text>
                        </View>
                        <View style={styles.btnWrapper}>
                          <TouchableOpacity
                            style={styles.itemBtn}
                            onPress={() => setItemValue(itemValue + 1)}
                          >
                            <Feather
                              name="chevron-up"
                              size={24}
                              color="black"
                            />
                          </TouchableOpacity>
                          {itemValue}
                          <TouchableOpacity
                            style={styles.itemBtn}
                            onPress={() => setItemValue(itemValue - 1)}
                          >
                            <Feather
                              name="chevron-down"
                              size={24}
                              color="black"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                  <View style={styles.details}>
                    <Text style={styles.totals}>Total:</Text>
                    <Text style={styles.totals}>&cent; 200</Text>
                  </View>
                  <TouchableOpacity onPress={handleCheckout} style={styles.buttonWrapper}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </Sheet.Content>
          </Sheet.Container>

          <Sheet.Backdrop />
        </Sheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  discoverWrapper: {
    // marginHorizontal: 20,
    marginTop: 20,
  },
  discoverCategoriesWrapper: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginTop: 20,
  },
  discoverCategoryText: {
    fontFamily: "regular",
    fontSize: 12,
    color: "black",
  },
  discoverCategoryTextWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: "#E7CAC2",
    textAlign: "center",
    marginRight: 20,
  },
  subText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  categorySelectedItem: {
    fontFamily: "regular",
    fontSize: 18,
  },
  categorySelectedWrapper: {
    marginTop: 10,
  },
  categorySelectedItemWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
  },
  categorySelectedImage: {
    width: 200,
    height: 300,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  recomWrapper: {
    marginTop: 30,
  },
  recomTitleTextWapper: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  recomTitleText: {
    fontSize: 25,
    fontFamily: "bold",
  },
  searchButton: {
    backgroundColor: "#0C2431",
    width: 100,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
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
  blurViewStyle: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  writeTaskWrapper: {
    position: "absolute",
    top: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 50,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "100%",
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
    paddingTop: 10,
    // paddingBottom: 5,

    color: "#000",
    fontFamily: "regular",
    height: 40,
    // borderRadius: 18,
    // height: 40,
    // paddingLeft: 20,
    // width: "100%",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,

    elevation: 7,
  },
  textWrapper: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 18,
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
  purItem: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  purItemImageView: {
    flex: 2,
  },
  purItemImage: {
    width: "90%",
    height: 140,
    borderRadius: 10,
  },
  purItemDescView: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  btnWrapper: {
    flex: 1,
    display: "flex",
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
  titleText: {
    fontFamily: "bold",
    fontSize: 21,
    color: "black",
  },
  priceText: {
    color: "gray",
    fontSize: 18,
    fontFamily: "bold",
    marginBottom: 10,
  },
  hrLine: {
    width: "100%",
    borderBottomColor: "#c7c7c7",
    borderWidth: 1,
    marginVertical: 20,
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
});
