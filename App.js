import React from "react";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import { theme } from "./constants";
enableScreens();

import Screens from "./navigation/Screens";

export default props => {
    return (
        <NavigationContainer>
          <GalioProvider theme={theme}>
            <Block flex>
                <Screens></Screens>
            </Block>
          </GalioProvider>
        </NavigationContainer>
    );
}