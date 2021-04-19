import React from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import DrawerCustomItem from '../components/DrawerItem';

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  //const insets = useSafeArea();
  const screens = [
    {title: "Notícias", route: "News"}, 
    {title: "Dados", route: "States"}
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
     <Block flex={0.06} style={styles.header}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>COVI        
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#5E72E4'}}>Dados</Text>
        </Text>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item.title}
                  route={item.route}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  }
});

export default CustomDrawerContent;
