import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CocktailService from "../api/cocktailService";
import styles from "../theme/style";

const CocktailPage = ({ navigation }) => {
  const [searchText, setSearchtext] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([]);

  const validateInput = () => {
    setIsValid(true);
  };

  const getCocktail = async () => {
    try {
      const response = await CocktailService.searchCocktailsByName(searchText);
      setData(response);
      validateInput();
    } catch (error) {
      console.error(error);
    }
  };
  const renderCocktail = (item) => {
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
          onSubmitEditing={() => getCocktail()}
          placeholder="Enter a cocktail name"
        ></TextInput>
      </View>
      {!isValid ? (
        <View style={styles.container3}>
          <Text style={styles.text}>Nothing to drink yet !</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderCocktail}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default CocktailPage;
