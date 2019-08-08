
const fs = require('fs')

/**
 * call TUPU API by urls
 * @param urls [ 'http://sample.com/path/image.png', 'http://sample.com/path/images.zip' ]
 * @param options {tag: Array | String, uid: String}
 * @param cb function(data){}
 *           'data' is a json, detail specification can be found in:
 *           <a target="_blank" href="https://www.tuputech.com/api/info">https://www.tuputech.com/api/info </a>
 * @returns {*}
 */
exports.byURLs = function (urls, options, cb) {
    if (!cb && typeof options === "function") {
        cb = options
        options = {}
    }
    return this._formApi(this.imageApi, cb, function (form) {
        appendOptions(options, form)
        urls.forEach(function (url) {
            form.append('image', url)
        })
    })
}

function appendOptions(options, form) {
    if (options.tag) {
        if (!Array.isArray(options.tag)) {
            options.tag = [options.tag]
        }
        options.tag.forEach(function (tag) {
            form.append('tag', tag)
        })
    }

    if (options.uid) {
        form.append('uid', options.uid)
    }
}

/**
 * call TUPU API by POST Files
 * @param files [ '/path/to/file1.jpg', '/path/to/file2.zip' ]
 * @param options {tag: Array | String, uid: String}
 * @param cb function(data){}
 *           'data' is a json, detail specification can be found in:
 *           <a target="_blank" href="https://www.tuputech.com/api/info">https://www.tuputech.com/api/info </a>
 * @returns {*}
 */
exports.byFiles = function (files, options, cb) {
    if (!cb && typeof options === "function") {
        cb = options
        options = {}
    }
    return this._formApi(this.imageApi, cb, function (form) {
        appendOptions(options, form)
        files.forEach(function (file) {
            form.append('image', fs.createReadStream(file))
        })
    })
}

/**
 * call TUPU API by file streams
 * @param streams [ read stream1 , read stream2 ]
 * @param options {tag: Array | String, uid: String}
 * @param cb function(data){}
 *           'data' is a json, detail specification can be found in:
 *           <a target="_blank" href="https://www.tuputech.com/api/info">https://www.tuputech.com/api/info </a>
 * @returns {*}
 */
exports.byStreams = function (streams, options, cb) {
    if (!cb && typeof options === "function") {
        cb = options
        options = {}
    }
    return this._formApi(this.imageApi, cb, function (form) {
        appendOptions(options, form)
        streams.forEach(function (stream) {
            form.append('image', stream)
        })
    })
}

/**
 * call TUPU API for text recognition by texts
 * @param texts [ 'some text *** ', 'some other text *** ' ]
 * @param options {tag: Array | String, uid: String}
 * @param cb function(data){}
 *           'data' is a json, detail specification can be found in:
 *           <a target="_blank" href="https://www.tuputech.com/api/info">https://www.tuputech.com/api/info </a>
 * @returns {*}
 */
exports.byTexts = function (texts, options, cb) {
    if (!cb && typeof options === "function") {
        cb = options
        options = {}
    }
    return this._formApi(this.imageApi, cb, function (form) {
        appendOptions(options, form)
        texts.forEach(function (text) {
            form.append('text', text)
        })
    })
}
