import EventEmitter from 'eventemitter3';
import { getPlanetWithZeroPopulation, getFirstTenPeople } from '../utils';
import Planet from './Planet';
import Film from './Film';

const EVENTS = {
  FILM_ADDED: 'film_added',
  UNIVERSE_POPULATED: 'universe_populated',
};

export default class StarWarsUniverse extends EventEmitter {
  constructor() {
    super();

    this.films = [1, 2, 3, 4, 5, 6];
    this.planet = null;
  }

  static get events() {
    return EVENTS;
  }

  _onPersonBorn(data) {
    const films = this.films.map((x) => x.url);

    for (const url in data.filmUrls) {
      const movieUrl = data.filmUrls[url];

      if (!films.includes(movieUrl)) {
        this.films.push(new Film(movieUrl));
        this.emit(StarWarsUniverse.events.FILM_ADDED);
      }
    }
  }

  _onPopulationCompleted() {
    this.emit(StarWarsUniverse.events.UNIVERSE_POPULATED);
  }

  async init() {
    const zeroPopulationPlanet = await getPlanetWithZeroPopulation();

    const firstTenPeople = await getFirstTenPeople();

    const planet = new Planet(
      zeroPopulationPlanet.name,
      { populationDelay: 1 },
      firstTenPeople
    );

    this.planet = planet;
    this.planet.on(Planet.events.PERSON_BORN, (data) =>
      this._onPersonBorn(data)
    );
    this.planet.on(Planet.events.POPULATING_COMPLETED, () =>
      this._onPopulationCompleted()
    );

    this.planet.populate();
  }
}
