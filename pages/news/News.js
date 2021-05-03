import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import { WaveIndicator } from "react-native-indicators";
import { Block, Button } from "galio-framework";
import Card from "../../components/Card";
import { NewsServices } from "../../services/news.services";
export default class News extends React.Component {

    screenHeight = Dimensions.get("window").height;
    flatListRef;
    lastScrollOffset = 0;

    newsService = new NewsServices();
    errorServer = false

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            news: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.getNews();
    }

    getNews() {
        if (this.state.isLoading) {
            return;
        }

        if (this.state.news.length > 0) 
            this.state.currentPage += 1;

        this.setState({ isLoading: true });

        this.newsService.getAll(this.state.currentPage, 10)
        .then((news) => this.setState({ news: [...this.state.news, ...news.data.results] }))
        .catch(e => this.errorServer = true)
        .finally(() => {
            this.setState({ isLoading: false });
            if(!this.errorServer) {
                this._animateScrollSuccess();
            }
        });
    }

    renderLoading() {
        return this.state.isLoading ? (
            <WaveIndicator style={styles.loading} size={60} color="#5E72E4" />
        ) : null;
    }

    _isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToBottom = 0;
        this.lastScrollOffset = contentSize;
        return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
        );
    };

    _onScroll({ nativeEvent }) {
        if (this._isCloseToBottom(nativeEvent)) {
            this.getNews();
        }
    }

    _animateScrollSuccess() {
        if (this.state.currentPage > 1) {
            setTimeout(() => {
                this.flatListRef.scrollToOffset({
                animated: true,
                offset: this.lastScrollOffset + 50,
                });
            }, 1000);
        }
    }

    render() {
        if(this.errorServer) {
            return (
                <View>                    
                    <Text 
                        style={{margin: 10, padding: 20, textAlign: 'center', backgroundColor: '#eee', borderRadius: 5}}>
                            Serviço temporariamente indisponível
                    </Text>    
                </View>
            );
        }

        return (
        <Block flex style={styles.group}>

            <View 
                style={{ paddingHorizontal: 10, flex: 1 }}>

                <FlatList
                    ref={(ref) => (this.flatListRef = ref)}
                    onScroll={this._onScroll.bind(this)}
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
