import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readProduct } from '../redux/actions/product'
import { addToCart } from "../redux/actions/cart"
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Dimensions,
    ToastAndroid
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Home extends Component {
    state = {
        product: '',
        limit: 6
    };

    componentDidMount() {
        this.readProduct()
    }

    readProduct() {
        const data = {}
        this.props.dispatch(readProduct(data))
    }

    addToCart = data => {
        this.props.dispatch(addToCart(data))
    }

    onProduct = async product => {
        await this.setState({ product });
        const data = {
            product: this.state.product
        }
        await this.props.dispatch(readProduct(data))
    };

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
                <View style={styles.item_container}>
                    <Text style={[styles.item_text, { fontWeight: 'bold', marginBottom: 6 }]}>{item.name}</Text>
                    <TouchableOpacity style={{ backgroundColor: 'black' }}>
                        <Image source={{ uri: item.image }} style={{ width: 120, height: 120, borderWidth: 1, borderColor: '#4f3961' }} resizeMode={'stretch'} />
                        <Text style={{ position: 'absolute', backgroundColor: 'rgba(79, 57, 97, 0.6)', color: 'white', padding: 8, fontWeight: 'bold' }}>{item.available}</Text>
                    </TouchableOpacity>
                    <View style={styles.item_cart}>
                        <Text style={[styles.item_text, { fontWeight: 'bold', marginTop: 4 }]}>Rp. {item.price}</Text>
                        <View>
                            <TouchableOpacity onPress={() => this.addToCart(item)}>
                                <FontAwesome name="cart-plus" size={30} color="#4f3961" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        )
    }

    render() {
        console.disableYellowBox = true
        const { products } = this.props
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', maxHeight: 120 }}>
                    <View style={styles.selection}>
                        <View style={styles.searchBar}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={this.onProduct}
                                placeholder="Search.."
                                autoCapitalize="none"
                                value={this.state.product}
                            />
                        </View>
                        <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Cart')}>
                            <FontAwesome name="bell" color="white" size={28} />
                            <Text style={{ position: 'absolute', backgroundColor: 'rgba(79, 57, 97, 0.6)', padding: 4, fontSize: 8, color: 'white', fontWeight: 'bold' }}>{this.props.carts.length}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView onMomentumScrollEnd={this.onLimit}>
                <View style={styles.flatlist}>
                    <FlatList
                        data={products}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                    />
                </View>
                </ScrollView>
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const width_searchBar = width * 0.8

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatlist: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },
    item_container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 213.2,
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#4f3961'
    },
    item_cart: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_text: {
        padding: 0,
        fontSize: 16
    },
    selection: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 14,
        paddingLeft: 14,
        backgroundColor: '#a6e3e9'
    },
    searchBar: {
        width: width_searchBar,
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 50,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    icon: {
        marginTop: 15,
        marginLeft: 15,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10
    }
});

const mapStateToProps = state => {
    return {
        products: state.products.products,
        carts: state.carts.carts,
    }
}

export default connect(mapStateToProps)(Home);