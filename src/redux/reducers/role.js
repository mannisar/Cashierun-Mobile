const initialState = {
  roles: []
}

const role = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_ROLE_PENDING':
      return {
        ...state
      }
    case 'READ_ROLE_REJECTED':
      return {
        ...state
      }
    case 'READ_ROLE_FULFILLED':
      return {
        ...state,
        roles: action.payload.data.result
      }
    default:
      return state
  }
}

export default role
