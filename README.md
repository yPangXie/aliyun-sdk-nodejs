## 阿里云监控 Open API. Nodejs版签名实现.

官方文档在这. 提供了C++和Java的签名实现代码. [新版监控_OpenAPI使用手册](https://help.aliyun.com/document_detail/cms/API_References/New_Metric_OpenAPI_Reference/API_Guide.html?spm=5176.doccms/API_References/New_Metric_OpenAPI_Reference/Method.3.3.uOPw9j)

文档描述和例子应该是没有问题的.. 我还傻逼呵呵的去提了个工单问是不是写错了.... 蛋疼..

注意一个地方就是: 字符串拼接之后, 要先整体做一次`encode`之后再生成签名.