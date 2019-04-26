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

    static generateWord(){
        const word = faker.random.word();
        if(word.includes(' ')){
            return word.split(' ', 1);
        }
        return word;
    }
}

module.exports = TestDataHelper;