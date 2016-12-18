import React, { Component, PropTypes } from 'react';
import Task from './Task.jsx';
import { TaskDb } from '../api/TaskApi.js';
import { createContainer } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
class ToDoTaskList extends Component {

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} handleChange={this.handleStatusChange} />
        ));
    }
    getStatus() {
        return this.props.status;
    }
    handleStatusChange(item, event) {
        TaskDb.update(item._id, {
            $set: { status: event.target.value }
        });

    }

    render() {
        return (
            <div className="todo-task-list">
                {this.renderTasks()}
            </div>
        );
    }
}

export default createContainer(() => {
    return {
        tasks: TaskDb.find({status: "TODO"}).fetch(),
    };
}, ToDoTaskList);