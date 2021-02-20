const fs = require('fs');
const path = require('path');
const mock_db = path.join('data','MOCK_DATA.json');

module.exports = {
    getMock : ()=>{
        return JSON.parse(fs.readFileSync(mock_db,'utf-8'))
    },
    setMock : (data) => {
        fs.writeFileSync(mock_db,JSON.stringify(data,null,2),'utf-8');
    }
}

