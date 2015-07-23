document.addEventListener('DOMContentLoaded', function(){ 

  function Users() {}

  Users.prototype = {
    load: function() {
      var request = new XMLHttpRequest();
      request.open('GET', '../../recipes.json')
      request.onloadstatuschange = function() {
          debugger
        if (request.status === 200 && request.readyState === 4 ) {
          debugger
          this.users = JSON.parse(request.responseText).users;
        } else {
          console.log( "HTTP error "+ request.status+" "+ request.statusText )
        }
      }.bind(this)
      request.send()
    }
  };

  var allUsers = new Users;
  allUsers.load();
})