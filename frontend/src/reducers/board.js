
import { ADD_NEW_BOARD, UPDATE_BOARD, DELETE_BOARD,  FETCH_BOARD, FETCH_BOARDS, START_LOADING, END_LOADING } from '../actions/constants'

const board = (state = { isLoading: true, board: [] }, action) => {
  // console.log(action)
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case FETCH_BOARD:
        return { ...state, board: action.payload.client.data };
      case FETCH_BOARDS:
        return {
          ...state,
          boards: action.payload.client.data,
        };
      case ADD_NEW_BOARD:
        return { ...state, board: [...state.board, action.payload] };
      case UPDATE_BOARD:
        return { ...state, board: state.board.map((board) => (board._id === action.payload._id ? action.payload : board)) };
      case DELETE_BOARD:
        return { ...state, board: state.board.filter((board) => board._id !== action.payload) };
      default:
        return state;
    }
  };

  export default board
