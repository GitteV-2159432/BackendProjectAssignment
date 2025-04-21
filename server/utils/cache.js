import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 86400 }) // TimeToLive in seconds (1 day)

export default cache
