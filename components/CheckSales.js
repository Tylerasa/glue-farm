import React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { firebase } from "../src/firebase/config";
import "firebase/storage";
import {
  Fontisto,
  SimpleLineIcons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
export default function CheckSales({ navigation }) {
  const db = firebase.firestore();
  const [products, setProducts] = useState([]);
  const storage = firebase.storage().ref();

  useEffect(() => {
    db.collection("supplier products")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let item = doc.data();
          storage
            .child(item.path)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setProducts([...products, { item, url }]);
            });
          console.log(item);
        });
        console.log(products);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-left" size={32} color="black" />
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/profile.jpg")}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{display: "flex"}}>
          {products.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                // onPress={() =>
                //   navigation.navigate("Product", {
                //     item: item,
                //   })
                // }
              >
                <View style={styles.categorySelectedItemWrapper}>
                  <Image
                    source={ele.url}
                    style={styles.categorySelectedImage}
                  />
                  {/* <View style={styles.subText}>
                    <View>
                      <Text style={styles.categorySelectedItem}>
                        {item.title}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.categorySelectedItem}>
                        ${item.price}
                      </Text>
                    </View>
                  </View> */}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
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
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
});
