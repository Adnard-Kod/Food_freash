document.addEventListener('DOMContentLoaded', function(){
  function Recipes () {
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
          this.appendRecipe();
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
      // this is the one line of jquery I used. I just thinks templates are very powerful and to finish this project under four hours I think it was needed. If I had more time I would try to rewrite this method using just javascript. Sounds like a fun challenge. Who knows maybe is is a cope out because I did not want to createNode and createNodeText for every line of the json object. Anyways this is my reasoning for the line below. 

      $(this.recipesList).append(template(recipe))
    }
  };

  var myRecipes = new Recipes;
  myRecipes.load();
})