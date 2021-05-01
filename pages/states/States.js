import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Block, Card } from 'galio-framework';
import theme from '../../assets/theme';
import states from '../../assets/states.json';

const { width } = Dimensions.get('screen');

export default class States extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    openCovidData(state, sg) {
        state.SG = sg;
        this.props.navigation.navigate('CovidData', state);
    }

    render() {
        return (            
            <Block flex style={styles.group}>
                <Block flex>
                    <ScrollView>
                        <Block style={{ flex: 1, flexDirection: 'column', paddingHorizontal: theme.SIZES.BASE }}>
                            {Object.keys(states).map((state, index) => {
                                return (
                                    <TouchableOpacity style={{marginTop: 20}} key={index} onPress={() => this.openCovidData(states[state], state)}>
                                        <Card 
                                            flex                                             
                                            key={index}
                                            style={styles.card}  
                                            avatar={states[state].flag}
                                            title={states[state].name}
                                            caption="Clique para visualizar"
                                        />
                                    </TouchableOpacity>
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
    card: {
        backgroundColor: '#fff'
    }
});
