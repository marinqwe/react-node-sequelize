const Sequelize = require('sequelize');
const sequelize = require('../db');

const Todo = sequelize.define(
    'todo',
    {
        todoName: {
            type: Sequelize.TEXT,
            unique: true,
            allowNull: false
        },
        todoId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        timestamps: false
    }
);

module.exports = ('Todo', Todo);
