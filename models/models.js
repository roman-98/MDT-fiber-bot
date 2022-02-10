const sequelize = require('../database');
const {DataTypes} = require('sequelize');

const Starosta = sequelize.define('starosta', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  pib: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  position: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  settlement: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  community: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  district: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  region: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  cabel: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  socialObjects: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  socialObjectName: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  connection: {
    type: DataTypes.STRING, 
    allowNull: false
  }
});

const Phones = sequelize.define('phones', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true, 
    allowNull: false
  }
});

module.exports = {Starosta, Phones};

