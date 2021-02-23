const fs = require('fs');
const path = require('path');
const users_db = path.join('data','USERS_DATA.json');

module.exports = {
    getUsers : ()=>{
        return JSON.parse(fs.readFileSync(users_db,'utf-8'))
    },
    setUser : (data) => {
        fs.writeFileSync(users_db,JSON.stringify(data,null,2),'utf-8');
    }
}