import React, { useState } from 'react';
import SignUpDataService from "../services/UserServices"

const SignUp = () => {
    const initialFormState = {
        fName: "",
        lName: "",
        birthdate: "",
        email: "", 
        password: "",
        city: "",
        state: "",
    };

    const [form, setForm] = useState(initialFormState);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const saveData = () => {
        var data = {
            fName: form.fName,
            lName: form.lName,
            birthdate: form.birthdate,
            email: form.email, 
            password: form.password,
            city: form.city,
            state: form.state
        };

        SignUpDataService.create(data)
            .then(response => {
                setForm({
                    fName: response.data.fName,
                    lName: response.data.lName,
                    birthdate: response.data.birthdate,
                    email: response.data.email, 
                    password: response.data.password,
                    city: response.data.city,
                    state: response.data.state
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newSignUp = () => {
        setForm(initialFormState);
        setSubmitted(false);
    };

    /*
    return(
        <div>
            <header>
                <h2>Sign Up</h2>
            </header>
            <form action="/sign-up" method="post">
                <label for="fName">First Name</label>
                <input id="fName" name="fName" type="text" placeholder="John" value={form.fName} onChange={handleChange} required />

                <label for="lName">Last Name</label>
                <input id="lName" name="lName" type="text" placeholder="Smith" value={form.lName} onChange={handleChange} requried />

                <label for="email">Email(this will be your username)</label>
                <input id="email" name="email" type="email" placeholder="john.smith@gmail.com" value={form.email} onChange={handleChange} />

                <label for="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Password" value={form.pw} onChange={handleChange} />

                <label for="birthday">Birthdate</label>
                <input id="birthday" type="date" name="birthdate" className="form-control" value={form.birthdate} onChange={handleChange} />

                <label for="city">City</label>
                <input id="city" name="city" type="text" placeholder="Los Angeles" value={form.city} onChange={handleChange} required />

                <label for="state">State</label>
                <input id="state" name="state" type="text" placeholder="California" value={form.state} onChange={handleChange} requied />
                
                <button onClick ={saveData} type="submit">Submit</button>
            </form>
        </div>
    );
    */

    return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newSignUp}>
                Add
              </button>
            </div>
          ) : (
            <div style={{margin: 20}}>

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
    
                <button onClick={saveData} className="btn btn-success">
                    Submit
                </button>
                
            </div>
          )}
        </div>
      );
};

export default SignUp;