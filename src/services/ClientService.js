import httpClient from '../api/Connection';

const getAll = () => {
	return httpClient.get('/client/all')
}

const create = (data) => {
	return httpClient.post('/client/save', data)
}

const get = (id) => {
	return httpClient.get(`/client/${id}`)
}

const update = (data) => {
	return httpClient.put('/client/update', data)
}

const remove = (id) => {
	return httpClient.delete(`/client/delete/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, get, update, remove };