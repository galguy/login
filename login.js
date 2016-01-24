Seizers = new Mongo.Collection("seizers");

if (Meteor.isClient) {
  Template.dashboard.events({
    'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
    }
  });
  Template.register.events({
    'submit form': function(event){
      event.preventDefault();
      var emailVar = event.target.registerEmail.value;
      var passwordVar = event.target.registerPassword.value;
      Accounts.createUser({
        email: emailVar,
        password: passwordVar
      });
    }
  });
  Template.login.events({
    'submit form': function(event){
      event.preventDefault();
      var emailVar = event.target.loginEmail.value;
      var passwordVar = event.target.loginPassword.value;
      Meteor.loginWithPassword(emailVar, passwordVar);
    }
  });

  Template.body.helpers({
    seizers: function () {
      return Seizers.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD/MM/YY HH:mm:ss');
  });

  Template.body.events({
    "submit .new-task": function (event) {
      //alert(Date());
      document.getElementById("timeOfSeizer").innerHTML = Date();
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var duration = event.target.duration.value;
      var context = event.target.context.value;
      var comment = event.target.comment.value;

      // Insert a task into the collection
      Seizers.insert({
        duration: duration,
        context: context,
        comment: comment,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.duration.value = "";
      event.target.context.value = "";
      event.target.comment.value = "";

    }

  });

  Template.seizer.events({

    "click .delete": function () {
      Seizers.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
