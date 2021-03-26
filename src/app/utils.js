/**
 * Here you can define helper functions to use across your app.
 */

export const delay = async (time) => {
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export const getPlanetWithZeroPopulation = async () => {
  let planet;
  let response = await fetch('https://swapi.booost.bg/api/planets/');

  let data = await response.json();
  const count = data.count;

  for (let i = 1; i <= count; i++) {
    response = await fetch(`https://swapi.booost.bg/api/planets/${i}`);

    data = await response.json();

    if (Number(data.population) === 0) {
      planet = data;
    }
  }
  //   console.log(planet);
  //   planets.push(data);
  //   while (data.next) {
  //     response = await fetch(`${data.next}`);

  //     data = await response.json();
  //     planets.push(data);
  //   }
  //   const planetsCollection = planets.map((x) => x.results.map((c) => c)).flat();

  //   return planetsCollection.filter((x) => Number(x.population) === 0)[0];

  return planet;
};

export const getFirstTenPeople = async () => {
  let firstTenPeople = [];

  for (let i = 1; i <= 10; i++) {
    const response = await fetch(`https://swapi.booost.bg/api/people/${i}/`);
    const data = await response.json();

    firstTenPeople.push(data);
  }

  return firstTenPeople;
};
