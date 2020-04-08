import React, { Component } from 'react';
import { updateAccount } from '../../redux/actions/account';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ToastAndroid,
    Image,
    Picker
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class AccountEdit extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        id_role: "",
        image: ""
    }

    componentDidMount() {
        this.setStateParam()
    }

    setStateParam() {
        const account = this.props.navigation.getParam("account");

        this.setState({
            id: account.id,
            name: account.name,
            email: account.email,
            id_role: account.id_role,
            // image: account.image
        });
    }

    onSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("email", this.state.email);
        data.append("id_role", this.state.id_role);

        if (this.state.image === "") {
            const id = this.state.id
            await this.props.dispatch(updateAccount(id, data))
            await this.props.navigation.navigate('Account')
            ToastAndroid.show(
                'Success',
                ToastAndroid.LONG
            );
        } else {
            const id = this.state.id
            data.append("image", this.state.image);
            await this.props.dispatch(updateAccount(id, data))
            await this.props.navigation.navigate('Account')
            ToastAndroid.show(
                'Success',
                ToastAndroid.LONG
            );
        }
    }

    handleChoosePhoto = () => {
        const options = {
            quality: 0.7,
            mediaType: 'photo',
            noData: true,
            storageOptions: {
                path: 'images',
                cameraRoll: true,
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.error) {
                console.log(error);
            } else if (!response.didCancel) {
                this.setState(
                    {
                        upload: true,
                        image: {
                            name: response.fileName, type: response.type, size: response.fileSize, uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", "")
                        }
                    }
                );
            }
        });
    };

    render() {
        console.disableYellowBox = true
        const { roles } = this.props
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#a6e3e9', '#a6e3e9']} style={styles.header}>
                    <TouchableOpacity style={styles.menuBack} onPress={() => this.props.navigation.navigate('Account')}>
                        <FontAwesome name="arrow-left" color="white" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>EDIT ACCOUNT</Text>
                </LinearGradient>
                <View style={styles.main}>
                    <TouchableOpacity onPress={this.handleChoosePhoto}>
                        {this.state.image ? (
                            <Image
                                style={{ width: 80, height: 80 }}
                                resizeMode={'stretch'}
                                source={{ uri: this.state.image.uri }}
                            />
                        ) : (
                                <Image
                                    style={{ width: 80, height: 80 }}
                                    resizeMode={'stretch'}
                                    source={{ uri: 'http://clipart-library.com/images_k/camera-png-transparent/camera-png-transparent-7.png' }}
                                />
                            )}
                    </TouchableOpacity>
                    <Text>Change Images..</Text>
                </View>
                <ScrollView>
                    <View style={styles.footer}>
                        <View style={styles.box}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Name"
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name}
                            />
                        </View>
                        <View style={styles.box}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Picker
                                mode="dropdown"
                                placeholder="Choose"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ width: undefined }}
                                selectedValue={(this.state && this.state.id_role)}
                                onValueChange={(value) => {
                                    this.setState({ id_role: value });
                                }}
                            >
                                {roles.map((role, index) => {
                                    return (
                                        <Picker.Item key={index} value={role.id} label={role.name} />
                                    )
                                })}
                            </Picker>
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

const mapStateToProps = (state) => {
    return {
        roles: state.roles.roles
    }
}

export default connect(mapStateToProps)(AccountEdit);