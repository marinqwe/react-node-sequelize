'use strict';
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'Task',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            done: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            description: DataTypes.TEXT,
            TodoId: {
                type: DataTypes.INTEGER,
                field: 'todo_id'
            }
        },
        {
            tableName: 'tasks'
        }
    );
    Task.associate = function(models) {
        // associations can be defined here
        Task.belongsTo(models.Todo, {
            foreignKey: 'todo_id',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        });
    };
    return Task;
};
