const xlsx = require('xlsx');
var path = require('path');

async function readExcel() {
    const fiel = path.join(__dirname, '../files/Cleansing_Solr_2022.xlsx')
    const workbook = xlsx.readFile(fiel);
    const workSheet = workbook.SheetNames;
    const object = {};
    await workSheet.forEach(async (sheetName) => {
        const excelData = await xlsx.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
        );
        const obj = {
            [sheetName]: excelData,
        };
        Object.assign(object, obj);
    });
    return object;
}

module.exports = { readExcel }