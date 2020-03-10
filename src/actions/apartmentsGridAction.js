import axios from "axios";
import {
  GET_APARTMENTS,
  CLEAR_ERRORS
} from "./types";




export const fnApartmentGrid = (history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("https://tssflaskrestfulapis-twuhyuvm5a-de.a.run.app/api/lkp/city-area")
    .then(res => {
      dispatch(setGetAllInsertUpdateData(res));
      history.push("/home/lookup-company")
    })
    .catch(err => { console.log(err) });
};

//GetAllProfile
export const setGetAllInsertUpdateData = (CompanyDetails) => {
  return {
    type: GET_APARTMENTS,
    payload: CompanyDetails
  };
};
// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

