const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('documentacion', {
    documentacion_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ficha_sin_firmar: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    ficha_firmada: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    foto: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    ficha_medica: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    autorizacion_representante: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'documentacion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "documentacion_id" },
        ]
      },
    ]
  });
};
