const initialState = {
  carts: [],
  total: 0
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_DATA':
      const filterCartId = state.carts.map(product => {
        if (product.id === action.payload.id) {
          product.quantity += 1

          return action.payload
        }
        return product
      })

      const existedCartData = state.carts.find(product => product.id === action.payload.id)
      if (existedCartData === undefined) {
        const newTotal = state.total + action.payload.price
        action.payload.quantity = 1
        return {
          ...state,
          carts: [...state.carts, action.payload],
          total: newTotal
        }
      } else {
        if (existedCartData.quantity > action.payload.available) {
          existedCartData.quantity = action.payload.available
          return {
            ...state
          }
        } else {
          return {
            ...state,
            carts: filterCartId,
            total: state.total + existedCartData.price
          }
        }
      }

    case 'DELETE_CART_DATA':
      const filterCartIdForDelete = state.carts.filter(product => product.id !== action.payload)
      const existedCartDelete = state.carts.find(product => product.id === action.payload)
      if (existedCartDelete) {
        return {
          ...state,
          carts: filterCartIdForDelete,
          total: state.total - existedCartDelete.price * existedCartDelete.quantity
        }
      } else {
        return
      }

    case 'ADD_QTY':
      const addQty = state.carts.map(product => {
        if (product.id === action.payload) {
          product.quantity += 1
        }
        return product
      })

      const existedCartAdd = state.carts.find(product => product.id === action.payload)
      if (existedCartAdd.quantity > existedCartAdd.available) {
        existedCartAdd.quantity = existedCartAdd.available
        return {
          ...state
        }
      } else {
        return {
          ...state,
          carts: addQty,
          total: state.total + existedCartAdd.price
        }
      }

    case 'REDUCE_QTY':
      const reduceQty = state.carts.map(product => {
        if (product.id === action.payload) {
          product.quantity = product.quantity - 1
        }
        return product
      })

      const existedCartReduce = state.carts.find(product => product.id === action.payload)
      if (existedCartReduce.quantity <= 0) {
        existedCartReduce.quantity = 1
        return {
          ...state
        }
      } else {
        return {
          ...state,
          carts: reduceQty,
          total: state.total - existedCartReduce.price
        }
      }

    case 'CANCEL_CART_DATA':
      return {
        ...state,
        carts: [],
        total: 0
      }

    default:
      return state
  }
}

export default cart
