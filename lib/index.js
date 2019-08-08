/******************************************************************************
 * TUPU Recognition API SDK
 * Copyright(c)2013-2016, TUPU Technology
 * https://www.tuputech.com
 *****************************************************************************/

const fs = require('fs')
const debug = require('debug')('TUPU')
const api = require('./api')
const sign = require('./sign')
const image = require('./image')
const video = require('./video')

/**
 * construct a TUPU API instance
 * @param secretId your secretId, contact us to apply your own secretId
 * @param privateKeyPath /path/to/your/private/key.pem
 * @param options default:  <br/>
 * timeout: 30 * 1000 <br/>
 * domain: 'api.open.tuputech.com' (contact us for the other valid domains)
 * @constructor
 */
function TUPU(secretId, privateKeyPath, options) {
    options = options || {}

    const domain = options.domain || 'api.open.tuputech.com'
    const prefix = 'http://' + domain + '/v3/recognition/'
    this.imageApi = prefix + secretId
    this.videoSyncApi = prefix + 'video/syncscan/' + secretId
    this.videoAsyncApi =  prefix + 'video/asyncscan/' + secretId
    this.videoStreamApi = prefix + 'video/stream/' + secretId
    this.videoCloseApi = prefix + 'video/close/' + secretId
    this.secretId = secretId
    this.privateKey = fs.readFileSync(privateKeyPath).toString()

    this.timeout = options.timeout || 30 * 1000

    debug(this.imageApi, this.secretId, this.privateKey, this.timeout)
}

function mixin (dest, src) {
    for (const key in src) {
        if (dest.prototype.hasOwnProperty(key)) {
            throw new Error('Don\'t allow override existed prototype method. method: '+ key)
        }
        dest.prototype[key] = src[key]
    }
}

mixin(TUPU, api)
mixin(TUPU, sign)
mixin(TUPU, image)
mixin(TUPU, video)

module.exports = TUPU
