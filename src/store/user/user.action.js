import { createAction } from '../../utils/reducer/reducer.utils';
import { USER_ACTION_TYPES } from './user.types';

// ! Action-Creator, der ein Action-Objekt, bestehend aus dem Action-Type und der Action-Payload, erzeugt (createAction)

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
