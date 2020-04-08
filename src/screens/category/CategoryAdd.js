import React, { Component } from 'react';
import { createCategory } from '../../redux/actions/category'
import { connect } from 'react-redux';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class CategoryAdd extends Component {
    state = {
        name: "",
    }

    onSubmit = async () => {
        const data = {
            name: this.state.name
        }

        await this.props.dispatch(createCategory(data));
        await this.props.navigation.navigate('Category');
        ToastAndroid.show(
            'Success',
            ToastAndroid.LONG
        );
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#a6e3e9', '#a6e3e9']} style={styles.header}>
                    <TouchableOpacity style={styles.menuBack} onPress={() => this.props.navigation.navigate('Category')}>
                        <FontAwesome name="arrow-left" color="white" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>ADD CATEGORY</Text>
                </LinearGradient>
                <ScrollView>
                    <View style={styles.footer}>
                        <View style={styles.box}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Name"
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={this.onSubmit} style={{ flex: 1 }}>
                                <LinearGradient start={{ x: 1, y: -2 }} colors={['#a6e3e9', '#a6e3e9']} style={styles.submit}>
                                    <Text style={styles.submitTxt}>SUBMIT</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const width_textInput = width * 0.9;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 70,
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        top: 4
    },
    menuBack: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 4,
        left: 15,
        justifyContent: 'center'
    },
    main: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    footer: {
        marginHorizontal: 24,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        height: 25,
    },
    box: {
        borderColor: '#4f3961',
        borderBottomWidth: 2,
        marginVertical: 4
    },
    textInput: {
        fontSize: 20,
        left: -4
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12
    },
    submit: {
        width: width_textInput,
        paddingVertical: 12,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center'
    },
    submitTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        height: 25
    }
});

export default connect()(CategoryAdd);