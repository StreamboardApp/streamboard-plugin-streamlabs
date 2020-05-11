const StreamlabsClient = require('./streamlabs')
const client = new StreamlabsClient()

module.exports = {
  namespace: 'streamlabs',
  apiVersion: 1,
  actions: [
    {
      id: 'scene',
      label: 'Scene',
      async getConfigSchema () {
        const scenes = await client.getScenes()
        return [
          {
            id: 'scene',
            type: 'dropdown',
            label: 'Scene',
            values: Object.values(scenes).map((value) => {
              return {
                name: value.name,
                value: value.id
              }
            })
          }
        ]
      },
      async execute (config) {
        await client.setSceneActive(config.scene)
      }
    },
    {
      id: 'mutesource',
      label: 'Mute Source',
      async getConfigSchema () {
        const sources = await client.getSources()
        return [
          {
            id: 'source',
            type: 'dropdown',
            label: 'Source',
            values: sources.map((value) => {
              return {
                name: value.name,
                value: value.resourceId
              }
            })
          }
        ]
      },
      async execute (config) {
        const sources = await client.getSources()
        var source
        sources.forEach(async resource => {
          if (resource.resourceId === config.source) {
            source = resource
            await client.setSourceMuted(config.source, !resource.muted)
          }
        });
        return source.muted
      }
    }
  ]
}