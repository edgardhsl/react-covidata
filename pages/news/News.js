import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
import { Block } from "galio-framework";
import Card from "../../components/Card";
import { NewsServices } from "../../services/news.services";

const { width } = Dimensions.get("screen");

//const articles = newsApi.articles

export default class News extends React.Component {

  screenHeight = Dimensions.get("window").height;
  flatListRef;
  lastScrollOffset = 0;

  constructor(props) {
    super(props);

    this.state = {
      services: new NewsServices(),
      currentPage: 1,
      news: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getNews();
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    this.lastScrollOffset = contentSize
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  getNews(action) {
    if (this.state.isLoading) {
      return;
    }

    if (this.state.news.length > 0) this.state.currentPage += 1;

    this.setState({ isLoading: true });

    this.state.services
      .getAll(this.state.currentPage, 3)
      .then((news) => {
        this.setState({
          news: [...this.state.news, ...news.data.results],
        });

        console.log(this.state.news.length);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });

        if(this.state.currentPage > 1) {
            setTimeout(() => {
                this.flatListRef.scrollToOffset({ animated: true, offset: this.lastScrollOffset + 50 });
            }, 1000)
        }
      });
  }

  renderLoading() {
    return this.state.isLoading ? (
      <WaveIndicator style={styles.loading} size={60} color="#5E72E4" />
    ) : null;
  }

  render() {
    return (
      <Block flex style={styles.group}>
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <FlatList
            ref={ref => this.flatListRef = ref}
            onScroll={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this.getNews();
              }
            }}
            scrollEventThrottle={400}
            data={this.state.news}
            ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
            renderItem={({ item }, index) => (
              <Card item={item} key={index} horizontal full />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {this.renderLoading()}
        </View>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
