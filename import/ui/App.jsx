import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { TaskDb } from '../api/TaskApi.js';
import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {

    renderTasks() {
        console.log(this.props.tasks);
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} handleChange={this.handleChange} />
        ));
    }
    handleChange(item, event) {
        TaskDb.update(item._id, {
            $set: { status: event.target.value },
        });

    }
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                </header>
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}
App.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        tasks: TaskDb.find({}).fetch(),
    };
}, App);