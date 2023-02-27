import { screenOptions } from "../theme/style";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../components/detailsScreen";
import IngredientsPage from "../components/ingredientsPage";

const IngredientsStack = createNativeStackNavigator();

const IngredientsNavigator = () => {
  return (
    <IngredientsStack.Navigator
      initialRouteName="Ingredients"
      screenOptions={screenOptions}
    >
      <IngredientsStack.Screen name="Ingredients" component={IngredientsPage} />
      <IngredientsStack.Screen name="Details" component={DetailsScreen} />
    </IngredientsStack.Navigator>
  );
};

export default IngredientsNavigator;
