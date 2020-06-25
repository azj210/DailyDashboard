import React, { useState } from 'react';
import DataService from '../services/UserServices';
import { Link, Route } from 'react-router-dom';

function SignUp() {

    const initialFormState= {
        fName: "",
        lName: "",
        birthdate: "",
        email: "", 
        password: "",
        city: "",
        state: ""
    };
    
    const [form, setForm] = useState({initialFormState});
    
    const [submitted, setSubmitted] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const saveData = (event) => {
        // var data = {
        //     fName: form.fName,
        //     lName: form.lName,
        //     birthdate: form.birthdate,
        //     email: form.email, 
        //     password: form.password,
        //     city: form.city,
        //     state: form.state
        // };

        DataService.create(form)
            .then(response => {
                // setForm({
                //     fName: response.data.fName,
                //     lName: response.data.lName,
                //     birthdate: response.data.birthdate,
                //     email: response.data.email, 
                //     password: response.data.password,
                //     city: response.data.city,
                //     state: response.data.state
                // });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

            event.preventDefault();
    };

    const newSignUp = () => {
        setForm(initialFormState);
        setSubmitted(false);
    };

    return (
        <div>
          {submitted ? (
            <header className="notification">
              <h4>You signed up successfully!</h4>
              <button className="btn btn-success" onClick={newSignUp}>
                Add Another User
              </button>
              <Link to ="/login" className="btn btn-info">
                Login
              </Link>
            </header>
          ) : (
            <div className="page-form">
            
                <header>
                    <h2>Sign Up</h2>
                </header>

                <div className="form-group">
                    <label htmlFor="fName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fName"
                        required
                        value={form.fName}
                        onChange={handleChange}
                        name="fName"
                    />
                </div>
        
                <div className="form-group">
                    <label htmlFor="lName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lName"
                        required
                        value={form.lName}
                        onChange={handleChange}
                        name="lName"
                    />
                </div>

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

                <div className="form-group">
                    <label htmlFor="birthdate">Birthdate</label>
                    <input
                        type="date"
                        className="form-control"
                        id="birthdate"
                        required
                        value={form.birthdate}
                        onChange={handleChange}
                        name="birthdate"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                        name="city"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        required
                        value={form.state}
                        onChange={handleChange}
                        name="state"
                    />
                </div>
        
                <button type="submit" className="btn btn-info form-control" onClick={saveData}>
                    Submit
                </button>
                    
            </div>
            )}
        </div>
      );
};

export default SignUp;