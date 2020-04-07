const faker = require('faker');
const randexp = require('randexp').randexp;
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
        return randexp(/[a-z][A-Z][0-9][!@#\$%\^&\*]{8,50}/);
    }

    static generateHexColourCode(){
        return `#${(Math.random()*0xFFFFFF<<0).toString(16)}`;
    }
}

module.exports = TestDataHelper;