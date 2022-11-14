module.exports = (sequelize, DataTypes) => {
    const Vehiclehistory = sequelize.define('license_no_history', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        vehicle_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        vehicle_kind_code: DataTypes.STRING(8),
        licence_no: DataTypes.STRING(50),
        province_code: DataTypes.STRING(10),
        start_date: DataTypes.STRING(25),
        end_date: DataTypes.STRING(25),
        license_no_status: DataTypes.ENUM('uses','not_uses'),
        remark: DataTypes.TEXT,
        created_by: DataTypes.INTEGER,
    })
    return Vehiclehistory;
}