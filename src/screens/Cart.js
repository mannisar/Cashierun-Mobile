import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQty, reduceQty, deleteCart, cancleCart } from '../redux/actions/cart';
import { readProduct } from '../redux/actions/product';
import { purchase } from '../redux/actions/purchase';
import { View, Image, Text, FlatList, TouchableOpacity, ToastAndroid, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Cart extends Component {
    onAddQty = (id) => {
        this.props.dispatch(addQty(id))
    }

    onReduceQty = (id) => {
        this.props.dispatch(reduceQty(id))
    }

    onDeleteCart = (id) => {
        this.props.dispatch(deleteCart(id))
    }

    onCancleCart = (data) => {
        this.props.dispatch(cancleCart(data))
    }

    onSubmit = async event => {
        event.preventDefault()
        const data = {
            id_account: parseInt(this.props.auth.profile.id),
            total: this.props.total,
            product: this.props.carts
        }
        await this.props.dispatch(purchase(data))
        await this.props.dispatch(cancleCart(this.props.carts))
        const refresh = {}
        await this.props.dispatch(readProduct(refresh))
        ToastAndroid.show(
            'Purchase Success..',
            ToastAndroid.LONG
        );
    }

    renderRow = ({ item }) => {
        return (
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.1)", height: 120 }}>
                    <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 2 }}>{item.name}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 2 }}>Rp. {item.price}</Text>
                        <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 4 }}>Available {item.available}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => (this.onReduceQty(item.id))}>
                                <Text style={{ fontSize: 25, color: "#352245" }}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10, marginTop: 6 }} >
                                <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => (this.onAddQty(item.id))}>
                                <Text style={{ fontSize: 25, color: "#352245" }}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10, marginTop: 1, backgroundColor: "#a6e3e9", borderRadius: 5 }} onPress={() => (this.onDeleteCart(item.id))}>
                                <Text style={{ fontSize: 12, color: "#352245", padding: 8 }}>REMOVE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </ScrollView>
        )
    }

    render() {
        const { carts, total } = this.props
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#a6e3e9', '#a6e3e9']} style={styles.header}>
                    <Text style={styles.textHeader}>CART</Text>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate('Home')}>
                        <AntDesign name="back" color="white" size={25} />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{ flex: 1, margin: 10 }}>
                    <FlatList
                        data={carts}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <View style={{ margin: 8, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Total Rp. {total}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ alignItems: 'center', padding: 10, marginBottom: 5, backgroundColor: "#a6e3e9" }} onPress={this.onSubmit} >
                            <Text style={{ color: "white" }}>CHECKOUT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', padding: 10, backgroundColor: "#a6e3e9" }} onPress={() => (this.onCancleCart(carts.id))}>
                            <Text style={{ color: "white" }}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    back: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 4,
        left: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        carts: state.carts.carts,
        total: state.carts.total
    }
}

export default connect(mapStateToProps)(Cart);