const fs = require('fs');

class JsonHelper{

    static loadJson(filePath){
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
}

module.exports = JsonHelper;