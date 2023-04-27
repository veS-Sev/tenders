export async function client(endpoint: RequestInfo, options?: RequestInit) {
  const { body, ...customConfig } = options ?? {}
  const headers = { 'Content-Type': 'application/json' }
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
try {
  const response = await window.fetch(endpoint, config)
  data = await response.json()
  if (response.ok) {
    // Return a result object similar to Axios
    return {
      status: response.status,
      data,
      headers: response.headers,
      url: response.url,
    }
  }
  throw new Error(response.statusText)
} catch (err:any) {
  return Promise.reject(err.message ? err.message : data)
}
}



client.get = function (endpoint: RequestInfo, customConfig?: RequestInit) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint: RequestInfo, body: BodyInit | null, customConfig?: RequestInit) {
  return client(endpoint, { ...customConfig, body })
}

// client.get = function (endpoint, customConfig = {}) {
//   return client(endpoint, { ...customConfig, method: 'GET' })
// }

// client.post = function (endpoint, body, customConfig = {}) {
//   return client(endpoint, { ...customConfig, body })
// }