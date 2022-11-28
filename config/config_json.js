const dt = new Date();
dt.setDate(dt.getDate() - 1);
const filename = "../../files/update_data_" + dt.toISOString().slice(0, 10) + ".json";
// const dataJson = require(filename);
const dataJson = require('../../files/update_data2016_1-4.json');


async function Import_jsondata() {
    //   insert;
    let arr = ""
    const cashData = dataJson.response.docs;
    if (cashData != undefined) {
        arr =  cashData;
    } else {
        console.log("Script is not working");
    }
    return arr
}

module.exports = {
    Import_jsondata
}