'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Todo',
        {
            todoName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 50],
                        msg: 'Your todo item name must be between 3 and 50 characters long!'
                    }
                }
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
};
