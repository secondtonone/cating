import { createStore, createEffect, createEvent, forward, sample } from 'effector';
import { useStore, createGate, useGate } from 'effector-react';
import { produce } from 'immer';
import type { Person } from '@/shared';
import { persons } from '@/__fixtures__';

export const removeLast = createEvent();
export const PersonGate = createGate();

export const getPersonListFx = createEffect(() => {
  return Promise.resolve(persons);
});

const personsInitialState: Person[] = [];

export const $persons = createStore<Person[]>(personsInitialState)
  .on(getPersonListFx.doneData, (state, payload) => ([
    ...state,
    ...payload
  ]))
  .on(
    removeLast,
    (state) => produce(state, (draft) => {
      draft.pop();
    })
  );

export const $lastInPerson = $persons.map((persons) => persons.length === 1);

export const init = () => {
  sample({
    source: {
      lastInPerson: $lastInPerson,
    },
    clock: removeLast,
    filter: ({ lastInPerson }) => lastInPerson,
    target: getPersonListFx
  })

  forward({from: PersonGate.state, to: getPersonListFx})

  $persons.reset(PersonGate.close);
};

const usePersons = (): Person[] => useStore($persons);

const usePersonsGate = () => useGate(PersonGate);


export const events = {
  removeLast
};

export const gates = {
  usePersonsGate
};

export const effects = {
  getPersonListFx
};

export const selectors = {
  usePersons
};
