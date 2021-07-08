import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg"
export default function WavyBody({ customStyles }) {
  return (
    <View style={customStyles}>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <Path
          fill="#fff"
          fillOpacity="1"
          d="M0,224L48,218.7C96,213,192,203,288,176C384,149,480,107,576,85.3C672,64,768,64,864,96C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></Path>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({});
