import { ADD_NEW_COLUMN, UPDATE_COLUMN, DELETE_COLUMN,  FETCH_COLUMN, FETCH_COLUMNS, START_LOADING, END_LOADING } from '../actions/constants'

const column = (state = { isLoading: true, column: [] }, action) => {
  // console.log(action)
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case FETCH_COLUMN:
        return { ...state, column: action.payload.data };
      case FETCH_COLUMNS:
        return {
          ...state,
          columns: action.payload.client.data,
        };
      case ADD_NEW_COLUMN:
        return { ...state, column: [...state.column, action.payload] };
      case UPDATE_COLUMN:
        return { ...state, column: state.column.map((column) => (column._id === action.payload._id ? action.payload : column)) };
      case DELETE_COLUMN:
        return { ...state, column: state.column.filter((column) => column._id !== action.payload) };
      default:
        return state;
    }
  };

  export default column
