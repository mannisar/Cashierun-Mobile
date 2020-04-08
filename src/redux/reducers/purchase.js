const initialState = {
  purchases: []
}

const purchase = (state = initialState, action) => {
  switch (action.type) {
    case 'PURCHASE_PENDING':
      return {
        ...state
      }
    case 'PURCHASE_REJECTED':
      return {
        ...state
      }
    case 'PURCHASE_FULFILLED':
      return {
        ...state,
        purchases: action.payload.data.result
      }
    default:
      return state
  }
}

export default purchase
