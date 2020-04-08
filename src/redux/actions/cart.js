export const addToCart = (data) => {
  return {
    type: 'ADD_CART_DATA',
    payload: data
  }
}

export const deleteCart = (data) => {
  return {
    type: 'DELETE_CART_DATA',
    payload: data
  }
}

export const addQty = (id) => {
  return {
    type: 'ADD_QTY',
    payload: id
  }
}

export const reduceQty = (id) => {
  return {
    type: 'REDUCE_QTY',
    payload: id
  }
}

export const cancleCart = (data) => {
  return {
    type: 'CANCEL_CART_DATA',
    method: 'DELETE',
    payload: data
  }
}
