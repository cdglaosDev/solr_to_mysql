const express = require("express");
const app = express();
const port = process.env.PORT || 3100;
const clc = require('cli-color');
const { Import_jsondata } = require('./config/config_json');
const { readExcel } = require('./config/readfile');
const { sequelize } = require("./models");
const Vehicles = require('./controller/Vehicles');
const logController = require('./controller/Logs');
const historyController = require('./controller/Histories');
const illegaltraffic_and_acident = require('./controller/illegaltraffic_and_acident');

StarPM();

async function StarPM() {
    let json = await Import_jsondata();
    let excel = await readExcel();
    console.log(clc.red("Data have:", json.length, "records."));

    if (json.length != 0) {
        let num = 0;
        for (let i = 0; i < json.length; i++) {
            const vehicle = json[i];
            let vehicle_Id = 0;
            // const isFind = await Vehicles.findVehicle(vehicle.note_id_t)
            //     .catch((err) => {
            //         throw err;
            //     });
            // if (isFind) {
            //     vehicle_Id = await Vehicles.updateVehicle(vehicle, excel, isFind)
            //         .catch((err) => {
            //             console.log(err);
            //             process.exit(0);
            //         });
            // } else {
                vehicle_Id = await Vehicles.createNewVehicle(vehicle, excel)
                    .catch((err) => {
                        console.log(err);
                        process.exit(0);
                    });
            // }
            // illegal Traffic
            if (vehicle.finedate_t != undefined) {
                // illegal traffic and accident
                let traffic_Id = await illegaltraffic_and_acident
                    .createIllegaltraffic(vehicle, vehicle_Id)
                    .then((result) => {
                        if (result != null) {
                            return result;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        process.exit(0);
                    });
                // create accident
                if (traffic_Id) {
                    await illegaltraffic_and_acident.crateAcident(vehicle, traffic_Id);
                }
            } else {
                console.log(clc.red("Not have illegal"));
            }

            // log
            await logController.craeteLog(vehicle.changelog_t, vehicle_Id)
                .catch((err) => {
                    console.log(err);
                    process.exit(0);
                });

            // history
            await historyController.createHistory(excel.change_province, vehicle_Id).catch((err) => {
                console.log(err);
                process.exit(0);
            });
            console.log(
                clc.blue(
                    `---------------------------------------------------------- Counts: ${++num}`
                )
            );
        }
    }
    console.log("End")
    process.exit(0)
}

// sequelize.sync({ force: true }).then(() => {
//     app.listen(port, () => {
//         console.log(`Server Running ${(port)}`);
//     });
// });
