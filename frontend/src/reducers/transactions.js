import { FETCH_ALL, ADD_NEW, UPDATE, DELETE, GET_TRANSACTION, START_LOADING, END_LOADING, FETCH_TRANSACTION_BY_USER } from '../actions/constants'

const transactions = (state = { isLoading: true, transactions: [] }, action) => {
  // console.log(state)
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case FETCH_ALL:
        return {
          ...state,
          transactions: action.payload.data,
          // currentPage: action.payload.currentPage,
          // numberOfPages: action.payload.numberOfPages,
        };

      case GET_TRANSACTION:
        return { ...state, transaction: action.payload };
      case ADD_NEW:
        return { ...state, transactions: [...state.transactions, action.payload] };
      case UPDATE:
        return { ...state, transactions: state.transactions.map((transaction) => (transaction._id === action.payload._id ? action.payload : transaction)) };
      case DELETE:
        return { ...state, transactions: state.transactions.filter((transaction) => transaction._id !== action.payload) };
      default:
        return state;
    }
  };

  export default transactions
