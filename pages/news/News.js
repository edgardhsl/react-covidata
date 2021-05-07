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
            pageSize: 10,
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

        this.setState({ isLoading: true });

        console.log(this.state.news.length, this.state.pageSize)

        const { pageSize } = this.state;
        const nextPage = Math.ceil((this.state.news.length / pageSize) + 1);

        this.newsService.getAll(nextPage, pageSize)
        .then((news) => this.setState({ news: [...this.state.news, ...news.data.results] }))
        .catch(_ => this.errorServer = true)
        .finally(() => {
            this.setState({ isLoading: false });
            if(!this.errorServer) {
                this.setState({currentPage: 1});
                this._animateScrollSuccess();
            }
        });
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

    renderLoading() {
        return this.state.isLoading ? (
            <WaveIndicator style={styles.loading} size={60} color="#5E72E4" />
        ) : null;
    }

    render() {
        if(this.errorServer) {
            return (
                <Block flex style={styles.group}>
                    <Text 
                        style={{margin: 10, padding: 20, textAlign: 'center', backgroundColor: '#eee', borderRadius: 5}}>
                            Serviço temporariamente indisponível
                    </Text>    
                    <Block style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button onPress={() => {this.getNews()}} disabled={this.state.isLoading}>Recarregar</Button>
                    </Block>
                    {this.renderLoading()}
                </Block>
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
