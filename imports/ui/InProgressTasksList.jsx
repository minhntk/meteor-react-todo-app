import React, { Component, PropTypes } from 'react';
import Task from './Task.jsx';
import { TaskDb } from '../api/TaskApi.js';
import { createContainer } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
class InProgressTasksList extends Component {

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} handleChange={this.handleStatusChange} />
        ));
    }

    handleStatusChange(item, event) {
        TaskDb.update(item._id, {
            $set: { status: event.target.value }
        });

    }

    render() {
        return (
            <div className="inprogress-task-list">
                {this.renderTasks()}
            </div>
        );
    }
}

export default createContainer(() => {
    return {
        tasks: TaskDb.find({status: "IN-PROGRESS"}).fetch(),
    };
}, InProgressTasksList);