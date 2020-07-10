import React, { useState } from 'react';
import DataService from '../services/UserServices';
import { Link } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import LogoutError from './LogoutError';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function SignUp(props) {

    const selectStyle = {
        marginBottom:"2%", 
        marginLeft:"25%",
        width:"50%",
    };

    const buttonStyle = {
        marginTop:"2%",
        marginBottom:"2%", 
        marginLeft:"25%",
        width:"50%",
    };

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

    const saveData = event => {
        DataService.create(form)
            .then(response => {
                setSubmitted(true);
                console.log(response.data);
                const currentDate = new Date();
                console.log(currentDate);
                const uid = response.data.data.insertId;
                const initialDash = {
                    uid: uid,
                    eventDate: form.birthdate,
                    eventName: "Birthdate"
                };
                DataService.createDash(initialDash)
                    .then(response1 => {
                        console.log(response1);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                DataService.createDisplay({uid: uid, lastUpdate: currentDate})
                    .then(response2 => {
                        console.log(response2);
                    })
                    .catch(e => {
                        console.log(e);
                    })
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
        props.authenticated ? 

        <div>
            <LogoutError />
        </div> :

        <div>
          {submitted ? (
            <header className="notification">
              <h4>You signed up successfully!</h4>
              <Link to ="/login" className="btn btn-info">
                Login
              </Link>
            </header>
          ) : (
            <div className="page-form">
            
                <header>
                    <h2>Sign Up</h2>
                </header>

                <div className="form-group" style={selectStyle}>
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
        
                <div className="form-group" style={selectStyle}>
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

                <div className="form-group" style={selectStyle}>
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

                <div className="form-group" style={selectStyle}>
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

                <div className="form-group" style={selectStyle}>
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

                <div className="form-group" style={selectStyle}>
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

                <div className="form-group" style={selectStyle}>
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
        
                <button type="submit" style={buttonStyle} className="btn btn-info form-control" onClick={saveData}>
                    Submit
                </button>
                    
            </div>
            )}
        </div>
      );
};

export default lifecycle(methods)(SignUp);