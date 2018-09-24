'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    todoName: DataTypes.STRING,
    todoId: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};