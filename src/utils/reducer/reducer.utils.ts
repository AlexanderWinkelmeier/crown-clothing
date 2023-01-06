import { Action } from '@remix-run/router';
import { AnyAction } from 'redux';

// Datentyp Matchable: eine Erweiterung zu einem Action-Creator
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  // predicate function, die die action auf den ReturnType des Action-Creator einengt
  match(action: AnyAction): action is ReturnType<AC>;
};

// AC:
// ist der jeweilige Action-Creator, z.B. fetchCategory Start

// ReturnType<AC>:
// Datentyp, den der jeweilige Action-Creator zurückgibt, z.B. CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START

// ReturnType<AC>['type']:
// Datentyp, den der jeweilige Action-Creator bei 'type' zurückgibt --> return {type, payload}
// z.B. 'categories/FETCH_CATEGORIES_START'

// match()-Methode:
// ist eine Predicate-Funktion
// nimmt jegliche Action (AnyAction) entgegen und verengt dabei auf den
// ReturnType des ActionCreators, d.h. gibt immer nur diesen Datentyp zurück

// Funktionsweise diese Datentyps Matchable:
// vergleicht eine ankommende Action mit Action-Type und verengt den
// Datentyp der action auf den ReturnType des Action-Creators:
// ist quasi ein Filter, der nur actions vom Datentyp der Action-Creators durchlässt

// ?Funktions-Overloading: Typisierung der withMatcher-Funktion
// Action-Creator ohne Parameter
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// Action-Creator mit Parameter (...args: any[])
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// ? Basis-Funktion: die Implementation der withMatcher-Funktion

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type; // type des actionCreators
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

// nimmt die actionCreator-Funktion entgegen und returned dieselbe mit ihrem action.type
// andere Actions werden ausgefiltert
// Object.assign(target, ...quellen): wird verwendet, um die quellen mit dem target
// zu verschmelzen: Rückgabe ist das target
// hier: target: actionCreator
//       quelle: {
// type,
// match(action: AnyAction) {
//   return action.type === type;
// }

// generische Datentypen: Action mit Payload und Action ohne Payload
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// Typisierung der Funktion createAction und Function Overloading
// d.h. Erstellung von zwei generischen Funktionen
// ! Funktions-Deklaration
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

// die typisierte Funktion
// ! Funktions-Implementierung mit einem konkreten Objekt als Rückgabewert
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// typisierte Funktion, die aus type und payload ein Objekt mit den Properties type und payload erzeugt

// Die 3. Funktion ist so etwas wie die Basisfunktion, die verwendet werden soll. Die ersten beiden sind nur die Typen für die dritte Funktion. Anders ausgedrückt, die 3. Funktion kann entweder ActionWithPayload<T,P> oder einfach Action<T> zurückgeben.

// Die ersten beiden Funktionen sind quasi die beiden Schablonen für die eigentliche
// dritte Funktion.

// Der Aufruf der dritten Funktion erfolgt dann in categories.action.ts
