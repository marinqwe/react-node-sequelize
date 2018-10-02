'use strict';
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define(
        'Todo',
        {
            todoName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            todoId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            }
        },
        {}
    );
    Todo.associate = function(models) {
        // associations can be defined here
        Todo.hasOne(models.Task, {
            foreignKey: 'todosId',
            onDelete: 'CASCADE'
        });
    };
    return Todo;
};
