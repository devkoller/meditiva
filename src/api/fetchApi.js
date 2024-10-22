import { API_URL } from './config'

class FetchApi {
  constructor () {
    this.baseUrl = API_URL
  }

  async get ({ url, qs, signal, token, headers }) {
    return await fetch(
      this.getUrlWithParams(this.baseUrl + url, qs),
      this.requestGetOptions({ signal, token, headers })
    )
  }

  async post ({ url, body, headers, hasFiles, qs, token }) {
    return await fetch(
      this.getUrlWithParams(this.baseUrl + url, qs),
      this.requestPostOptions({ headers, body, hasFiles, token })
    )
  }

  async patch ({ url, body, headers, hasFiles, qs, token }) {
    return await fetch(
      this.getUrlWithParams(this.baseUrl + url, qs),
      this.requestPatchOptions({ headers, body, hasFiles, token })
    )
  }

  async put ({ url, body, headers, hasFiles, qs, token }) {
    return await fetch(
      this.getUrlWithParams(this.baseUrl + url, qs),
      this.requestPutOptions({ headers, body, hasFiles, token })
    )
  }

  async delete ({ url, body, headers, hasFiles, qs, token }) {
    return await fetch(
      this.getUrlWithParams(this.baseUrl + url, qs),
      this.requestDeleteOptions({ headers, body, hasFiles, token })
    )
  }

  getHeaders ({ headers = {}, hasFiles = false, token }) {
    if (hasFiles) {
      return {
        Accept: 'application/json',
        authorization: `Bearer ${token}`,
        ...headers
      }
    }

    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${token}`,
      ...headers
    }
  }

  requestGetOptions ({ headers = {}, signal, token }) {
    return {
      method: 'GET',
      headers: this.getHeaders({ headers, token }),
      signal
    }
  }

  requestPostOptions ({ headers = {}, body = {}, hasFiles, token }) {
    return {
      method: 'POST',
      headers: this.getHeaders({ headers, hasFiles, token }),
      body: hasFiles ? body : JSON.stringify(body)
    }
  }

  requestPatchOptions ({ headers = {}, body = {}, hasFiles, token }) {
    return {
      method: 'PATCH',
      headers: this.getHeaders({ headers, token, hasFiles }),
      body: hasFiles ? body : JSON.stringify(body)
    }
  }

  requestPutOptions ({ headers = {}, body = {}, hasFiles, token }) {
    return {
      method: 'PUT',
      headers: this.getHeaders({ headers, token, hasFiles }),
      body: hasFiles ? body : JSON.stringify(body)
    }
  }

  requestDeleteOptions ({ headers = {}, body = {}, token }) {
    return {
      method: 'DELETE',
      headers: this.getHeaders({ headers, token }),
      body: JSON.stringify(body)
    }
  }

  getUrlWithParams (urlString, objParams = {}) {
    if (Object.keys(objParams).length === 0) return urlString

    const url = new URL(urlString)
    url.search = new URLSearchParams(objParams).toString()
    return url
  }
}

export default new FetchApi()
