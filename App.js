import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CocktailService from "./api/cocktailService";

const { width } = Dimensions.get("window");

const CocktailPage = ({ navigation }) => {
  const [searchText, setSearchtext] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);

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
      setDataInfo(item);
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

const IngredientsPage = ({ navigation }) => {
  const [searchText, setSearchtext] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);

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
      setDataInfo(item);
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

// Screen stack for home tab
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Cocktails"
      screenOptions={screenOptions}
    >
      <HomeStack.Screen
        name="Cocktails"
        component={CocktailPage}
        options={{ title: "Cocktails" }}
      />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
};

// Screen stack for settings tab
const SettingsStack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName="Ingredients"
      screenOptions={screenOptions}
    >
      <SettingsStack.Screen name="Ingredients" component={IngredientsPage} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#f4511e" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Cocktails") {
              iconName = focused ? "ios-wine" : "ios-wine-outline";
            } else if (route.name === "Ingredients") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "gray",
          // Hiding tab navigator header to show only stack header
          headerShown: false,
        })}
      >
        <Tab.Screen name="Cocktails" component={HomeStackNavigator} />
        <Tab.Screen name="Ingredients" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  container2: {
    width: width,
    height: 50,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
  },
  container3: {
    justifyContent: "center",
    height: 500,
  },
  container4: {
    height: 1000,
  },
  container5: {
    flex: 1,
    width: width,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(73,12,96,0.1)",
    marginBottom: 10,
  },
  container6: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 80,
    marginLeft: 5,
  },
  image2: {
    marginVertical: 20,
    width: 200,
    height: 200,
  },
  text: { fontSize: 18, paddingBottom: 10 },
  buttonContainer: {},
  text2: { fontSize: 15, marginLeft: 5 },
});

// Common stack header options
const screenOptions = {
  headerStyle: {
    backgroundColor: "#bb1ef4",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
