const fs = require('fs')

let database = '/home/alfonso/WebProjects/birthdayServer/birthdates.json'

function addDataToDB(dataToAdd){
    try {
        fs.readFile(database,function(err,data){
            if(err) throw err
            let json = JSON.parse(data)
            json.push(dataToAdd)
            console.log(json)
            fs.writeFile(database, JSON.stringify(json), function(err){
                if(err) throw err
            })
        })
    return true
    //     console.log(__dirname)
    // let db = JSON.parse(fs.readFileSync(database,'utf-8'))
    // db.push(dataToAdd)
    // fs.writeFileSync(database,JSON.stringify(db))
    return true
    } catch (err) {
        console.log(err)
        return false        
    }
}

module.exports = {
    addDataToDB
}