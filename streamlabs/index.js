const SockJS = require('sockjs-client')

module.exports = class StreamlabsClient {
  constructor () {
    this.client = new SockJS('http://127.0.0.1:59650/api')
    this.requestMap = {}

    this.client.onmessage = (message) => {
      let json = JSON.parse(message.data)
      this.requestMap[json.id].resolve(json.result)
      delete this.requestMap[json.id]
    }
  }

  getScenes () {
    return new Promise((resolve, reject) => {
      let randomNumber = Math.round(Math.random() * 10000000)
      this.requestMap[randomNumber] = {
        resolve,
        reject,
        timeout: setTimeout(() => {
          delete this.requestMap[randomNumber]
          reject(new Error('Timed out'))
        }, 15000)
      }
      this.client.send(JSON.stringify({
        jsonrpc: '2.0',
        id: randomNumber,
        method: 'getScenes',
        params: {
          resource: 'ScenesService',
          args: []
        }
      }))
    })
  }

  getSources () {
    return new Promise((resolve, reject) => {
      let randomNumber = Math.round(Math.random() * 10000000)
      this.requestMap[randomNumber] = {
        resolve,
        reject,
        timeout: setTimeout(() => {
          delete this.requestMap[randomNumber]
          reject(new Error('Timed out'))
        }, 15000)
      }
      this.client.send(JSON.stringify({
        jsonrpc: '2.0',
        id: randomNumber,
        method: 'getSourcesForCurrentScene',
        params: {
          resource: 'AudioService',
          args: []
        }
      }))
    })
  }

  setSourceMuted (resource, muted) {
    return new Promise((resolve, reject) => {
      let randomNumber = Math.round(Math.random() * 10000000)
      this.requestMap[randomNumber] = {
        resolve,
        reject,
        timeout: setTimeout(() => {
          delete this.requestMap[randomNumber]
          reject(new Error('Timed out'))
        }, 15000)
      }
      this.client.send(JSON.stringify({
        jsonrpc: '2.0',
        id: randomNumber,
        method: 'setMuted',
        params: {
          resource,
          args: [muted]
        }
      }))
    })
  }

  setSceneActive (resource) {
    return new Promise((resolve, reject) => {
      let randomNumber = Math.round(Math.random() * 10000000)
      this.requestMap[randomNumber] = {
        resolve,
        reject,
        timeout: setTimeout(() => {
          delete this.requestMap[randomNumber]
          reject(new Error('Timed out'))
        }, 15000)
      }
      this.client.send(JSON.stringify({
        jsonrpc: '2.0',
        id: randomNumber,
        method: 'makeSceneActive',
        params: {
          resource: 'ScenesService',
          args: [resource]
        }
      }))
    })
  }
}
