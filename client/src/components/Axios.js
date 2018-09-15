import axios from 'axios';

export const getData = url =>
    axios
        .get(`http://localhost:3000/${url}`)
        .then(res => {
            const todos = res.data.data;
            return todos;
        })
        .catch(err => {
            if (err) throw err;
        });

export const removeData = (url, id) =>
    axios
        .delete(`http://localhost:3000/${url}`, {
            data: id
        })
        .then(res => {
            const deleted = JSON.parse(res.config.data);
            return deleted;
        })
        .catch(err => {
            if (err) throw err;
        });

export const createData = (url, inputValue) =>
    axios
        .post(`http://localhost:3000/${url}`, {
            data: inputValue
        })
        .then(res => {
            const todo = JSON.parse(res.config.data);
            return todo.data;
        })
        .catch(err => {
            if (err) throw err;
        });

export const updateData = (url, inputValue, id) =>
    axios
        .put(`http://localhost:3000/${url}`, {
            data: {
                todoName: inputValue,
                id
            }
        })
        .then(res => {
            const todo = JSON.parse(res.config.data);
            return todo;
        })
        .catch(err => {
            if (err) throw err;
        });
