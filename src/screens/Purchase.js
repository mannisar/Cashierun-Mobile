import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { readPurchase } from '../../redux/actions/order'

class Purchase extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "HISTORY",
            headerStyle: {
                backgroundColor: '#a6e3e9'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    componentDidMount() {
        this.readPurchase()
    }

    async readPurchase() {
        await this.props.dispatch(readPurchase())
    }

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    renderRow = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.1)", height: 110 }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 2 }}>Cashier: {item.id_account}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 2 }}>Total: {item.total}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 4 }}>Date: {item.date}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 17, color: "#a6e3e9" }}>DETAIL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.disableYellowBox = true
        const { orders } = this.props
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={orders}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//     head: { height: 40, backgroundColor: "#a6e3e9" },
//     headText: { margin: 6, color: 'white', textAlign: 'center' },
//     text: { margin: 6, textAlign: 'center' },
//     row: {
//         flexDirection: 'row',
//         backgroundColor: 'white',
//         borderRadius: 8,
//         borderWidth: 0.5,
//         borderColor: '#a6e3e9'
//     },
//     btn: { marginLeft: 14, width: 48, height: 20, backgroundColor: "#a6e3e9", borderRadius: 2 },
//     btnText: { textAlign: 'center', color: '#fff' }
// });

const mapStateToProps = state => {
    return {
        orders: state.orders.orders
    }
}

export default connect(mapStateToProps)(Purchase);