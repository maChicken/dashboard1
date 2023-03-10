const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Movie = sequelize.define('movie', {
    movie_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    movie_title: {type: DataTypes.STRING, allowNull: false, unique: true},
    release_date: {type: DataTypes.DATEONLY, allowNull: false},
    runtime: {type: DataTypes.INTEGER, allowNull: false},
    genre: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.DECIMAL(3, 1), allowNull: false}
}, { timestamps: false }
)

const Character = sequelize.define('character', {
    character_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    date_of_birth: {type: DataTypes.DATEONLY, allowNull: false},
    gender: {type: DataTypes.STRING(10), allowNull: false},
    nominations: {type: DataTypes.INTEGER},
    runtime: {type: DataTypes.DECIMAL(20, 2)}
}, { timestamps: false }
)

Movie.hasMany(Character, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE'
})
Character.belongsTo(Movie, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE'
})

module.exports = {
    Movie,
    Character
}