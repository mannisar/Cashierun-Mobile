import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    onSubmit = async () => {
        const { email, password } = this.state;
        if (email.length < 6) {
            ToastAndroid.show(
                'Please Input a Valid Email',
                ToastAndroid.LONG
            );
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password Must be 6 Characters',
                ToastAndroid.LONG
            );
        } else {
            const data = {
                email: this.state.email,
                password: this.state.password
            }
            ToastAndroid.show(
                'Success',
                ToastAndroid.LONG
            );
            await this.props.dispatch(login(data));
            await this.props.navigation.navigate('Home');
        }
    };

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Image
                            source={require('../assets/img/Icon.png')}
                            style={{ width: '80%', height: '50%' }}
                            resizeMode={'stretch'}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TouchableOpacity onPress={this.onSubmit}>
                        <LinearGradient start={{ x: 1, y: -2 }} colors={['#a6e3e9', '#a6e3e9']} style={styles.login}>
                            <Text style={styles.textLogin}>LOGIN</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const width_logo = width * 1;
const height_logo = width_logo * 1;
const width_textInput = width * 0.8;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        height: '25%'
    },
    footer: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width_logo,
        height: height_logo,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: width_textInput,
        fontSize: 20,
        height: 50,
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        marginBottom: 15
    },
    login: {
        width: width_textInput,
        paddingVertical: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLogin: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        height: 25
    },
});

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Login);