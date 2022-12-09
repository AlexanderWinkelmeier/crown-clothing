import { createAction } from '../../utils/reducer/reducer.utils';
import { USER_ACTION_TYPES } from './user.types';

// Action-Creator
export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

// Funktion, die einen User als Parameter enthält und eine Funktion zurückgibt, die seinerseits ein Objekt zurückgibt,
// das den Action-Type "SET_CURRENT_USER" und die payload "user" enthält
