import axios from 'axios'

export const createProduct = (data) => {
  return {
    type: 'CREATE_PRODUCT',
    payload: axios({
      method: 'POST',
      url: 'http://54.159.148.159/product',
      data: data
    })
  }
}

export const readProduct = (data) => {
  const paginateId = data.paginateId || 1
  const limit = data.limit || 6

  const product = data.product || ''
  const category = data.category || ''

  const sortBy = data.sortBy || 'id'
  if (product != null || category != null || sortBy != null || paginateId != null || limit != null) {
    return {
      type: 'READ_PRODUCT',
      payload: axios({
        method: 'GET',
        url: `http://54.159.148.159/product?product=${product}&category=${category}&sortBy=${sortBy}&paginateId=${paginateId}&limit=${limit}`
      })
    }
  }
}

export const updateProduct = (id, data) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios({
      method: 'PATCH',
      url: `http://54.159.148.159/product/${id}`,
      data: data
    })
  }
}

export const deleteProduct = (id) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      method: 'DELETE',
      url: `http://54.159.148.159/product/${id}`
    })
  }
}

export const detailProduct = (id) => {
  return {
    type: 'DETAIL_PRODUCT',
    payload: axios({
      method: 'GET',
      url: `http://54.159.148.159/product/${id}`
    })
  }
}
