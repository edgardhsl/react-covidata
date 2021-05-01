import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { theme as appTheme } from '../constants';

const { height } = Dimensions.get('screen');

class Card extends React.Component {

  openNews(e, link) {
    Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
  };
  
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.thumbnail}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex={2} style={styles.cardDescription}>
            <Text size={16} style={styles.cardTitle}>{item.title}.</Text>
            <Text numberOfLines={5} size={12} style={styles.cardTitleDescription}>{item.description.substring(0, 200) + "..."}</Text>
            <Text size={13} muted={!ctaColor} color={ctaColor || appTheme.COLORS.ACTIVE} bold onPress={(e) => this.openNews(e, item.url)}>
                Ler mais em {item.publisher}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    //minHeight: (height < 700 ? 280 : 200),
    marginBottom: 16
  },
  cardTitle: {
      flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold'
  },
  cardTitleDescription: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '800',
    paddingVertical: 5,
    textAlign: 'justify'
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: '100%'
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);