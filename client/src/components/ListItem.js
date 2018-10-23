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
            <div className={!checked ? 'listContainer' : 'listContainerChecked'}>
                <div className="todo">
                    <div className="todoLeftAlign">
                        <div className="todoName">{todo.todoName}</div>
                        <button className="toggleBtn" onClick={() => this.toggleDesc()}>
                            <div className="tooltip">
                                {!isExtended ? '+' : '-'}
                                <span className="tooltiptext">
                                    {!isExtended ? 'Show description' : 'Hide description'}
                                </span>
                            </div>
                        </button>
                    </div>

                    <div>
                        <label className="container">
                            <input type="checkbox" checked={checked} onClick={() => this.updateChecked()} />
                            <span className="checkmark" />
                            <div>Done</div>
                        </label>

                        <button className="todoBtn" onClick={() => onUpdating(todo.id)}>
                            EDIT
                        </button>
                        <button className="todoBtn" onClick={() => removeTodo(todo.id)}>
                            <div className="tooltip">
                                ×<span className="tooltiptext">Remove todo</span>
                            </div>
                        </button>
                    </div>
                </div>
                {isExtended && <div className="todoDescription">{todo.Task.description}</div>}
            </div>
        );
    }
}

export default ListItem;
