import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction, updateUserAction } from "../store/action/userAction";

export default function RegisterFrom() {
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    values: {
      userName: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      email: "",
      type: "Client",
    },
    errors: {
      userName: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      email: "",
      type: "",
    },
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setForm({
      ...form,
      values: {
        ...form.values,
        [name]: value,
      },
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = event.target.checkValidity();
    console.log(isValid);

    if (!isValid) return;

    if (userState.selectedUsers) {
      dispatch(updateUserAction(form.values));
    } else {
      dispatch(addUserAction(form.values));
    }
  };

  const handleBlur = (event) => {
    const { name, validity, title, minLength, maxLength } = event.target;
    let message = "";
    const { valueMissing, tooLong, tooShort, patternMismatch } = validity;

    console.log(valueMissing);
    if (valueMissing) {
      message = `${title} cần nhập`;
    }

    if (tooShort || tooLong) {
      message = `${title} từ ${minLength}-${maxLength} ký tự`;
    }

    if (patternMismatch) {
      message = `${title} sai định dạng`;
    }
    if (patternMismatch && name === "password") {
      message = `${title} có ít nhất 1 ký tự thường, hoa và 1 ký tự đặc biệt`;
    }
    setForm({
      ...form,
      errors: {
        ...form.errors,
        [name]: message,
      },
    });
  };

  useEffect(() => {
    if (userState.selectedUsers) {
      setForm({
        values: userState.selectedUsers,
      });
    }
  }, [userState.selectedUsers]);

  return (
    <div className="card p-0">
      <div className="card-header bg-warning text-white font-weight-bold">
        REGISTER FORM
      </div>
      <div className="card-body">
        <form noValidate onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Username</label>
                <input
                  value={form.values.userName}
                  required
                  minLength={6}
                  maxLength={12}
                  onBlur={handleBlur}
                  title="Username"
                  name="userName"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{form.errors?.userName}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  value={form.values.fullName}
                  required
                  onBlur={handleBlur}
                  title="Full name"
                  name="fullName"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{form.errors?.fullName}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Password</label>
                <input
                  value={form.values.password}
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                  onBlur={handleBlur}
                  title="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                />
                <span className="text-danger">{form.errors?.password}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  value={form.values.phoneNumber}
                  required
                  onBlur={handleBlur}
                  title="Phone Number"
                  pattern="(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})"
                  name="phoneNumber"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{form.errors?.phoneNumber}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Email</label>
                <input
                  value={form.values.email}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  onBlur={handleBlur}
                  title="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                />
                <span className="text-danger">{form.errors?.email}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={form.values.type}
                  required
                  onBlur={handleBlur}
                  title="Type"
                  name="type"
                  onChange={handleChange}
                  className="form-control"
                >
                  <option>Client</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button className="btn btn-warning mr-2">SAVE</button>
            <button
              onClick={() => {
                setForm({
                  values: {
                    userName: "",
                    fullName: "",
                    password: "",
                    phoneNumber: "",
                    email: "",
                    type: "Client",
                  },
                });
              }}
              type="reset"
              className="btn btn-outline-dark"
            >
              RESET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
