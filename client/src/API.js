import axios from 'axios';

const url = {
    getData: 'todos',
    createData: 'todos/add',
    removeData: 'todos/delete',
    updateData: 'todos/update'
};

export const getData = () =>
    axios
        .get(`http://localhost:3000/${url.getData}`)
        .then(res => {
            const todos = res.data.data;
            return todos;
        })
        .catch(err => {
            throw err;
        });

export const removeData = id =>
    axios.delete(`http://localhost:3000/${url.removeData}/${id}`).then(() => getData('todos'));

export const createData = inputValue =>
    axios
        .post(`http://localhost:3000/${url.createData}`, {
            data: inputValue
        })
        .then(() => getData('todos'));

export const updateData = (inputValue, id) =>
    axios
        .put(`http://localhost:3000/${url.updateData}`, {
            data: {
                todoName: inputValue,
                id
            }
        })
        .then(() => getData('todos'));
