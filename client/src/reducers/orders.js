
import { FETCH_ALL, ADD_NEW, UPDATE, DELETE, GET_ORDER, START_LOADING, END_LOADING, FETCH_ORDER_BY_USER } from '../actions/constants'

const orders = (state = { isLoading: true, orders: [] }, action) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case FETCH_ALL:
        return {
          ...state,
          orders: action.payload,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_ORDER_BY_USER:
        return { ...state, orders: action.payload };

      case GET_ORDER:
        return { ...state, order: action.payload };
      case ADD_NEW:
        return { ...state, orders: [...state.orders, action.payload] };
      case UPDATE:
        return { ...state, orders: state.orders.map((order) => (order._id === action.payload._id ? action.payload : order)) };
      case DELETE:
        return { ...state, orders: state.orders.filter((order) => order._id !== action.payload) };
      default:
        return state;
    }
  };

  export default orders
