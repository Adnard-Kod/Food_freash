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
        myUsers.parse(this.recipes);
        // change to add sign in
        this.appendRecipes();
      } else {
        console.log( "HTTP error "+ request.status+" "+ request.statusText );
      }
    }.bind(this);
    request.send();
  },
  bindEvents: function() {
    this.recipesList.addEventListener('click', 
      function(e) {
      if(e.target.className.includes('check')){
        this.toggleFavorite(e.target);
      }
    }.bind(this), false);

    this.recipesList.addEventListener('click', function(e) {
      if (e.target.className.includes('rate')) {
        this.rate(e);
      };
    }.bind(this), false);
  },
  appendRecipes: function() {
    for (var i = this.recipes.length - 1; i >= 0; i--) {
      this.buildRecipe(this.recipes[i]);
    };
  },
  buildRecipe: function(recipe) {
    var template = Handlebars.compile(this.recipeTmp);
    // this is the one line of jquery I used. This is a built in functionality in angular so I thought it would be fair to use it here.
    $(this.recipesList).append(template(recipe));
  },
  toggleFavorite: function(target) {
    if(target.className.includes('like')) {
      target.className = 'check';
      target.innerText = 'favorite';
      // should be uncommented when hooked up to the backend
      // this.favorite(e);
    } else {
      target.className = 'like check';
      target.innerText = 'unFavorite';
      // should be uncommented when hooked up to the backend
      // this.favorite(e);
    }
  },
  // this methods would send an ajaxs call that would talk to server and toggle the favorite value that needs to be saved in order to have it reflected on reload.
  savFavorite: function(e) {
    var request = new XMLHttpRequest();
    var id = e.target.id;
    request.open('POST', '/recipes/' + id + '/favorite');
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        console.log( "success" );
      } else {
        console.log( "HTTP error "+ request.status+" "+ request.statusText );
      }
    }
  },
  rate: function(e) {
    var target = parseInt(e.target.name)
    var checkboxes = e.target.parentNode.children
    this.resetRate(checkboxes);
    this.setRate(checkboxes);
    // this method below would be uncommented and run to save the users rate of a recipe
    // this.saveRate(e.target.id);

  },
  setRate: function(checkboxes) {
    for (var i = 0; i < target; i++) {
      checkboxes[i].checked = true;
    };
  },
  resetRate: function(checkboxes) {
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    };
  },
  saveRate: function(id) {
    var request = new XMLHttpRequest();
    var id = e.target.nextElementSibling.id;
    request.open('POST', '/recipes/' + id + '/rate');
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        console.log( "success" );
      } else {
        console.log( "HTTP error "+ request.status+" "+ request.statusText );
      }
    }
  }
}