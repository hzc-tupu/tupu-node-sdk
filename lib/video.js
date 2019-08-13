
const fs = require('fs')

exports.videoSyncByFile = function (file, options, cb) {
    if (!cb && typeof options === 'function') {
        cb = options
        options = {}
    }
    return this._formApiV4(this.videoSyncApi, cb, function (form) {
        form.append('video', fs.createReadStream(file))
        appendOptions(options, form)
    })
}

exports.videoSyncByStream = function (stream, options, cb) {
    if (!cb && typeof options === 'function') {
        cb = options
        options = {}
    }
    return this._formApiV4(this.videoSyncApi, cb, function (form) {
        form.append('video', stream)
        appendOptions(options, form)
    })
}

exports.videoSyncByUrl = function (url, options, cb) {
    if (!cb && typeof options === "function") {
        cb = options
        options = {}
    }
    return this._formApiV4(this.videoSyncApi, cb, function (form) {
        form.append('video', url)
        appendOptions(options, form)
    })
}

function appendOptions(options, form) {
    if (options.interval) {
        form.append('interval', options.interval)
    }
    if (options.maxFrames) {
        form.append('maxFrames', options.maxFrames)
    }
    if (options.tag) {
        form.append('tag', options.tag)
    }
}

exports.videoAsyncByUrl = function (url, options, cb) {
    if (!cb && typeof options === "function") {
        cb = options
        options = {}
    }
    return this._jsonApiV4(this.videoAsyncApi, cb, function (params) {
        params.video = url
        params.callbackUrl = options.callbackUrl
        if (options.customInfo) {
            params.customInfo = options.customInfo
        }
        if (options.interval) {
            params.interval = options.interval
        }
        if (options.callbackRules) {
            params.callbackRules = options.callbackRules
        }
        if (typeof options.realTimeCallback === 'boolean') {
            params.realTimeCallback = options.realTimeCallback
        }
    })
}

exports.videoStreamByUrl = function (url, options, cb) {
    if (!cb && typeof options === "function") {
        cb = options
        options = {}
    }
    return this._jsonApiV4(this.videoStreamApi, cb, function (params) {
        params.video = url
        params.callbackUrl = options.callbackUrl
        if (options.customInfo) {
            params.customInfo = options.customInfo
        }
        if (options.interval) {
            params.interval = options.interval
        }
        if (options.callbackRules) {
            params.callbackRules = options.callbackRules
        }
    })
}

exports.videoClose = function (videoId, cb) {
    return this._jsonApiV4(this.videoCloseApi, cb, function (params) {
        params.videoId = videoId
    })
}
