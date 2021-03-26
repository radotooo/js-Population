import EventEmitter from 'eventemitter3';
import Person from './Person';

import { delay } from '../utils';

const EVENTS = {
  PERSON_BORN: 'person_born',
  POPULATING_COMPLETED: 'populating_completed',
};

export default class Planet extends EventEmitter {
  constructor(name, config, peopleData) {
    super();
    this.name = name;
    this.config = config;
    this.peopleData = peopleData;
    this.population = [];
  }

  static get events() {
    return EVENTS;
  }

  get populationCount() {
    return this.population.length;
  }

  async populate() {
    if (this.peopleData.length === 0) {
      this.emit(Planet.events.POPULATING_COMPLETED);

      return;
    }
    await delay(this.config.populationDelay);
    const people = this.peopleData.shift();
    const person = new Person(people.name, people.height, people.mass);

    this.population.push(person);
    this.emit(Planet.events.PERSON_BORN, { filmUrls: people.films });

    this.populate();
  }
}
