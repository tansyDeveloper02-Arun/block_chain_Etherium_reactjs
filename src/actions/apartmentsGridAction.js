import axios from "axios";
import {
  GET_APARTMENTS,
  CLEAR_ERRORS
} from "./types";




export const fnApartmentGrid = (userData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("https://55wqpnop60.execute-api.us-east-1.amazonaws.com/latest/apl-lookup-admin-company-post-update", userData)
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

