
import { FETCH_ALL, ADD_NEW, UPDATE, DELETE, GET_PRODUCT, START_LOADING, END_LOADING, FETCH_PRODUCT_BY_USER } from '../actions/constants'

const products = (state = { isLoading: true, products: [] }, action) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case FETCH_ALL:
        return {
          ...state,
          products: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_PRODUCT_BY_USER:
        return { ...state, products: action.payload };

      case GET_PRODUCT:
        return { ...state, product: action.payload };
      case ADD_NEW:
        return { ...state, products: [...state.products, action.payload] };
      case UPDATE:
        return { ...state, products: state.products.map((product) => (product._id === action.payload._id ? action.payload : product)) };
      case DELETE:
        return { ...state, products: state.products.filter((product) => product._id !== action.payload) };
      default:
        return state;
    }
  };

  export default products
