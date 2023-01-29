import {
  DELETE_USER,
  SAVE_USER,
  SET_USER,
  UPDATE_USER,
} from "../type/userType";

export const addUserAction = (payload) => {
  return {
    type: SAVE_USER,
    payload,
  };
};

export const updateUserAction = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const deleteUserAction = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};

export const setUserAction = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};
