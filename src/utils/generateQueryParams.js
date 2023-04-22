export default function generateQueryParams(params) {
	if (!params) return ''
	let queryParamsStr = '?'
	Object.keys(params).map(
		(key) =>
			(queryParamsStr =
				queryParamsStr +
				key.toString() +
				'=' +
				params[key].toString() +
				'&')
	)
	return queryParamsStr
}
