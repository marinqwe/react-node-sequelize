'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tasks', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            done: {
                type: Sequelize.BOOLEAN
            },
            description: {
                type: Sequelize.TEXT
            },
            // todosId: {
            //     type: Sequelize.INTEGER,
            //     onDelete: 'CASCADE',
            //     references: {
            //         model: 'todos',
            //         key: 'id'
            //     }
            // }
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Tasks');
    }
};
