function App(){this.form=document.getElementById("signIn"),this.email=document.getElementById("password"),this.password=document.getElementById("email"),this.overlay=document.getElementById("overlay")}function Recipes(){this.recipesList=document.getElementById("recipesList"),this.recipeTmp=document.getElementById("recipe-tmp").innerHTML}function Users(a){this.users=a,this.users=a}document.addEventListener("DOMContentLoaded",function(){myRecipes=new Recipes,myRecipes.load();var a=new App;a.start()}),App.prototype={start:function(){this.form.addEventListener("submit",function(a){a.preventDefault(),this.signIn()===!0?this.desiplayRecipes():$("body").append("you fucked up")}.bind(this),!1)},signIn:function(){for(var a=myUsers.users.length-1;a>=0;a--){var b=myUsers.users[a].email;if(this.email.value===b&&"password"===this.password.value)return!0}},desiplayRecipes:function(){myRecipes.appendRecipes(),this.overlay.style.display="none"}},Recipes.prototype={load:function(){this.bindEvents();var a=new XMLHttpRequest;a.open("GET","../../recipes.json"),a.onreadystatechange=function(){4===a.readyState&&200===a.status?(this.recipes=JSON.parse(a.responseText),myUsers=new Users,myUsers.parse(this.recipes),this.appendRecipes()):console.log("HTTP error "+a.status+" "+a.statusText)}.bind(this),a.send()},bindEvents:function(){this.recipesList.addEventListener("click",function(a){a.target.className.includes("check")&&this.toggleFavorite(a.target)}.bind(this),!1),this.recipesList.addEventListener("click",function(a){a.target.className.includes("rate")&&this.rate(a)}.bind(this),!1)},appendRecipes:function(){for(var a=this.recipes.length-1;a>=0;a--)this.buildRecipe(this.recipes[a])},buildRecipe:function(a){var b=Handlebars.compile(this.recipeTmp);$(this.recipesList).append(b(a))},toggleFavorite:function(a){a.className.includes("like")?(a.className="check",a.innerText="favorite"):(a.className="like check",a.innerText="unFavorite")},savFavorite:function(a){var b=new XMLHttpRequest,c=a.target.id;b.open("POST","/recipes/"+c+"/favorite"),b.onreadystatechange=function(){4===b.readyState&&200===b.status?console.log("success"):console.log("HTTP error "+b.status+" "+b.statusText)}},rate:function(a){var b=parseInt(a.target.name),c=a.target.parentNode.children;this.resetCheckBoxes(c),this.saveRate(a.target.id);for(var d=0;b>d;d++)c[d].checked=!0},resetCheckBoxes:function(a){for(var b=0;b<a.length;b++)a[b].checked=!1},saveRate:function(a){var b=new XMLHttpRequest,a=e.target.nextElementSibling.id;b.open("POST","/recipes/"+a+"/rate"),b.onreadystatechange=function(){4===b.readyState&&200===b.status?console.log("success"):console.log("HTTP error "+b.status+" "+b.statusText)}}},Users.prototype={parse:function(a){for(var b=new Array,c=a.length-1;c>=0;c--)b.push(a[c].user);this.users=b}};