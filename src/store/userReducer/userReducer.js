import {
  DELETE_USER,
  SAVE_USER,
  SET_USER,
  UPDATE_USER,
} from "../type/userType";
const DEFAULT_STATE = {
  userList: [
    {
      id: 1,
      userName: "ThanhDat",
      fullName: "CaoThanhDat",
      password: "123",
      phoneNumber: "1231654",
      email: "dat@gmail.com",
      type: "Client",
    },
    {
      id: 2,
      userName: "CamThuyen",
      fullName: "NguyenNgocCamThuyen",
      password: "123",
      phoneNumber: "1231654",
      email: "CamThuyen@gmail.com",
      type: "Admin",
    },
  ],
  selectedUsers: null,
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SAVE_USER:
      {
        const data = state.userList;
        const idx = data.findIndex((ele) => ele.email === payload.email);
        if (idx !== -1) {
          alert("Email đã tồn tại");
          return;
        }
        data.push({ ...payload, id: Date.now() });
        state.userList = data;
      }
      break;
    case DELETE_USER:
      {
        const data = state.userList;
        const idx = data.findIndex((ele) => ele.id === payload.id);

        data.splice(idx, 1);
        state.userList = data;
      }
      break;

    case SET_USER:
      state.selectedUsers = payload;
      break;
    case UPDATE_USER:
      {
        const data = state.userList;
        const idx = data.findIndex((ele) => ele.id === payload.id);

        data[idx] = payload;

        state.userList = data;
        state.selectedUsers = null;
      }
      break;

    default:
      break;
  }

  return { ...state };
};
