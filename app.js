// IIFE Immediately invoked function Expressions
(async function () {
    const response = await fetch("./recipes.json");
    const recipes = await response.json();
    console.log(recipes)
    
  
    const inputElem = document.getElementById("searchInput");
    const btnElem = document.getElementById("searchBtn");
    const listElem = document.getElementById("recipe-list");
    const detailsElem = document.getElementById("recipeDetailsContainer");

    function loadRecipeDetails(recipe){
        detailsElem.innerHTML =`
        <h2 class="title"> ${recipe.title} </h2>
          <ul>
          ${recipe.ingredients.map(function(ingredient){ //ek ek krk ingredient lene kliye
            return `<li>${ingredient}</li>`
          }).join("")} //coma remove kre klye
          </ul>
          <h3>instruction</h3>
          <div>${recipe.instructions}</div>
         
        `
    }

    const displaySearchResults =(results)=>{ //array pe multiple tym kaam krwane kliye foreach use
        listElem.innerHTML="" //dobara search krne pe pehly waly res rmove
        results.forEach( (recipe)=> { //shortlist recipes of results
           const li = document.createElement("li")
           const listitem =`
           <h2 class="title"> ${recipe.title} </h2>
           <div class="description" > ${recipe.description} </div>
           `
           li.innerHTML = listitem

           li.addEventListener("click" , function(){
             loadRecipeDetails(recipe)
           })
           listElem.appendChild(li)
          });
    }
    
    function search() {
      const query = inputElem.value.toLowerCase(); //filter condition k according data store krta h nayearray me
       const results = recipes.filter(function(recipe){ //array k under filter se jo data aya osko ek ek krk de deta h
        return (recipe.title.toLowerCase().includes(query) || //wo dedo js k title  me query ho
        recipe.ingredients.join(" ").toLowerCase().includes(query))//qk ingredientarray ho osko string me convert krne kliye join use
    })
  
     displaySearchResults(results) // ye display waly func ko argumnt de d result ki
    }
  
    btnElem.addEventListener("click", search);
  })();
