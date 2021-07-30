import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
// import axios from "Axios";
import { v4 as uuidv4 } from "uuid";
export default function Checkout() {
  const abortController = new AbortController();
  const [selectedValue, setSelectedValue] = useState("mtn");
  const handlePayment = () => {
    // axios
    //   .get(
    //     `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/${uuidv4()}`,
    //     {
    //       headers: {"Access-Control-Allow-Origin": "*"},
    //     },
    //     {
    //       signal: abortController.signal,
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
  };
  return (
    <View style={styles.container}>
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
      <View style={styles.main}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: "100%", marginBottom: 100 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="MTN" value="mtn" />
        </Picker>
        <View style={styles.details}>
          <Text style={styles.totals}>Total:</Text>
          <Text style={styles.totals}>&cent; 200</Text>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 10, width: 100 }}>
        <TouchableOpacity onPress={handlePayment} style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: 20,
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
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonWrapper: {
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
});
