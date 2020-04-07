const should = require('chai').should();
const ApiHelper = require('../api_helper/api_helper');


class EsHelper{
    
    constructor(){
        should.exist(process.env.ES_URL, 'Environment variable ES_URL not set.');
        this.baseUrl = process.env.ES_URL;
        this.apiHelper = new ApiHelper();
    }

    async getDocumentById(index, id){
        const endpoint = `/${index}/_doc/${id}`
        console.log(`Searching for this id ${id} in this index ${index}`);
        return this.apiHelper.apiGet(endpoint, null, this.baseUrl);
    }

    async searchDocumentByField(index, field, value){
        const endpoint = `/${index}/_doc/${id}`
        const payload = JSON.stringify(EsHelper.esSearchFieldMapper(field, value));
        console.log(`Searching for this field ${field} in this index ${index} that has this value ${value}`);
        
        return this.apiHelper.apiGet(endpoint, payload, this.baseUrl);
    }

    async clearCache(){
        const endpoint = `/_cache/clear?request=true`
        console.log(`Clearing cache`);
        
        return this.apiHelper.apiPostWithNoPayload(endpoint, null, this.baseUrl);
    }


    static esSearchFieldMapper(field, value){
        const term = JSON.parse(`${field}.keyword:${value}`);
        return {"query": {term}};
    }
}

module.exports = EsHelper;