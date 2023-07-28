import httpClient from '../api/Connection';

const getAll = () => {
	return httpClient.get('/product/all')
}

const create = (data) => {
	return httpClient.post('/product/save', data)
}

const get = (id) => {
	return httpClient.get(`/product/${id}`)
}

const update = (data) => {
	return httpClient.put('/product/update', data)
}

const remove = (id) => {
	return httpClient.delete(`/product/delete/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, get, update, remove };