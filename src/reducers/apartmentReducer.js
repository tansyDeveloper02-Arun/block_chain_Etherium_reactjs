import {
  GET_APARTMENTS,
  APARTMENTS_LOADING
} from "../actions/types";

const initialState = {
  apartmentGrid: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APARTMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_APARTMENTS:
      return {
        ...state,
        apartmentGrid: action.payload.data,
        loading: true
      };
    default:
      return state;
  }
}
