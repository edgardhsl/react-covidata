import React from "react";
import { Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens
import News from "../pages/news/News";
import States from "../pages/states/States";

// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import Header from "../components/Header";
import CovidData from "../pages/covid-data/CovidData";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function NewsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="News"
        component={News}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Notícias"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function StateStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="States"
          component={States}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                title="Selecione um estado"
                navigation={navigation}
                scene={scene}
              />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" }
          }}
        />
      </Stack.Navigator>
    );
}

function CovidDataStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="CovidData"
          component={CovidData}
          initialParams={props.route.params}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                title={`Dados do COVID no estado ${props.route.params.name}`}
                navigation={navigation}
                scene={scene}
              />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" }
          }}
        />
      </Stack.Navigator>
    );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      detachInactiveScreens={true}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 5,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="News"
    >
      <Drawer.Screen options={{unmountOnBlur: true}} name="News" component={NewsStack} />
      <Drawer.Screen options={{unmountOnBlur: true}} name="States" component={StateStack} />
      <Drawer.Screen options={{unmountOnBlur: true}} name="CovidData" component={CovidDataStack} />
    </Drawer.Navigator>
  );
}

