const express = require('express');
const app = express();
const { animals } = require('./data/animals');

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;

  if (query.personalityTraits) {
    // Personality traits saved to dedicated array
    // If personalityTraits is a string, placed into a new array 
    if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits
    }
    // Loops through each trait in the personalityTraits array
    personalityTraitsArray.forEach(trait=> {
      // check trait against each animal in the filteredResults array
        /* It is initially a copy of the animalsArray, 
          but here we're updating it for each trait in the .forEach() loop.
          For each trait being targeted by the filter, the filteredResults
          array will then contain only the enteries that contain the trait,
          so at the end it'll have an array of animals that have every one 
          of the traits when the .forEach() loop is finished.      
        */
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }

  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
}

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results =filterByQuery(req.query, results);
  }
  res.json(results);
})

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
})