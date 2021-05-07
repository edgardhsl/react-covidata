import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { WaveIndicator } from "react-native-indicators";
import { Block, Card, Button } from 'galio-framework';
import theme from '../../assets/theme';
import { StateServices } from '../../services/state.services';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class States extends React.Component {

    stateServices = new StateServices();
    errorServer = false

    constructor(props) {
        super(props);

        this.state = {
            states: {},
            isLoading: false,
        }
    }

    componentDidMount() {        
        this.getAllStates();
    }

    getAllStates() {
        if (this.state && this.state.isLoading) {
            return;
        }

        this.setState({ isLoading: true });

        this.stateServices.getAll().then(result => this.setState({states: result.data}))
        .catch(_ => this.errorServer = true)
        .finally(() => this.setState({ isLoading: false }));
    }

    openCovidData(state, sg) {
        state.SG = sg;
        this.props.navigation.navigate('CovidData', state);
    }

    renderStates() {
        if(!this.state || !this.state.states) {
            return
        }
        
        return Object.keys(this.state.states).map((state, index) => {
            if(!this.state.states[state]) {
                return;
            }

            return (
                <TouchableOpacity style={{marginTop: 20}} key={index} onPress={() => this.openCovidData(this.state.states[state], state)}>
                    <Card
                        flex                                             
                        key={index}
                        style={styles.card}  
                        avatar={this.state.states[state].flag}
                        title={this.state.states[state].name}
                        caption="Clique para visualizar"
                    />
                </TouchableOpacity>
            )
        })
    }

    renderLoading() {
        return this.state && this.state.isLoading ? (
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
                        <Button onPress={() => {this.getAllStates()}} disabled={this.state.isLoading}>Recarregar</Button>
                    </Block>
                    {this.renderLoading()}
                </Block>
            );
        }

        if(!this.state || (!this.state.isLoading && !this.state.states)) {
            return (
                <Text 
                    style={{margin: 10, padding: 20, textAlign: 'center', backgroundColor: '#eee', borderRadius: 5}}>
                        Nenhum registro encontrado
                </Text>
            );
        }

        return (            
            <Block flex style={styles.group}>
                <Block flex>
                    <ScrollView>
                        <Block style={{ flex: 1, flexDirection: 'column', paddingHorizontal: theme.SIZES.BASE }}>
                           {this.renderStates()}
                        </Block>
                    </ScrollView>
                           {this.renderLoading()}
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff'
    },
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
