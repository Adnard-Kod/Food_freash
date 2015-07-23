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
      target.className = 'check'
      target.innerText = 'favorite'
    } else {
      target.className = 'like check'
      target.innerText = 'unFavorite'
    }
  }
};