const compare = require('./Compare');

async function cleansingData(car, cleansingData) {
    const color = compare.compareColor(car.color_t, cleansingData); // 0
    const provDistrict = compare.compareProvinceAndDistrictandVillage(
        car.province_t,
        car.district_t,
        car.village_t,
        cleansingData
    ); // 1
    const steering = compare.compareValue(
        car.driverseat_t,
        cleansingData.steering
    ); // 2
    const gas = compare.compareValue(car.energy_t, cleansingData.energy); // 3
    const brandModel = compare.compareBrandAndModel(
        car.make_t,
        car.model_t,
        cleansingData
    ); // 4
    const engine_brand = compare.compareEngineBrand(
        car.motor_make_t,
        cleansingData
    ); // 5
    const commercePermitDate = compare.checkDate(car.commerce_permit_date_t); // 6
    const expireDate = compare.checkDate(car.expire_date_t, true); // 7
    const importPermitDate = compare.checkDate(car.import_permit_date_t); // 8
    const industrialDocDate = compare.checkDate(car.industrial_doc_date_t); // 9
    const issueDate = compare.checkDate(car.issue_date_t); // 10
    const policeDocDate = compare.checkDate(car.police_doc_date_t); // 11
    const purpose = compare.compareValue(car.purpose_t, cleansingData.purpose); // 12
    const specialDate = compare.checkDate(car.special_date_t); // 13
    const taxDate = compare.checkDate(car.tax_date_t); // 14
    const taxPaymentDate = compare.checkDate(car.tax_payment_date_t); // 15
    const technicalDocDate = compare.checkDate(car.technical_doc_date_t); // 16
    const dateTimeUpdate = compare.checkDate(car.update_time.toString()); // 17
    const vehicleType = compare.compareValue(
        car.vehicletype_t,
        cleansingData.vehicletype
    ); // 18
    const cancel_date = compare.checkDate(car.cancel_date_t); // 19
    const cancel_transport_date = compare.checkDate(car.cancel_transport_date_t); // 20
    const lost_date = compare.checkDate(car.lost_date_t); // 21
    const lost_date_custom = compare.checkDate(car.lost_date_custom_t); // 22



    return Promise.all([
        color,
        provDistrict,
        steering,
        gas,
        brandModel,
        engine_brand,
        commercePermitDate,
        expireDate,
        importPermitDate,
        industrialDocDate,
        issueDate,
        policeDocDate,
        purpose,
        specialDate,
        taxDate,
        taxPaymentDate,
        technicalDocDate,
        dateTimeUpdate,
        vehicleType,
        cancel_date,
        cancel_transport_date,
        lost_date,
        lost_date_custom
    ])
        .then(async (result) => {
            return {
                vehicle_old: {
                    vehicle_id: 0,
                    color_old: cutData(50, await checkId(result[0], car.color_t)), // check id = 99999 or null ?
                    commerce_permit_date_old: cutData(10, await checkId(
                        result[6],
                        car.commerce_permit_date_t
                    )),
                    village_name_old: cutData(100, await checkNull(car.village_t)),
                    district_old: cutData(50, await checkNull(car.district_t)), // check id = 99999 or null ?
                    division_no_old: cutData(52, await checkNull(car.division_no_t)),
                    steering_old: cutData(20, await checkNull(car.driverseat_t)), // check id = 99999 or null ?
                    gas_old: cutData(30, await checkNull(car.energy_t)), // check id = 99999 or null ?
                    expire_date_old: cutData(50, await checkNull(car.expire_date_t)),
                    issue_date_old: cutData(50, await checkNull(car.issue_date_t)),
                    brand_old: cutData(20, await checkNull(car.make_t)),
                    model_old: cutData(20, await checkNull(car.model_t)),
                    motor_brand_old: cutData(20, await checkNull(car.motor_make_t)),
                    police_doc_date_old: cutData(50, await checkNull(car.police_doc_date_t)),
                    province_old: cutData(30, await checkNull(car.province_t)),
                    purpose_old: cutData(50, await checkNull(car.purpose_t)),
                    special_date_old: cutData(50, await checkNull(car.special_date_t)),
                    tax_date_old: cutData(50, await checkNull(car.tax_date_t)),
                    tax_payment_date_old: cutData(50, await checkNull(car.tax_payment_date_t)),
                    update_time_old: cutData(50, await checkNull(car.update_time)),
                    vehicle_type_old: cutData(50, await checkNull(result[18], car.vehicletype_t)),
                    keyby: cutData(100, await checkNull(car.keyby_t)),
                    access: cutData(50, await checkNull(car.access_t)),
                    advance: cutData(255, await checkNull(car.advance_t)),
                    certcode: cutData(100, await checkNull(car.certcode_t)),
                    certdate: cutData(20, await checkNull(car.certdate_t)),
                    certlicense: cutData(50, await checkNull(car.certlicense_t)),
                    certno: cutData(50, await checkNull(car.certno_t)),
                    certolddate: cutData(50, await checkNull(car.certolddate_t)),
                    certperm: cutData(30, await checkNull(car.certperm_t)),
                    certprintdate: cutData(50, await checkNull(car.certprintdate_t)),
                    certtemp: cutData(30, await checkNull(car.certtemp_t)),
                    certify_doc_date: cutData(20, await checkNull(car.certify_doc_date_t)),
                    certify_doc_number: cutData(100, await checkNull(car.certify_doc_number_t)),
                    certify_doc_remark: await checkNull(car.certify_doc_remark_t),
                    _olddata: cutData(2, await checkNaN(car._olddata_t)),
                    _ver: cutData(4, await checkNaN(car._ver_t)),
                    tax: cutData(10, await checkNull(car.tax_t)),
                    doc1_remark: cutData(100, await checkNull(car.doc1_remark_t)),
                    doc2_remark: cutData(100, await checkNull(car.doc2_remark_t)),
                    doc3_remark: cutData(100, await checkNull(car.doc3_remark_t)),
                    doc4_remark: cutData(100, await checkNull(car.doc4_remark_t)),
                    doc5_remark: cutData(100, await checkNull(car.doc5_remark_t)),
                    doc6_remark: cutData(100, await checkNull(car.doc6_remark_t)),
                    cancel_number: cutData(20, await checkNaN(car.cancel_number_t)),
                    cancel_date: cutData(25, await result[19]),
                    cancel_country: cutData(30, await checkNull(car.cancel_country_t)),
                    cancel_transport_number: cutData(20, await checkNaN(car.cancel_transport_number_t)),
                    cancel_transport_date: cutData(25, await result[20]),
                    lost_number: cutData(20, await checkNaN(car.lost_number_t)),
                    lost_date: cutData(25, await result[21]),
                    lost_custom: cutData(50, await checkNull(car.lost_custom_t)),
                    lost_date_custom: cutData(25, await result[22]),
                    
                },
                vehicles: {
                    division_no: cutData(20, await checkNull(car.division_no_t)),
                    note_id: cutData(50, await checkNull(car.note_id_t)),
                    licence_no: cutData(50, await checkNull(car.license_no_t)),
                    owner_name: cutData(100, await checkNull(car.name_t)),
                    province_code: cutData(10, result[1].province),
                    district_code: cutData(10, result[1].district), // district data
                    village_id: cutData(10, result[1].village),
                    steering_id: cutData(11, result[2]), // steering data
                    vehicle_type_id: cutData(11, result[18]),
                    color_id: cutData(11, result[0]), // color data
                    year_manufacture: cutData(20, await checkNull(car.year_manufactured_t)),
                    height: cutData(20, await checkNull(car.height_t)),
                    long: cutData(10, await checkNull(car.length_t)),
                    gas_id: cutData(11, result[3]), // gas data
                    wheels: cutData(10, await checkNull(car.wheels_t)),
                    engine_no: cutData(40, await checkNull(car.engine_no_t)),
                    chassis_no: cutData(40, await checkNull(car.chassis_no_t)),
                    weight: cutData(10, await checkNull(car.weight_empty_t)),
                    weight_filled: await checkNull(car.weight_filled_t),
                    import_permit_no: cutData(50, await checkNaN(car.import_permit_no_t)),
                    import_permit_date_old: cutData(25, await checkId(
                        result[8],
                        car.import_permit_date_t
                    )),
                    industrial_doc_no: cutData(50, await checkNull(car.industrial_doc_no_t)),
                    industrial_doc_date_old: cutData(25, await checkId(
                        result[9],
                        car.industrial_doc_date_t
                    )),
                    technical_doc_no: cutData(50, await checkNull(car.technical_doc_no_t)),
                    total_weight: cutData(10, await checkNull(car.weight_total_t)),
                    technical_doc_date_old: cutData(25, await checkId(
                        result[16],
                        car.technical_doc_date_t
                    )),
                    width: cutData(10, await checkNull(car.width_t)),
                    brand_id: cutData(11, result[4].brand),
                    model_id: cutData(11, result[4].model),
                    comerce_permit_no: cutData(20, await checkNull(car.commerce_permit_no_t)),
                    comerce_permit_date: cutData(25, result[6]),
                    tax_no: cutData(50, await checkNull(car.tax_no_t)),
                    tax_date: cutData(25, result[14]),
                    tax_payment_no: cutData(100, await checkNull(car.tax_payment_no_t)),
                    tax_payment_date: cutData(25, result[15]),
                    police_doc_no: cutData(10, await checkNull(car.police_doc_no_t)),
                    police_doc_date: cutData(25, result[11]),
                    remark: await checkNull(car.remark_t),
                    seat: cutData(11, await checkNull(car.seats_t)),
                    tax_10_40: cutData(2, await checkNaN(car.tax_10_40_t)),
                    tax_exam: cutData(2, await checkNaN(car.tax_exem_t)),
                    tax_12: cutData(2, await checkNaN(car.tax_12_t)),
                    tax_50: cutData(2, await checkNaN(car.tax_50_t)),
                    import_permit_hsny: cutData(2, await checkNaN(car.import_permit_hsny_t)),
                    import_permit_invest: cutData(2, await checkNaN(car.import_permit_invest_t)),
                    tax_receipt: cutData(2, await checkNull(car.tax_receipt_t)),
                    issue_date: cutData(25, result[10]),
                    // issue_date_var: cutData(25, await checkNull(car.issue_date_var_t)),
                    tax_permit: cutData(2, await checkNull(car.tax_permit_t)),
                    vehicle_kind_code: cutData(5, result[12]),
                    motor_brand_id: cutData(5, result[5].motor_brand),
                    cylinder: cutData(10, await checkNull(car.cylinder_t)),
                    cc: cutData(10, await checkNull(car.cc_t)),
                    axis: cutData(10, await checkNull(car.axis_t)),
                    commerce_permit: cutData(30, await checkNull(car.commerce_permit_t)),
                    deleted: cutData(2, await isNaN(car.deleted_t) == false ? car.deleted_t: 1),
                    issue_place: cutData(100, await checkNull(car.issue_place_t)),
                    owner_lastname: cutData(100, await checkNull(car.lastname_t)),
                    // log: await checkNull(car.log_t),
                    special_date: cutData(50, result[13]),
                    special_remark: await checkNull(car.special_remark_t),
                    special: cutData(255, await checkNull(car.special_t)),
                    technicalcheck: cutData(10, await checkNull(car.technicalcheck_t)),
                    tnic_date: cutData(25, await checkNull(car.tnic_date_t)),
                    tnic_expire_date: cutData(25, await checkNull(car.tnic_expire_date_t)),
                    tnic_result: cutData(50, await checkNull(car.tnic_result_t)),
                    vehicle_send: cutData(50, await checkNull(car.email_address_t)),
                    // counted: await checkNull(car.counted_t),
                    expire_date: result[7],
                    import_permit_date: result[8],
                    industrial_doc_date: result[9],
                    // province_abbr: await checkNull(car.province_abbr_t),
                    province_no: await checkNull(car.province_no_t),
                    datetime_update: result[17],
                    technical_doc_date: result[16],
                    quick_id_solr: cutData(20, await checkNull(car.quick_id_t)),
                },
                log: {
                    vehicle_id: 0,
                    log_activity: await checkNull(car.changelog_t),
                }

            }
        })
        .catch((err) => {
            console.error(err);
            process.exit(0);
        });
}

async function checkNaN(value) {
    return isNaN(parseInt(value)) ? null : parseInt(value);
}

async function checkNull(value) {
    return value == "" || value == undefined ? null : value;
}

async function checkId(id, value) {
    return id == undefined || id == null ? null : value;
}
function cutData(number, item) {
    let val = "";
    if (item != null && item != "") {
        val = item.toString().trim().substr(0, number)
    } else {
        val = null;
    }
    return val;
}

module.exports = {
    cleansingData,
}
