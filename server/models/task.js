'use strict';
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'Task',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
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
