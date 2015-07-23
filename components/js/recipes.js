function Recipes () {
  this.recipesList = document.getElementById('recipesList');
  this.recipeTmp = document.getElementById('recipe-tmp').innerHTML;
}

Recipes.prototype =  {
  load: function() {
    this.bindEvents();
    var request = new XMLHttpRequest();
    request.open('GET', '../../recipes.json');
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        this.recipes = JSON.parse(request.responseText);
        myUsers = new Users;
        myUsers.parse(this.recipes)
        // change to add sign in
        this.appendRecipes();
      } else {
        console.log( "HTTP error "+ request.status+" "+ request.statusText )
      }
    }.bind(this)
    request.send();
  },
  bindEvents: function() {
    this.recipesList.addEventListener('click', 
      function(e) {
      if(e.target.className.includes('check')){
        this.toggleFavorite(e.target)
      }
    }.bind(this))
  },
  appendRecipes: function() {
    for (var i = this.recipes.length - 1; i >= 0; i--) {
      this.buildRecipe(this.recipes[i])
    };
  },
  buildRecipe: function(recipe) {
    var template = Handlebars.compile(this.recipeTmp)
    // this is the one line of jquery I used. This is a built in functionality in angular so I thought it would be fair to use it here.
    $(this.recipesList).append(template(recipe))
  },
  toggleFavorite: function(target) {
    if(target.className.includes('like')) {
      // added these lines for the visual effect of favoriting
      target.className = 'check'
      target.innerText = 'favorite'
      // should be uncommented when hooked up to the backend
      // this.favorite(e);
    } else {
      // added these lines for the visual effect of favoriting
      target.className = 'like check'
      target.innerText = 'unFavorite'
      // should be uncommented when hooked up to the backend
      // this.unfavorite();
    },
    // these two methods would be run to update the backend I would send it to an controller action that would change the value of favorite to true of false or vice versa
    favorite: function(e) {
      var request = new XMLHttpRequest();
      var id = e.target.nextElementSibling
      request.open('POST', '/recipes/' + id + '/favorite');
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          target.className = 'check'
          target.innerText = 'favorite'
        } else {
          console.log( "HTTP error "+ request.status+" "+ request.statusText )
        }
      }.bind(this)
    },
    unfavorite:function(e) {
      var id = e.target.nextElementSibling
      var request = new XMLHttpRequest();
      request.open('GET', '/recipes/' + id + '/favorite');
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          target.className = 'like check'
          target.innerText = 'unFavorite'
        } else {
          console.log( "HTTP error "+ request.status+" "+ request.statusText )
        }
      }.bind(this)
    }
  }
};