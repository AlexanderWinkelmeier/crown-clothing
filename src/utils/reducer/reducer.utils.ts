import { AnyAction } from 'redux';

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
};

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
