'use strict';

const fieldSearch = document.getElementById('search');
const btnSearch = document.querySelector('.search-btn');
const headingEl = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const btnRandom = document.getElementById('random');
const singleMealEl = document.getElementById('single-meal');

btnSearch.addEventListener('click', searchMeal);

btnRandom.addEventListener('click', function (e) {
  e.preventDefault();

  singleMealEl.innerHTML = '';
  mealsEl.innerHTML = '';
  headingEl.innerHTML = '';

  const myMeals = getRandomMeal();

  myMeals.then((meals) => {
    if (meals['meals'] === null) {
      notFoundMsg();
      return '';
    }

    showRecipe(meals);
  });
});

document.addEventListener('click', function (e) {
  //if (e.target.className === 'meal-info') {
  if (e.target.classList.contains('meal-info')) {
    singleMealEl.innerHTML = '';
    const theMeal = getMealById(e.target.getAttribute('data-mealid'));

    theMeal.then((meal) => {
      showRecipe(meal);
    });
  }
});

function searchMeal(e) {
  e.preventDefault();

  //Clear UI
  singleMealEl.innerHTML = '';
  mealsEl.innerHTML = '';
  headingEl.innerHTML = '';

  const keyword = fieldSearch.value;

  if (keyword === '') {
    alert('Please enter a search term');
    return;
  }

  const myMeals = getMealByName(keyword);

  myMeals.then((data) => {
    //if (meals['meals'] === null) {
    if (data.meals === null) {
      notFoundMsg();
      return '';
    }

    showHeader(keyword);
    showMeals(data);
  });
}

function notFoundMsg() {
  headingEl.innerHTML = '<p>There are no search results. Try again!</p>';
}

function showMeals(meals) {
  meals['meals'].forEach((meal) => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal');
    const markUpMeal = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="meal-info" data-mealid="${meal.idMeal}">
      <h3>${meal.strMeal}</h3>
      </div>
      `;
    mealDiv.innerHTML = markUpMeal;
    mealsEl.appendChild(mealDiv);
    fieldSearch.value = '';
  });
}

function showRecipe(meal) {
  const mymeal = meal['meals'][0];
  const mealDiv = document.createElement('div');
  mealDiv.classList.add('single-meal');

  let finalIng = extractIngredients(mymeal);

  const markUpRecipe = `
              <h1>${mymeal.strMeal}</h1>
              <img src="${mymeal.strMealThumb}" alt="${mymeal.strMeal}">
              <div class="single-meal-info">
                <p>${mymeal.strCategory}</p>
                <p>${mymeal.strArea}</p>
              </div>
              <div class="main">
                <p>${mymeal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                ${finalIng
                  .map((ing) => {
                    return `<li>${ing}</li>`;
                  })
                  .join('')}
                  
                </ul>
              </div>

  `;
  mealDiv.innerHTML = markUpRecipe;

  singleMealEl.appendChild(mealDiv);
}

function extractIngredients(meals) {
  let ingredients = [];
  let measures = [];
  for (const key in meals) {
    if (key.includes('strIngredient') && meals[key] !== '') {
      ingredients.push(meals[key]);
    }
    if (key.includes('strMeasure') && meals[key] !== '') {
      measures.push(meals[key]);
    }
  }

  let finalIng = [];

  for (let i = 0; i < ingredients.length - 1; i++) {
    finalIng.push(`${ingredients[i]} - ${measures[i]}`);
  }
  return finalIng;
}

function showHeader(keyword) {
  headingEl.innerHTML = `<h2>Search results for '${keyword}':</h2>`;
}

async function getMealByName(name) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
async function getMealById(id) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
async function getRandomMeal() {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
