"use strict";

const querystring = require('querystring');
const request = require('request');
const sign = require('./sign');

/* 常量 */
const ACCESS_ID = 'Your access id';
const ACCESS_SECRET = 'Your access secret';

/* 生成query kv数据 */
let paramsObject = sign.generateQueryKV({
    "AccessKeyId": ACCESS_ID,
    "RegionId": "cn",
    "Project": "acs_ecs",
    "period": "60", /* 非必填, 默认为注册监控项时申明的上报周期 */
    "Metric": "InternetOut",
    "StartTime": '2016-03-01T00:00:00Z',
    "Dimensions": '{instanceId:"Your instance id"}'
});

/* 生成signature */
paramsObject.Signature = encodeURIComponent(sign.generateSignature(paramsObject, ACCESS_SECRET + '&'));

/* 拼接请求地址 */
let query = [];
for(var key in paramsObject) {
    query.push(key + '=' + paramsObject[key]);
}

/* 测试请求 */
request('http://metrics.aliyuncs.com/?' + query.join('&'), function(err, response, body) {
    console.log(body);
});
