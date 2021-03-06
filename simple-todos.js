Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    Template.body.helpers({
        tasks: function () {
            if (Session.get('hideCompleted')) {
                return Tasks.find({
                    checked: {
                        $ne: true
                    }
                }, {
                    sort: {
                        createdAt: -1
                    }
                });
            }

            return Tasks.find({}, {
                sort: {
                    createdAt: -1
                }
            });
        },
        incompleteCount: function () {
            return Tasks.find({
                checked: {
                    $ne: true
                }
            }).count();
        }
    });

    Template.body.events({
        'submit .new-task': function (event) {
            var text = event.target.text.value;

            Tasks.insert({
                text: text,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            });

            // Clear form
            event.target.text.value = '';

            // Prevent default form submit
            return false;
        },
        'change .hide-completed input': function (event) {
            Session.set('hideCompleted', event.target.checked);
        }


    });

    Template.task.events({
        'click .toggle-checked': function (event) {
            Tasks.update(this._id, {
                $set: {
                    checked: !this.checked
                }
            });
        },
        'click .delete': function (event) {
            Tasks.remove(this._id);
        }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
