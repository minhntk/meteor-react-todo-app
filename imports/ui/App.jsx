import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import ToDoTaskList from './ToDoTaskList.jsx';
import InProgressTasksList from './InProgressTasksList.jsx';
InProgressTasksList

import { TaskDb } from '../api/TaskApi.js';
import Task from './Task.jsx';
import TaskFrom from './TaskForm.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {


    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const taskTitle = this.refs.taskTitle.value;
        const taskDescription = this.refs.taskDescription.value;

        TaskDb.insert({
            title: taskTitle,
            description: taskDescription,
            status: "TODO",
            createdAt: new Date(), // current time
        });

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
                    <ToDoTaskList status="TODO"/>
                    <InProgressTasksList />
                </div>
                <div>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <div>
                            <input type="text" ref="taskTitle" placeholder="Title" />
                        </div>
                        <div>
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