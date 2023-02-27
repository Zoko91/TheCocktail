import { screenOptions } from "../theme/style";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../components/detailsScreen";
import CocktailPage from "../components/cocktailPage";

const CocktailStack = createNativeStackNavigator();
const CocktailNavigator = () => {
  return (
    <CocktailStack.Navigator
      initialRouteName="Cocktails"
      screenOptions={screenOptions}
    >
      <CocktailStack.Screen
        name="Cocktails"
        component={CocktailPage}
        options={{ title: "Cocktails" }}
      />
      <CocktailStack.Screen name="Details" component={DetailsScreen} />
    </CocktailStack.Navigator>
  );
};

export default CocktailNavigator;
