import * as requestPromise from 'request-promise';
import 'dotenv';
import 'chai';
import * as fs from 'fs';


class ApiHelper
{
    constructor(){
        should.exist(process.env.DOMAIN_URL, 'Environment variable DOMAIN_URL not set.');
        this.headers = {'Content-type': 'application/json'};
        this.domainUrl = process.env.DOMAIN_URL;
    }


    checkAuth(authToken)
    {
        if (authToken !== null) {
            this.addAuthorizationHeader(authToken);
        }
    }

    addAuthorizationHeader(authToken)
    {
         this.headers.authorization = authToken;
    }

    checkUrl(baseUrl)
    {
        if (baseUrl == null) {
            return this.domainUrl;
        }
    }

    apiPost(endpoint, payload, authToken = null, baseUrl = null) {
        this.checkAuth(authToken);
        baseUrl = this.checkUrl(baseUrl);
        console.log(payload);
        return requestPromise({
            method: 'POST',
            uri: baseUrl + endpoint,
            body: payload,
            headers: this.headers,
            resolveWithFullResponse: true,
            simple: false,
            timeout: 15000
        });
    }

    async apiGet(endpoint, authToken = null, baseUrl = null)
    {
        this.checkAuth(authToken);
        baseUrl = this.checkUrl(baseUrl);
        return await requestPromise({
            method: 'GET',
            uri: baseUrl + endpoint,
            headers: this.headers,
            resolveWithFullResponse: true,
            simple: false,
            timeout: 15000
        });
    }

    async apiPut(endpoint, payload, authToken = null, baseUrl = null) {
        this.checkAuth(authToken);
        baseUrl = this.checkUrl(baseUrl);
        console.log(payload);
        return await requestPromise({
            method: 'PUT',
            uri: baseUrl + endpoint,
            body: payload,
            headers: this.headers,
            resolveWithFullResponse: true,
            simple: false,
            timeout: 15000
        });
    }

    async apiDelete(endpoint, authToken = null, baseUrl = null)
    {
        this.checkAuth(authToken);
        baseUrl = this.checkUrl(baseUrl);
        return await requestPromise({
            method: 'DELETE',
            uri: baseUrl + endpoint,
            headers: this.headers,
            resolveWithFullResponse: true,
            simple: false,
            timeout: 15000
        });
    }

    async apiPostFormData(endpoint, formData, filePath = null, authToken = null, baseUrl = null) {
        this.checkAuth(authToken);
        baseUrl = this.checkUrl(baseUrl);
        console.log(formData);
        if(filePath != null){
            formData.file = fs.createReadStream(filePath);
        }
        return await requestPromise({
            method: 'POST',
            uri: baseUrl + endpoint,
            headers: this.headers,
            formData: formData,
            resolveWithFullResponse: true,
            simple: false,
            timeout: 15000
        });
    }

}

module.exports = ApiHelper;