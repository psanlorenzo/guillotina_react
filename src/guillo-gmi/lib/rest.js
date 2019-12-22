

export class RestClient {

  constructor(url, auth) {
    this.auth = auth
    this.url = url
  }

  async request(path, data, headers) {
    data = data || {}
    data.headers = headers || this.auth.getHeaders()
    // console.log("rest url:", `${this.url}${path}`)
    return await fetch(`${this.url}${path}`, data)
  }

  getHeaders() {
    const authToken  = this.auth.getToken()
    if (!authToken) return false;
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken
    }
  }

  async post(path, data) {
    return await this.request(path, {
      method: 'post',
      body: JSON.stringify(data)
    })
  }

  async get(path) {
    return await this.request(path, {})
  }

  async put(path, data) {
    return await this.request(path, {
      method: 'put',
      body: JSON.stringify(data)
    })
  }

  async patch(path, data) {
    return await this.request(path, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async upload(path, data, contentType, filename) {

    const headers = this.auth.getHeaders()
    delete headers["Content-Type"]
    headers["Content-Type"] = contentType
    headers["X-UPLOAD-FILENAME"] = filename
      return await this.request(path, {
      method: 'PATCH',
      body: data
    }, headers)
  }

  async delete(path, data=undefined) {
    return await this.request(path, {
      method: 'delete',
      body: JSON.stringify(data)
    })
  }
}
