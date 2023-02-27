import CocktailService from "../api/cocktailService";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../theme/style";
import React, { useState, useEffect } from "react";

const IngredientsPage = ({ navigation }) => {
  const [searchText, setSearchtext] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([]);

  const validateInput = () => {
    setIsValid(true);
  };

  const getIngredients = async () => {
    try {
      const response = await CocktailService.searchCocktailsByIngredientName(
        searchText
      );
      console.log(response);
      setData(response);
      validateInput();
    } catch (error) {
      console.error(error);
    }
  };
  const renderIngredient = (item) => {
    const navigate = () => {
      navigation.navigate("Details", item.item);
    };

    return (
      <TouchableOpacity style={styles.container5} onPress={navigate}>
        <Image style={styles.image} source={{ uri: item.item.image }} />
        <Text style={styles.text2}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {});
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TextInput
          style={styles.buttonContainer}
          value={searchText}
          onChangeText={(text) => {
            setSearchtext(text);
          }}
          onSubmitEditing={() => getIngredients()}
          placeholder="Enter an ingredient name"
        ></TextInput>
      </View>
      {!isValid ? (
        <View style={styles.container3}>
          <Text style={styles.text}>Nothing to drink yet !</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderIngredient}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default IngredientsPage;
