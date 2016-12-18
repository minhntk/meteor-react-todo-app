import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
    render() {
        return (
            <li className="task-content">
                <div>
                    {this.props.task.key}
                </div>
                <div className="task-tbl-column task-title">
                    {this.props.task.title}
                </div>
                <div className="task-tbl-column task-description">
                    {this.props.task.description}
                </div>
                <div className="task-tbl-column task-status">
                    <select value={this.props.task.status} onChange={this.props.handleChange.bind(this, this.props.task)} >
                        <option>Choose your option</option>
                        <option value="TODO">TODO</option>
                        <option value="IN-PROGRESS">IN PROGRESS</option>
                        <option value="READY-TO-TEST">READY TO TEST</option>
                        <option value="DONE">DONE</option>
                    </select>

                </div>
            </li>
        );
    }
}

Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
};