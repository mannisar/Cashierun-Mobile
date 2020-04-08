import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readProduct, deleteProduct } from '../redux/actions/product';
import { readCategory } from '../redux/actions/category';
import { View, Image, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Product extends Component {
    state = {
        limit: 6
    }

    async componentDidMount() {
        await this.readProduct()
        await this.readCategory()
    }

    readProduct() {
        const data = {}
        this.props.dispatch(readProduct(data))
    }

    readCategory() {
        this.props.dispatch(readCategory())
    }

    onDelete = (id) => {
        this.props.dispatch(deleteProduct(id))
        ToastAndroid.show(
            'Success',
            ToastAndroid.SHORT
        );
    }

    onLimit = () => {
        const data = {
            limit: this.state.limit
        }
        this.state.limit++
        this.props.dispatch(readProduct(data))
        ToastAndroid.show(
            'Memuat Product..',
            ToastAndroid.SHORT
        );
    }

    renderRow = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: "#f2f2f2", padding: 8 }}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginLeft: 10 }}>{item.name}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>Rp. {item.price}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>Available {item.available}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.navigation.navigate('ProductEdit', { product: item })}>
                            <AntDesign name="edit" color="#4f3961" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => this.onDelete(item.id)}>
                            <FontAwesome name="trash-o" color="#4f3961" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.disableYellowBox = true
        const { products } = this.props
        const ValidMenu = () => {
            if ((this.props.auth.profile.role === "Super Admin") === true || (this.props.auth.profile.role === "Admin") === true) {
                return (
                    <>
                        <LinearGradient start={{ x: 1, y: -2 }} colors={['#a6e3e9', '#a6e3e9']} style={styles.header}>
                            <Text style={styles.textHeader}>PRODUCT</Text>
                            <TouchableOpacity style={styles.add} onPress={() => this.props.navigation.navigate('ProductAdd')}>
                                <AntDesign name="plus" color="white" size={25} />
                            </TouchableOpacity>
                        </LinearGradient>
                        <ScrollView onMomentumScrollEnd={this.onLimit}>
                            <View style={styles.main}>
                                <FlatList
                                    data={products}
                                    renderItem={this.renderRow}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        </ScrollView>
                    </>
                )
            } else {
                return (
                    <>
                        <LinearGradient start={{ x: 1, y: -2 }} colors={['#a6e3e9', '#a6e3e9']} style={styles.header}>
                            <Text style={styles.textHeader}>YOUR NOT ADMIN!</Text>
                        </LinearGradient>
                    </>
                )
            }
        }
        return (
            <View style={styles.container}>
                <ValidMenu />
            </View>
        )
    }
}

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
    add: {
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 4,
        left: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    main: {
        height: '100%',
    }
});

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        products: state.products.products
    }
}

export default connect(mapStateToProps)(Product);