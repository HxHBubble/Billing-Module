import httpClient from '../api/Connection';

const getAll = () => {
	return httpClient.get('/category/all')
}

const create = (data) => {
	return httpClient.post('/category/save', data)
}

const get = (id) => {
	return httpClient.get(`/category/${id}`)
}

const update = (data) => {
	return httpClient.put('/category/update', data)
}

const remove = (id) => {
	return httpClient.delete(`/category/delete/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, get, update, remove };