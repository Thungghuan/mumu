import axios, { AxiosInstance } from 'axios'

function createApiAdapter(baseURL: string) {
  const adapter = axios.create({ baseURL })

  adapter.interceptors.response.use(
    (value) => value,
    (error) => {
      return Promise.resolve({
        data: {
          code: error.response.status,
          msg: error.message
        }
      })
    }
  )

  return adapter
}

export class Api {
  adapter: AxiosInstance

  qq: number
  verifyKey: string
  sessionKey: string

  constructor(qq: number, baseURL: string, verifyKey: string) {
    this.qq = qq
    this.verifyKey = verifyKey
    this.adapter = createApiAdapter(baseURL)
  }

  async verify() {
    const { data } = await this.adapter.post<{
      code: number
      session: string
    }>('/verify', {
      verifyKey: this.verifyKey
    })

    if (data.code === 0) {
      this.sessionKey = data.session
    }

    return data
  }

  async bind() {
    const { data } = await this.adapter.post<{
      code: number
      msg: string
    }>('/bind', {
      sessionKey: this.sessionKey,
      qq: this.qq
    })
    return data
  }

  async release() {
    const { data } = await this.adapter.post<{
      code: Number
      msg: string
    }>('/release', {
      sessionKey: this.sessionKey,
      qq: this.qq
    })
    return data
  }
}

export function createApi(qq: number, baseURL: string, verifyKey: string) {
  return new Api(qq, baseURL, verifyKey)
}