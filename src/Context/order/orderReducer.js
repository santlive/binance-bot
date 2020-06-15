import {
  ADD_ORDER,
  DEL_ORDER,
  LOAD_TICKSTATIC,
  LOAD_ORDERS,
  UPDATE_ORDER,
} from '../types';

const orderSort = (a, b) => b.openTS - a.openTS;

export default (state, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders].sort(orderSort),
      };
    case DEL_ORDER:
      return {
        ...state,
        orders: state.orders
          .filter((o) => o.orderID !== action.payload)
          .sort(orderSort),
      };
    case LOAD_TICKSTATIC:
      return { ...state, tickStatic: { ...action.payload } };
    case LOAD_ORDERS:
      return { ...state, orders: [...action.payload].sort(orderSort) };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders
          .map((d) =>
            d.orderID === action.payload.orderID ? action.payload : d
          )
          .sort(orderSort),
      };
    default:
      return { ...state };
  }
};
