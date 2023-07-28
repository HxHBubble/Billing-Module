import httpClient from '../api/Connection';

const getAll = () => {
	return httpClient.get('/invoice/all')
}

const create = (data) => {
	return httpClient.post('/invoice/save', data)
}

const get = (id) => {
	return httpClient.get(`/invoice/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, get };