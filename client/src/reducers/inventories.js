
import { FETCH_ALL, ADD_NEW, UPDATE, DELETE, GET_INVENTORY, START_LOADING, END_LOADING, FETCH_INVENTORY_BY_USER } from '../actions/constants'

const inventories = (state = { isLoading: true, inventories: [] }, action) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case FETCH_ALL:
        return {
          ...state,
          inventories: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_INVENTORY_BY_USER:
        return { ...state, inventories: action.payload };

      case GET_INVENTORY:
        return { ...state, inventory: action.payload };
      case ADD_NEW:
        return { ...state, inventories: [...state.inventories, action.payload] };
      case UPDATE:
        return { ...state, inventories: state.inventories.map((inventory) => (inventory._id === action.payload._id ? action.payload : inventory)) };
      case DELETE:
        return { ...state, inventories: state.inventories.filter((inventory) => inventory._id !== action.payload) };
      default:
        return state;
    }
  };

  export default inventories
