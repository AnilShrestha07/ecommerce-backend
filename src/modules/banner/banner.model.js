const { DataTypes } = require("sequelize")
const sequelize = require("../../config/pg.config")

const BannerModel = sequelize.define("banners", {
     id:{
        type: DataTypes.UUID,
        require: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title:{
        type: DataTypes.STRING,
        require: true
      },
      url:{
        type: DataTypes.STRING,
        require: true
      },
      status:{
        type: DataTypes.STRING,
        enum:['active','inactive'],
        default: 'inactive'
      },
      image:{
        type: DataTypes.JSON
      },
      createdAt:{
        type: DataTypes.DATE,
        default: Date.now()
      },
       updatedAt:{
        type: DataTypes.DATE,
        default: Date.now()
      }
})
module.exports = BannerModel