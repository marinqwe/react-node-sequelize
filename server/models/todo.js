'use strict';
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define(
        'Todo',
        {
            todoName: DataTypes.STRING
        },
        {
            tableName: 'todos'
        }
    );
    Todo.associate = function(models) {
        // associations can be defined here
        Todo.hasOne(models.Task, {
            onDelete: 'cascade',
            hooks: true
        });
    };
    return Todo;
};
