const clc = require('cli-color')

// search value 
function SearchValue_m(serach, item) {
    let result = [];
    for (let i = 0; i < item.length; i++) {
        for (key in item[i]) {
            if (item[i][key].toString().indexOf(serach) != -1) {
                result.push(item[i]);
            }
        }
    }
    return result;
}
function SearchValue_s(serach, item) {
    let result = [];
    for (let i = 0; i < item.length; i++) {
        if (item[i].name != undefined || item[i].name != null) {
            if (item[i].name.toString().indexOf(serach) != -1) {
                result.push(item[i]);
            }
        }
    }
    return result;
}
// select max
function SearchValueMax(item) {
    return item.reduce((before, now) => before = before.qty > now.qty ? before : now, 0);
}

async function compareValue(rawData, compareData) {
    const index = await compareData
        .map((e) => {
            return e.name;
        })
        .indexOf(rawData);
    return index == -1 || !compareData[index].id ? null : compareData[index].id;
}

async function compareProvinceAndDistrictandVillage(province, district, village, compareData) {
    const pro = compareData.province;
    const dis = compareData.district;
    const vill = compareData.village;
    let values = {
        province: "",
        district: "",
        village: "",
        village_Id: ""
    }

    // search province
    if (province == "" && province == undefined) {
        values.province = null;
        values.district = null;
        values.village = null;
        values.village_Id = null;
    } else {
        let proval = SearchValue_s(province, pro);
        let final_province = []
        proval.forEach(ele => {
            if (ele.name == province) {
                final_province.push(ele)
            }
        });

        if (final_province.length == 0) {
            values.province = null;
            values.district = null;
            values.village = null;
            values.village_Id = null;
        } else {
            values.province = final_province[0].province_code;
            
            if (district != "" && district != undefined) {
                pro_dis = [];
                dis.forEach(ele => {
                    if (ele.province_code == values.province) {
                        pro_dis.push(ele);
                    }
                });

                // search district
                let disval = SearchValue_s(district, pro_dis);
                if (disval.length == 0) {
                    values.district = null;
                    values.village = null;
                    values.village_Id = null;
                } else {
                    let final_distric = []
                    let district_Id = 0;
                    disval.forEach(ele => {
                        if (ele.name == district) {
                            final_distric.push(ele)
                        }
                    });
                    if (final_distric.length == 0) {
                        district_Id = disval[0].district_code
                    } else {
                        district_Id = final_distric[0].district_code
                    }
                    values.district = district_Id;

                    if (village != "" && village != undefined) {
                        dis_vill = [];
                        vill.forEach(elem => {
                            if (elem.district_code == values.district) {
                                dis_vill.push(elem);
                            }
                        });

                        // search village
                        if (village != undefined && village != "") {
                            let vill_result = SearchValue_m(village.toString().trim(), dis_vill);

                            if (vill_result.length == 0) {
                                values.village = null;
                            } else {
                                let vill_val = []
                                vill_result.forEach(e => {
                                    if (e.name == village) {
                                        vill_val.push(e);
                                    }
                                });
                                if (vill_val.length == 0) {
                                    values.village = vill_result[0].village_code;
                                    values.village_Id = vill_result[0].village_id;
                                } else {
                                    values.village = vill_val[0].village_code;
                                    values.village_Id = vill_val[0].village_id;
                                }
                            }
                        } else {
                            values.village = null;
                            values.village_Id = null;
                        }
                    } else {
                        values.village = null;
                        values.village_Id = null;
                    }
                }
            } else {
                values.district = null;
                values.village = null;
                values.village_Id = null;
            }

        }
    }
    return values

}

async function compareBrandAndModel(brand, model, compareData) {
    const bra = compareData.brand;
    const mod = compareData.model
    let values = {
        brand: "",
        model: ""
    }
    // search Branch
    if (brand != undefined  && brand != "") {
        let bra_val = SearchValue_s(brand, bra);
        if (bra_val.length == 0) {
            values.brand = null;
            values.model = null;
        } else {
            let bra_f = []
            bra_val.forEach(ele => {
                if (brand == ele.name) {
                    bra_f.push(ele);
                }
            });
            if (bra_f.length == 0) {
                values.brand = null;
                values.model = null;
            } else {
                values.brand = bra_f[0].id
                let bra_mod = []
                mod.forEach(el => {
                    if (el.brand_id == bra_f[0].id) {
                        bra_mod.push(el);
                    }
                });

                if (bra_mod.length == 0) {
                    values.model = null;
                } else {
                    let modf = []
                    bra_mod.forEach(e => {
                        if (e.name == model) {
                            modf.push(e);
                        }
                    });
                    if (modf.length == 0) {
                        values.model = null;
                    } else {
                        values.model = modf[0].model_id
                    }

                }
            }
        }
    } else {
        values.brand = null;
        values.model = null;
    }

    return values
}

