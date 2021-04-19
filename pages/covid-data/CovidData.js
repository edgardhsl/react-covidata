import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Block, Input, Card } from 'galio-framework';
import theme from '../../assets/theme';
import CovidDataset from '../../assets/covid-data.json';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

const numberFormat = (value) => {
    if(!value)
        return ''; 

    value = typeof value !== 'string' ? String(value) : value;
    return new Intl.NumberFormat('pt-BR').format(value.replace(/\D/g, ''));
};

export default class CovidData extends React.Component {

    stateData = CovidDataset.find(item => item._id === this.props.route.params.SG);

    constructor(props) {
        super(props);
    }

    render() {
        return (            
            <Block flex>
                <Block flex>
                    <ScrollView>
                        <Block style={{ flex: 1, flexDirection: 'column', paddingHorizontal: theme.SIZES.BASE }}>
                            <Card 
                                flex              
                                style={{ flex: 1, flexDirection: 'column', marginVertical: theme.SIZES.BASE }}
                                avatar={this.props.route.params.flag}
                                title={this.props.route.params.name}
                                caption="Dados atualizados nas últimas 24hs."
                            />
                            <Text>População <Text size={10} style={{color: 'rgba(0,0,0,.5)', paddingLeft: 10}}>(Estimado pelo TCU 2019)</Text></Text>
                            <Input type="decimal-pad" editable={false} value={numberFormat(this.stateData.populacaoTCU2019)} />
                            
                            <Text>Registros casos</Text>
                            <Input type="decimal-pad" editable={false} value={numberFormat(this.stateData.incidencia)} />
                            <Text>Total de casos</Text>
                            <Input type="decimal-pad" editable={false} value={numberFormat(this.stateData.casosAcumulado)} />
                            <Text>Registros de óbitos</Text>
                            <Input type="decimal-pad" editable={false} value={numberFormat(this.stateData.incidenciaObito)} />
                            <Text>Total de óbitos</Text>
                            <Input type="decimal-pad" editable={false} value={numberFormat(this.stateData.obitosAcumulado)} />
                        </Block>
                    </ScrollView>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    
});
