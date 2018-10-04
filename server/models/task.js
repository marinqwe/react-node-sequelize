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
            done: DataTypes.BOOLEAN,
            description: DataTypes.TEXT
        },
        {}
    );
    Task.associate = function(models) {
        // associations can be defined here
        // Task.belongsTo(models.Todo, {
        //     foreignKey: 'todosId',
        //     onDelete: 'CASCADE'
        // }); 
    };
    return Task;
};