async function compareEngineBrand(motor_brand, compareData) {
    const motor = compareData.engine_brand;
    let values = {
        motor_brand: "",
    }
    // search motor brand
    let motorb = SearchValue_s(motor_brand, motor);
    if (motorb.length == 0) {
        values.motor_brand = null;
    } else {
        let val = []
        motorb.forEach(ele => {
            if (ele.name == motor_brand) {
                val.push(ele)
            }
        });
        if (val.length == 0) {
            values.motor_brand = null;
        } else {
            values.motor_brand = val[0].id;
        }
    }

    return values
}

async function compareColor(color, compareData) {
    const cl = compareData.color;
    let color_Id = 0;
    // search color
    let colurs = SearchValue_m(color, cl);
    if (colurs.length == 0) {
        color_Id = null;
    } else {
        let arr = []
        colurs.forEach(ele => {
            if (ele.name == color) {
                arr.push(ele)
            }
        });
        if (arr.length == 0) {
            color_Id = colurs[0].id
        } else {
            color_Id = arr[0].id
        }

    }
    return color_Id
}

async function checkDate(date, ...flag) {
    let dateTime = null;
    let time = "00:00:00";
    const format1 = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // DD/MM/YYYY
    const format2 = /^\d{1,2}\/\d{1,2}\/\d{2}$/; // DD/MM/YY
    const format3 = /^\d{1,2}\.\d{1,2}\.\d{4}$/; // DD.MM.YYYY
    const format4 = /^\d{1,2}\.\d{1,2}\.\d{2}$/; // DD.MM.YY
    const format5 = /^\d{1,2}-\d{1,2}-\d{4}$/; // DD-MM-YYYY
    const format6 = /^\d{1,2}-\d{1,2}-\d{2}$/; // DD-MM-YY

    const format7 = /^\d{4}\/\d{1,2}\/\d{1,2}$/; // YYYY/MM/DD
    const format8 = /^\d{4}\.\d{1,2}\.\d{1,2}$/; // YYYY.MM.DD
    const format9 = /^\d{4}-\d{1,2}-\d{1,2}$/; // YYYY-MM-DD

    const format10 = /^(\d{4}\/\d{1,2}\/\d{1,2})T(\d{2}:\d{2}:\d{2})Z$/; // YYYY/MM/DDTHH:MM:SSZ
    const format11 = /^(\d{4}-\d{1,2}-\d{1,2})T(\d{2}:\d{2}:\d{2})Z$/; // YYYY-MM-DDTHH:MM:SSZ
    const format12 = /^(\d{4}.\d{1,2}.\d{1,2})T(\d{2}:\d{2}:\d{2})Z$/; // YYYY.MM.DDTHH:MM:SSZ

    const format13 = /^(\d{4}\/\d{1,2}\/\d{1,2}) (\d{2}:\d{2}:\d{2})$/; // YYYY/MM/DD HH:MM:SS
    const format14 = /^(\d{4}-\d{1,2}-\d{1,2}) (\d{2}:\d{2}:\d{2})$/; // YYYY-MM-DD HH:MM:SS
    const format15 = /^(\d{4}.\d{1,2}.\d{1,2}) (\d{2}:\d{2}:\d{2})$/; // YYYY.MM.DD HH:MM:SS

    if (
        format1.test(date) ||
        format2.test(date) ||
        format3.test(date) ||
        format4.test(date) ||
        format5.test(date) ||
        format6.test(date)
    ) {
        const currentDate = new Date();
        const currentYear = `${currentDate.getFullYear()}`.substr(-2);
        const newDate = date.replace(/\//g, "-").replace(/\./g, "-");
        const arr = newDate.split("-");
        arr[2] =
            arr[2].length === 4
                ? arr[2]
                : flag.length > 0
                    ? Number(arr[2]) >= 0 && Number(arr[2]) <= Number(currentYear) + 6
                        ? `20${arr[2]}`
                        : null
                    : Number(arr[2]) > Number(currentYear)
                        ? `19${arr[2]}`
                        : `20${arr[2]}`;
        dateTime = `${arr[2]}-${`0${arr[1]}`.substr(-2)}-${`0${arr[0]}`.substr(
            -2
        )} ${time}`;
        return arr[2] === null ? null : dateTime;
    } else if (format7.test(date) || format8.test(date) || format9.test(date)) {
        const newDate = date.replace(/\//g, "-").replace(/\./g, "-");
        const arr = newDate.split("-");
        dateTime = `${arr[0]}-${`0${arr[1]}`.substr(-2)}-${`0${arr[2]}`.substr(
            -2
        )} ${time}`;
        return dateTime;
    } else if (
        format10.test(date) ||
        format11.test(date) ||
        format12.test(date) ||
        format13.test(date) ||
        format14.test(date) ||
        format15.test(date)
    ) {
        const newDate = date
            .replace(/\//g, "-")
            .replace(/\./g, "-")
            .replace("T", " ")
            .replace("Z", "");
        dateTime = newDate;
        return dateTime;
    } else {
        return dateTime;
    }
}

module.exports = {
    compareValue,
    compareProvinceAndDistrictandVillage,
    compareBrandAndModel,
    checkDate,
    compareEngineBrand,
    compareColor
};
