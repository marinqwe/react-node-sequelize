import React from 'react';
import { updateData } from '../API';
import '../styles/ListItem.css';
import '../styles/button.css';
import '../styles/Tooltip.css';
import '../styles/Checkbox.css';

class ListItem extends React.Component {
    state = {
        isExtended: false,
        checked: false
    };
    componentDidMount() {
        const done = this.props.value.Task.done;
        if (done) {
            this.setState(() => ({
                checked: done
            }));
        }
    }

    toggleDesc = () => {
        this.setState(prevState => ({
            isExtended: !prevState.isExtended
        }));
    };

    updateChecked = () => {
        const id = this.props.value.id;
        const checked = !this.state.checked;
        updateData(checked, id)
            .then(res => {
                this.setState(() => ({
                    checked: res[0].Task.done
                }));
            })
            .catch(err => {
                throw err;
            });
    };

    render() {
        const { value: todo, onUpdating, removeTodo } = this.props;
        const { isExtended, checked } = this.state;

        return (
            <div className="listContainer">
                <div className="todo">
                    <button className="toggleBtn" onClick={() => this.toggleDesc()}>
                        {!isExtended ? (
                            <div className="tooltip">
                                +<span className="tooltiptext">Show description</span>
                            </div>
                        ) : (
                            <div className="tooltip">
                                -<span className="tooltiptext">Hide description</span>
                            </div>
                        )}
                    </button>
                    <div>{todo.todoName}</div>

                    <label className="container">
                        <input type="checkbox" checked={checked} onClick={() => this.updateChecked()} />
                        <span className="checkmark" />
                        <div className="doneText">Done</div>
                    </label>
                    <div>
                        <button className="todoBtn" onClick={() => onUpdating(todo.id)}>
                            EDIT
                        </button>
                        <button className="todoBtn" onClick={() => removeTodo(todo.id)}>
                            ×
                        </button>
                    </div>
                </div>
                {isExtended && <div className="todoDescription">{todo.Task.description}</div>}
            </div>
        );
    }
}

export default ListItem;
