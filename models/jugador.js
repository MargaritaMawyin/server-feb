const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Jugador= sequelize.define('jugador', {
    jugador_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    documentacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'documentacion',
        key: 'documentacion_id'
      }
    },
    contacto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contacto',
        key: 'contacto_id'
      }
    },
    nombre_club: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nombres: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_de_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cedula: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    nacionalidad: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    estatura: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fecha_de_inscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    representante: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    tipo_de_sangre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    posicion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    comentario: {
      type: DataTypes.STRING(355),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    esLibre: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    licencia: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'jugador',
    timestamps: false,
    updatedAt: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "jugador_id" },
        ]
      },
      {
        name: "documentacion_id",
        using: "BTREE",
        fields: [
          { name: "documentacion_id" },
        ]
      },
      {
        name: "contacto_id",
        using: "BTREE",
        fields: [
          { name: "contacto_id" },
        ]
      },
    ]
  });
  
  return Jugador;
};
