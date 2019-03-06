const faker = require('faker');


class TestDataHelper
{
    static prefix(){
        return 'QA-' + Date.now();
    }

    static generateName(){
        return this.prefix() + ' ' + faker.random.word();
    }

    static generateDescription(){
        return faker.company.bs();
    }

}

module.exports = TestDataHelper;