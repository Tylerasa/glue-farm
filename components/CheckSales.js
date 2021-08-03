import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
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

export default function CheckSales({ navigation, route }) {
  const db = firebase.firestore();
  const [products, setProducts] = useState([]);
  const storage = firebase.storage().ref();
  const [dataFetched, setDataFetched] = useState(false);
  var updateTemp = [];
  useEffect(() => {
    db.collection("supplier products")
      .where("id", "==", route.params.user.id)
      .get()
      .then((snapshot) => {
        const tempDoc = [];
        console.log(snapshot);
        var len = snapshot.docs.length;
        console.log(len);
        snapshot.docs.forEach((doc) => {
          let item = doc.data();
          console.log(item);
          storage
            .child(item.path)
            .getDownloadURL()
            .then((url) => {
              var temp = { item, url };
              updateTemp.push(temp);
              console.log(updateTemp.length);
              // updateTemp = [...updateTemp, temp];

              // console.log(updateTemp);
              // console.log({ item, url });
              // tempDoc.concat({ item, url })
            });
          console.log(updateTemp);
        });
        if (updateTemp.length >= len) {
          console.log("twenty");
          console.log(updateTemp);
        } else {
          console.log("ff");

          console.log(updateTemp);
        }
      });
    setProducts(updateTemp);

    // setProducts(temp)
  }, []);

  setTimeout(() => {
    console.log(products);
    setDataFetched(true);
  }, 5000);

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
        {/* {updateTemp.length === 21
            ? updateTemp.map((ele, i) => {
                return <Text key={i}>{ele.url}</Text>;
              })
            : ""} */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {dataFetched
            ? products.map((ele, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      navigation.navigate("SupplierProduct", { item: ele })
                    }
                  >
                    <View>
                      <Image
                        key={i}
                        source={{
                          uri: ele.url,
                        }}
                        style={{
                          width: 200,
                          height: 300,
                          borderRadius: 30,
                          marginBottom: 10,
                        }}
                      />
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          marginBottom: 20,
                        }}
                      >
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                          In Stock:{" "}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                          {ele.item.price}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            : ""}
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

// <TouchableOpacity
// key={i}
// // onPress={() =>
// //   navigation.navigate("Product", {
// //     item: item,
// //   })
// // }
// >
// <View>
//   <Image
//     source={ele.url}
//     style={styles.categorySelectedImage}
//   />
//   {/* <View style={styles.subText}>
//     <View>
//       <Text style={styles.categorySelectedItem}>
//         {item.title}
//       </Text>
//     </View>
//     <View>
//       <Text style={styles.categorySelectedItem}>
//         ${item.price}
//       </Text>
//     </View>
//   </View> */}
// </View>
// </TouchableOpacity>
