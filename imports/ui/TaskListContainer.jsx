import React, { Component, PropTypes } from 'react';
import Task from './Task.jsx';
import { TaskDb } from '../api/TaskApi.js';
import { createContainer } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
class TaskListView extends Component {

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task}
                  handleChange={this.handleStatusChange}
                  openTaskModal={this.openTaskModal} />
        ));
    }

    openTaskModal(item) {
        console.log(item);
    }

    getStatus() {
        return this.props.status;
    }
    handleStatusChange(item, event) {
        let taskStatus = event.target.value;
        let taskId = item._id;
        Meteor.call('tasks.update', taskId, taskStatus);
    }

    render() {
        return (
            <div>
                <div className="todo-task-list">
                    <div className="task-list-title">{this.props.title}</div>
                    {this.renderTasks()}
                </div>
                <div className="modal">
                    <div className="modal-content">
                        Test
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskListContainer = createContainer(({status}) => {
    let title = 'TO DO';
    switch (status) {
        case 'IN-PROGRESS':
            title = 'IN PROGRESS';
            break;
        case 'READY-TO-TEST':
            title = 'READY TO TEST';
            break;
        case 'DONE':
            title = 'DONE';
            break;
        default:
            break;
    }

    return {
        title: title,
        tasks: TaskDb.find({status: status}).fetch()
    };
}, TaskListView);