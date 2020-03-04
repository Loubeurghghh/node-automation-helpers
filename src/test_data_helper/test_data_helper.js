const faker = require('faker');
const randomWords = require('random-words');


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
        return randomWords();
    }

    static generateWords(numberOfWords){
        return randomWords(numberOfWords);
    }

    static generateSentence(){
        return faker.lorem.sentence();
    }

    static generatePassword(){
        return faker.internet.password(10, false);
    }

    static generateHexColourCode(){
        return `#${(Math.random()*0xFFFFFF<<0).toString(16)}`;
    }
}

module.exports = TestDataHelper;