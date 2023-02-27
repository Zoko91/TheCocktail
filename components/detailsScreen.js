import { Image, Text, View } from "react-native";
import styles from "../theme/style";
import React from "react";

const DetailsScreen = ({ route }) => {
  const item = route.params;
  return (
    <View style={styles.container6}>
      <Image style={styles.image2} source={{ uri: item.image }} />
      <Text style={{ fontSize: 25, marginBottom: 10 }}>{item.name}</Text>
      <Text style={{ marginHorizontal: 5, fontSize: 15 }}>
        {item.instructions}
      </Text>
    </View>
  );
};

export default DetailsScreen;
