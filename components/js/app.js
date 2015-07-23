document.addEventListener('DOMContentLoaded', function(){
  var myRecipes = new Recipes;
  myRecipes.load();

  var myApp = new App;
  myApp.start();
})

function App() {
  this.form = document.getElementById('signIn')
  this.email = document.getElementById('password')
  this.password = document.getElementById('email')
}

App.prototype = {
  start: function() {
    this.form.addEventListener('submit', function(e) {
      e.preventDefault();
      var x = this.signIn();
    }.bind(this), false)
  },
  signIn: function() {
    for (var i = myUsers.users.length - 1; i >= 0; i--) {
      var savedEmail = myUsers.users[i].email;
      if(this.email.value === savedEmail && this.password.value === 'password') return true;
    };
  },

};

