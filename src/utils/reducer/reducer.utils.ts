import { match } from 'assert';
import { AnyAction } from 'redux';

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
};

// AC:
// ist der jeweilige Action-Creator, d.h. eine Funktion die AnyAction zurückgibt

// ReturnType<AC>:
// Datentyp, den der jeweilige Action-Creator zurückgibt --> return { type, payload }; siehe unten

// ReturnType<AC>['type']:
// Datentyp, den der jeweilige Action-Creator bei 'type' zurückgibt --> return {type, payload}

// match()-Methode:
// nimmt jegliche Action (AnyAction) entgegen, kann aber nur vom
// ReturnType des ActionCreators sein
// ist eine Predicate-Funktion, die nur true oder false zurückgibt

// Funktionsweise diese Datentyps Matchable:
// vergleicht eine ankommende Action mit Action-Type und verengt den
// Datentyp der action auf den ReturnType des Action-Creators:
// ist quasi ein Filter, der nur actions vom Datentyp der Action-Creators durchlässt

// ?Funktions-Overloading
// Action-Creator ohne Parameter
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// Action-Creator mit Parameter
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// ? Basis-Funktion: die Implementation

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

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
