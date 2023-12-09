import TradeBot from './tradingbot'
import { botconfig } from '../configsbot'
const { Spot } = require('@binance/connector')

class BianceTradeBot extends TradeBot {
    constructor() {
    }

    async init() {
        const { apiKey, apiSecret } = botconfig
        const client = new Spot(apiKey, apiSecret)
        this.client = client
    }

    getClient() {
        return this.client
    }

    async order() {
        // 
        const response = await client.account({ recvWindow: 2000 })
        this.client.logger.log(response.data)
    }
}

export default BianceTradeBot