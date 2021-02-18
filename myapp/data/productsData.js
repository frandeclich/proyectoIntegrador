const fs = require('fs');
const path = require('path');
const mock_db = path.join('data','MOCK_DATA.json');

module.exports = {
    getMock : ()=>{
        return JSON.parse(fs.readFileSync(mock_db,'utf-8'))
    }
}

