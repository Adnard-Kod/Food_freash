function Recipes () {
  this.recipes = null;
  this.recipesList = document.getElementById('recipesList');
  this.recipeTmp = document.getElementById('recipe-tmp').innerHTML;
}

Recipes.prototype =  {
  load: function() {
    var request = new XMLHttpRequest();
    request.open('GET', '../../recipes.json');
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        this.recipes = JSON.parse(request.responseText);
        myUsers = new Users;
        myUsers.parse(this.recipes)
      } else {
        console.log( "HTTP error "+ request.status+" "+ request.statusText )
      }
    }.bind(this)
    request.send();
  },
  appendRecipe: function() {
    for (var i = this.recipes.length - 1; i >= 0; i--) {
      this.buildRecipe(this.recipes[i])
    };
  },
  buildRecipe: function(recipe) {
    var template = Handlebars.compile(this.recipeTmp)
    // this is the one line of jquery I used. This is a built in functionality in angular so I thought it would be fair to use it here.
    $(this.recipesList).append(template(recipe))
  }
};