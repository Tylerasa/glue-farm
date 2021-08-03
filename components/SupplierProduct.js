import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity
  } from "react-native";
  import {
  Fontisto,
  SimpleLineIcons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
const height = Dimensions.get("window").height;

export default function SupplierProduct({navigation, route}) {
  const { item } = route.params;
    console.log(item)
    const handleSave = ()=>{
        alert("Saved!")
        navigation.goBack()
    }
    return (
        <ScrollView>
        <View style={styles.container}>
          <ImageBackground source={item.url} style={styles.backgroundImage}>
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
            <View style={styles.titleTextWrapper}>
              <Text style={styles.titleText}>{item.item.name}</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.priceText}>${item.item.price}</Text>
              <Text style={styles.pdtInfo}>Product Information</Text>
              <ScrollView style={styles.pdfScrollView}>
                <Text style={styles.productDescriptionText}>
                  {item.item.description}
                </Text>
              </ScrollView>
            </View>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
}

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
})
