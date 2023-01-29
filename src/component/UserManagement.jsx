import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, setUserAction } from "../store/action/userAction";

export default function UserManagement() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  const handleDelete = (user) => {
    dispatch(deleteUserAction(user));
  };

  const handleSetUser = (user) => {
    dispatch(setUserAction(user));
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const renderUser = () => {
    const filterUser = userState.userList.filter((ele) => {
      return ele.fullName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });
    return filterUser.map((ele, idx) => {
      return (
        <tr key={ele.id} className={idx % 2 === 0 ? "bg-light" : undefined}>
          <td>{idx + 1}</td>
          <td>{ele.userName}</td>
          <td>{ele.fullName}</td>
          <td>{ele.email}</td>
          <td>{ele.phoneNumber}</td>
          <td>{ele.type}</td>
          <td>
            <button
              onClick={() => handleSetUser(ele)}
              className="btn btn-info mr-2"
            >
              EDIT
            </button>
            <button
              onClick={() => handleDelete(ele)}
              className="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="card p-0 mt-3">
      <div className="card-header font-weight-bold">USER MANAGEMENT</div>
      <div className="row mt-4 px-3 ">
        <div className="col-4">
          <div className="form-group mb-0">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search by full name..."
              className="form-control"
            />
          </div>
        </div>
        <div className="col-3 ml-auto">
          <div className="form-group mb-0">
            <select className="form-control">
              <option>All</option>
              <option>Client</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderUser()}</tbody>
        </table>
      </div>
    </div>
  );
}
