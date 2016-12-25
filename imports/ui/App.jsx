import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import TaskListContainer from './TaskListContainer.jsx';

import { TaskDb } from '../api/TaskApi.js';
import Task from './Task.jsx';
import TaskFrom from './TaskForm.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {


    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const task = {
            title:          this.refs.taskTitle.value,
            description:    this.refs.taskDescription.value
        };
        Meteor.call('tasks.insert', task);


        // Clear form
        ReactDOM.findDOMNode(this.refs.taskTitle).value = '';
        ReactDOM.findDOMNode(this.refs.taskDescription).value = '';
    }
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                </header>
                <AccountsUIWrapper />
                <div className="task-container">
                    <TaskListContainer status="TODO"/>
                    <TaskListContainer status="IN-PROGRESS"/>
                    <TaskListContainer status="READY-TO-TEST"/>
                    <TaskListContainer status="DONE"/>
                </div>
                <div>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <div className="add-form-title">
                            <input type="text" ref="taskTitle" placeholder="Title" />
                        </div>
                        <div className="add-form-description">
                            <textarea ref="taskDescription" placeholder="Description" />
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <TaskFrom />
            </div>
        );
    }
}
App.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        tasks: TaskDb.find({}).fetch()
    };
}, App);