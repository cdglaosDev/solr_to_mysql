module.exports = (sequelize, DataTypes) => {
    const Illegal_traffic = sequelize.define('illegal_traffic', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        vehicle_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        place: DataTypes.TEXT,
        offender_name: DataTypes.STRING(60),
        officer_name: DataTypes.STRING(60),
        date: DataTypes.STRING(25),
        status: { type: DataTypes.ENUM('0', '1'), defaultValue: '1' },
        remark: DataTypes.TEXT,
        illegal_date: DataTypes.DATE,
        illegal_no: DataTypes.STRING(100),
        bill_date: DataTypes.DATE,
        bill_no: DataTypes.STRING(100),
        note: DataTypes.TEXT,
        to_date: DataTypes.STRING(25),
        user_id: DataTypes.INTEGER,
        log: DataTypes.TEXT,
        accident_no: DataTypes.INTEGER
    }, {
        freezeTableName: true,

    })
    return Illegal_traffic
}