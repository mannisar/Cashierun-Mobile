import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Loading from './Loading'
import Login from '../auth/Login'
import Logout from '../auth/Logout'
import Home from '../screens/Home'
import Product from '../screens/Product'
import ProductAdd from '../screens/product/ProductAdd'
import ProductEdit from '../screens/product/ProductEdit'
import Category from '../screens/Category'
import CategoryAdd from '../screens/category/CategoryAdd'
import CategoryEdit from '../screens/category/CategoryEdit'
import Account from '../screens/Account'
import AccountAdd from '../screens/account/AccountAdd'
import AccountEdit from '../screens/account/AccountEdit'
import Cart from '../screens/Cart'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const TabNavigatior = createMaterialBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarOptions: {
        tabStyle: {
          paddingVertical: 10
        },
        style: {
          height: 50,
          backgroundColor: '#a6e3e9',
          elevation: 10,
          borderTopWidth: 0
        },
        labelStyle: {
          margin: 0,
          padding: 0
        },
        showIcon: true,
        showLabel: true,
        activeTintColor: '#4f3961',
        inactiveTintColor: 'gray'
      },
      tabBarIcon: ({ tintColor, focused }) => {
        if (focused) {
          return (
            <Entypo name='home' size={22} color={tintColor} />
          )
        } else {
          return (
            <Entypo name='home' size={20} color='gray' />
          )
        }
      }
    }
  },
  Product: {
    screen: Product,
    navigationOptions: {
      tabBarLabel: 'Product',
      tabBarOptions: {
        tabStyle: {
          paddingVertical: 10
        },
        style: {
          height: 50,
          backgroundColor: '#a6e3e9',
          elevation: 10,
          borderTopWidth: 0
        },
        labelStyle: {
          margin: 0,
          padding: 0
        },
        showIcon: true,
        showLabel: true,
        activeTintColor: '#4f3961',
        inactiveTintColor: 'gray'
      },
      tabBarIcon: ({ tintColor, focused }) => {
        if (focused) {
          return (
            <FontAwesome name='cutlery' size={22} color={tintColor} />
          )
        } else {
          return (
            <FontAwesome name='cutlery' size={20} color='gray' />
          )
        }
      }
    }
  },
  Category: {
    screen: Category,
    navigationOptions: {
      tabBarLabel: 'Category',
      tabBarOptions: {
        tabStyle: {
          paddingVertical: 10
        },
        style: {
          height: 50,
          backgroundColor: '#a6e3e9',
          elevation: 10,
          borderTopWidth: 0
        },
        labelStyle: {
          margin: 0,
          padding: 0
        },
        showIcon: true,
        showLabel: true,
        activeTintColor: '#4f3961',
        inactiveTintColor: 'gray'
      },
      tabBarIcon: ({ tintColor, focused }) => {
        if (focused) {
          return (
            <FontAwesome name='tags' size={22} color={tintColor} />
          )
        } else {
          return (
            <FontAwesome name='tags' size={20} color='gray' />
          )
        }
      }
    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarOptions: {
        tabStyle: {
          paddingVertical: 10
        },
        style: {
          height: 50,
          backgroundColor: '#a6e3e9',
          elevation: 10,
          borderTopWidth: 0
        },
        labelStyle: {
          margin: 0,
          padding: 0
        },
        showIcon: true,
        showLabel: true,
        activeTintColor: '#4f3961',
        inactiveTintColor: 'gray'
      },
      tabBarIcon: ({ tintColor, focused }) => {
        if (focused) {
          return (
            <FontAwesome name='users' size={22} color={tintColor} />
          )
        } else {
          return (
            <FontAwesome name='users' size={20} color='gray' />
          )
        }
      }
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      tabBarLabel: 'Logout',
      tabBarOptions: {
        tabStyle: {
          paddingVertical: 10
        },
        style: {
          height: 50,
          backgroundColor: '#a6e3e9',
          elevation: 10,
          borderTopWidth: 0
        },
        labelStyle: {
          margin: 0,
          padding: 0
        },
        showIcon: true,
        showLabel: true,
        activeTintColor: '#4f3961',
        inactiveTintColor: 'gray'
      },
      tabBarIcon: ({ tintColor, focused }) => {
        if (focused) {
          return (
            <AntDesign name='logout' size={22} color={tintColor} />
          )
        } else {
          return (
            <AntDesign name='logout' size={20} color='gray' />
          )
        }
      }
    }
  }
}, {
  initialRouteName: 'Home',
  activeColor: '#4f3961',
  inactiveColor: 'grey',
  barStyle: {
    backgroundColor: '#a6e3e9'
  }
})

const AppStack = createStackNavigator({
  Apps: {
    screen: TabNavigatior,
    navigationOptions: {
      headerShown: false
    }
  },
  ProductAdd: {
    screen: ProductAdd,
    navigationOptions: {
      headerShown: false
    }
  },
  ProductEdit: {
    screen: ProductEdit,
    navigationOptions: {
      headerShown: false
    }
  },
  CategoryAdd: {
    screen: CategoryAdd,
    navigationOptions: {
      headerShown: false
    }
  },
  CategoryEdit: {
    screen: CategoryEdit,
    navigationOptions: {
      headerShown: false
    }
  },
  AccountAdd: {
    screen: AccountAdd,
    navigationOptions: {
      headerShown: false
    }
  },
  AccountEdit: {
    screen: AccountEdit,
    navigationOptions: {
      headerShown: false
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      headerShown: false
    }
  }
})

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  }
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
)
