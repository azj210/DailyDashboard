import React, { useState } from "react";
import LogInDataService from "../services/UserServices";

function Login() {
  //   const [loginInfo, setLoginInfo] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   function handleChange(event) {
  //     const { value, name } = event.target;
  //     setLoginInfo((prevValue) => {
  //       return {
  //         ...prevValue,
  //         [name]: value,
  //       };
  //     });
  //   }

  const initialFormState = {
    email: "",
    password: "",
    message: "",
  };

  const [form, setForm] = useState({ initialFormState });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const saveData = (event) => {
    event.preventDefault();
    var data = {
      email: form.email,
      password: form.password,
    };

    LogInDataService.login(data)
      .then((response) => {
        setForm({
          email: response.data.email,
          password: response.data.password,
          message: response.data.message || response.data.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <header>
        <h2>Login</h2>
        <form style={{ margin: 20 }} onSubmit={saveData}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={form.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={form.password}
              onChange={handleChange}
              name="password"
            />
          </div>

          <div>{form.message}</div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default Login;
