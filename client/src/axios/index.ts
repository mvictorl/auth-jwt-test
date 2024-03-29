import axios from 'axios'
const API_URL: string = import.meta.env.VITE_API_URL || ''
const SELF_URL: string = import.meta.env.VITE_SELF_URL || ''

export const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use(config => {
	// axios.defaults.headers.common[
	// 	'Authorization'
	// ] = `Bearer ${localStorage.getItem('bearer-token')}`
	config.headers['Authorization'] = `Bearer ${localStorage.getItem(
		'bearer-token'
	)}`
	return config
})

$api.interceptors.response.use(
	res => res,
	async err => {
		const origRequest = err.config
		if (err.response.status === 401 && origRequest && !origRequest._isRetry) {
			origRequest._isRetry = true
			try {
				const res = await axios.get(`${API_URL}/auth/refresh`, {
					withCredentials: true,
				})
				console.log('Res:', res)

				if (res.data.accessToken) {
					localStorage.setItem('bearer-token', res.data.accessToken)
					return $api(origRequest)
				} else {
					localStorage.removeItem('bearer-token')
				}
				return $api(origRequest)
			} catch (e) {
				console.error('USER NOT AUTHORIZE', e)
				localStorage.removeItem('bearer-token')
			}
		}
		localStorage.removeItem('bearer-token')
		if (err.response.status !== 422) window.location.href = SELF_URL
		return Promise.reject(err)
	}
)
