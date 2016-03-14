"use strict";

const uuid = require('uuid');
const crypto = require('crypto');

/* 生成参数kv对(不包括Signature) */
exports.generateQueryKV = function(options) {
    return {
        /* 请求参数 */
        "Action": "QueryMetric",
        "Project": options.Project,
        "Metric": options.Metric,
        "period": options.period, /* 非必填, 默认为注册监控项时申明的上报周期 */
        "StartTime": options.StartTime,
        "Dimensions": options.Dimensions,
        /* 公共参数 */
        "Format": "JSON",
        "Version": "2015-10-20",
        "AccessKeyId": options.AccessKeyId,
        "SignatureMethod": "HMAC-SHA1",
        "Timestamp": new Date().toISOString(),
        "SignatureVersion": "1.0",
        "SignatureNonce": uuid.v1(),
        "RegionId": options.RegionId
    };
}

/* 生成签名 */
exports.generateSignature = function(params, salt) {
    let hmac = crypto.createHmac('sha1', new Buffer(salt).toString('ascii'));
    hmac.update(encodeQueryKV());
    let digest = hmac.digest('base64');
    return digest;

    /* 编码params的k-v */
    function encodeQueryKV() {
        let encodedQueryKVArray = [];

        /* 参数排序之后做编码处理 */
        let keys = Object.keys(params).sort().forEach(function(item) {
            encodedQueryKVArray.push(xEncode(item) + '=' + xEncode(params[item]));
        });

        /* 用于签名的字符串. 注: query信息拼接完成之后, 要再做一遍encode处理 */
        return 'GET&%2F&' + xEncode(encodedQueryKVArray.join('&'));
    }

    /* 生成符合接口要求的编码后字符串. */
    function xEncode(data) {
        return encodeURIComponent(data)
                .replace('(', '%28')
                .replace(')', '%29')
                .replace("'", '%27')
                .replace("!", "%21")
                .replace("*", "%2A");
    };
}