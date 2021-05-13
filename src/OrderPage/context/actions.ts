// WHY IS ENUM GIVING A ERROR

import moment from 'moment';

export type ACTIONTYPE =
  | { type: 'changeTab'; payload: number }
  | { type: 'toggleStorePickUp' }
  | { type: "changeDate"; payload: moment.Moment };

// enum ActionTypes {
//   changeTab
// };

export type Action = {
  type: string,
  // need to add better typechecking for payload
  payload: any
}
