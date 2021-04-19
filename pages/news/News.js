import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Block, NavBar, Icon } from 'galio-framework';
import Card from '../../components/Card';
import theme from '../../assets/theme';
import newsApi from '../../assets/newsapi.json';

const { width } = Dimensions.get('screen');

const articles = newsApi.articles

export default class News extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (            
            <Block flex style={styles.group}>
                <Block flex>
                    <ScrollView>
                        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                            {articles.map((article, index) => {
                                return (
                                    <Card item={article} key={index} horizontal full />
                                )
                            })}
                        </Block>
                    </ScrollView>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    cards: {
      width,
      backgroundColor: theme.COLORS.WHITE,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    card: {
      backgroundColor: theme.COLORS.WHITE,
      width: width - theme.SIZES.BASE * 2,
      marginVertical: theme.SIZES.BASE * 0.875,
      elevation: theme.SIZES.BASE / 2,
    },
    full: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
    },
    noRadius: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    rounded: {
      borderRadius: theme.SIZES.BASE * 0.1875,
    },
    gradient: {
      bottom: 0,
      left: 0,
      right: 0,
      height: 90,
      position: 'absolute',
      overflow: 'hidden',
      borderBottomRightRadius: theme.SIZES.BASE * 0.5,
      borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
    },
  });
