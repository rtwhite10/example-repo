import moment from 'moment';
import { ACTIONTYPE } from './actions';

type ContextProps = {
  tabIndex: number;
  storePickUp: boolean;
  deliveryDate: moment.Moment;
  handleTabChangeIndex: (arg0: number) => void;
  handleStorePickUp: () => void;
  handleDateChange: (date: moment.Moment | null) => void;
}

export const localState: ContextProps = {
  tabIndex: 0,
  storePickUp: false,
  deliveryDate: moment(),
  handleTabChangeIndex() {},
  handleStorePickUp() {},
  handleDateChange() {}
};

export default function reducer(state: typeof localState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'changeTab':
      return {
        ...state,
        tabIndex: action.payload
      };
    case 'toggleStorePickUp':
      return {
        ...state,
        storePickUp: !state.storePickUp
      };
    case 'changeDate':
      return {
        ...state,
        deliveryDate: action.payload
      };
    default:
      return state;
  }
}
