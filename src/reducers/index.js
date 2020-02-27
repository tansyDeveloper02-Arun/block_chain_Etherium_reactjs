import { combineReducers } from "redux";
import apartmentReducer from "./apartmentReducer";


export default combineReducers({
  apartment: apartmentReducer
});
