'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tasks', {
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
            todosId: {
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'Todos',
                    key: 'todoId'
                }
            },
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
