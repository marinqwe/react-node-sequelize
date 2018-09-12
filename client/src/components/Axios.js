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

export const removeTodo = (id) => {
    
};
