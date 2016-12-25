import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const TaskDb = new Mongo.Collection('Task');

Meteor.methods({
    'tasks.insert'(task) {

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        TaskDb.insert({
            title: task.title,
            description: task.description,
            status: "TODO",
            createdAt: new Date(), // current time
            createdBy: Meteor.users.findOne(this.userId).username
        });

    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        TaskDb.remove(taskId);
    },
    'tasks.update'(taskId, taskStatus) {

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        TaskDb.update(taskId, {
            $set: { status: taskStatus }
        });
    }
});