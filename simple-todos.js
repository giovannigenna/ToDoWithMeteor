Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    Template.body.helpers({
        tasks: function() { return Tasks.find({}, {sort:{createdAt: -1}}); }
    });

    Template.body.events({
        'submit .new-task': function( event ) {
            var text = event.target.text.value;

            Tasks.insert({
                text: text,
                createdAt: new Date()
            });

            // Clear form
            event.target.text.value = '';

            // Prevent default form submit
            return false;
        }

    });

    Template.task.events({
       'click .toggle-checked': function( event ) {
           Tasks.update( this._id, {$set: {checked: !this.checked}} );
       },
       'click .delete': function( event ) {
           Tasks.remove( this._id );
       }
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


