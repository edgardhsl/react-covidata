import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Block, Input, Card, Button } from 'galio-framework';
import theme from '../../assets/theme';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { CovidDataServices } from "../../services/covidata.services";
import { WaveIndicator } from 'react-native-indicators';

const numberFormat = (value) => {
    if(!value)
        return ''; 

    value = typeof value !== 'string' ? String(value) : value;
    return new Intl.NumberFormat('pt-BR').format(value.replace(/\D/g, ''));
};

export default class CovidData extends React.Component {

    
    covidDataServices = new CovidDataServices();
    errorServer = false

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount () {    
        this.setState({
            state: this.props.route.params,
            covidData: {},
            isLoading: false
        })
        
        this.getCovidDataByState();
    }

    getCovidDataByState() {
        if(this.state.isLoading) {
            return
        }

        this.setState({isLoading: true});

        this.covidDataServices.getByState(this.props.route.params.SG)
        .then(result => this.setState({covidData: result.data}))
        .catch(_ => this.errorServer = true)
        .finally(() => this.setState({ isLoading: false }));
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
                        <Button onPress={() => {this.getCovidDataByState()}} disabled={this.state.isLoading}>Recarregar</Button>
                    </Block>
                    {this.renderLoading()}
                </Block>
            );
        }

        if(!this.state || (!this.state.isLoading && !this.state.state)) {
            return (
                <Text 
                    style={{margin: 10, padding: 20, textAlign: 'center', backgroundColor: '#eee', borderRadius: 5}}>
                        Nenhum registro encontrado
                </Text>
            );
        }

        return (            
            <Block flex>
                <Block flex>
                    <ScrollView>
                        <Block style={{ flex: 1, flexDirection: 'column', paddingHorizontal: theme.SIZES.BASE }}>
                            <Card 
                                flex              
                                style={{ flex: 1, flexDirection: 'column', marginVertical: theme.SIZES.BASE, backgroundColor: '#FFFFFF' }}
                                avatar={this.state?.state.flag}
                                title={this.state?.state.name}
                                caption="Dados atualizados nas últimas 24hs."
                            />
                            <Text>População <Text size={10} style={{color: 'rgba(0,0,0,.5)', paddingLeft: 10}}>(Estimado pelo TCU 2019)</Text></Text>
                            <Input type="decimal-pad" color={theme.COLORS.GREY} editable={false} value={numberFormat(this.state.covidData?.populacaoTCU2019)} />
                            
                            <Text>Registros casos</Text>
                            <Input type="decimal-pad" color={theme.COLORS.GREY} editable={false} value={numberFormat(this.state.covidData?.incidencia)} />
                            <Text>Total de casos</Text>
                            <Input type="decimal-pad" color={theme.COLORS.GREY} editable={false} value={numberFormat(this.state.covidData?.casosAcumulado)} />
                            <Text>Registros de óbitos</Text>
                            <Input type="decimal-pad" color={theme.COLORS.GREY} editable={false} value={numberFormat(this.state.covidData?.incidenciaObito)} />
                            <Text>Total de óbitos</Text>
                            <Input type="decimal-pad" color={theme.COLORS.GREY} editable={false} value={numberFormat(this.state.covidData?.obitosAcumulado)} />
                        </Block>
                    </ScrollView>
                </Block>
                    {this.renderLoading()}
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
