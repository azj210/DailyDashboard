import React, { useState } from 'react';

function SignUp() {
    
    const [form, setForm] = useState({
        fName: "",
        lName: "",
        bDay: {month: "", day: "", year: ""},
        email: "", 
        pw: "",
        city: "",
        state: "",
        uID: ""
    });

    function handleChange(event) {
        const { value, name } = event.target;
        setForm(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };

    return(
        <div>
            <header>
                <h2>Sign Up</h2>
            </header>
            <form>
                <label for="fName">First Name</label>
                <input id="fName" name="fName" type="text" placeholder="John" value={form.fName} onChange={handleChange} required />
                <label for="lName">Last Name</label>
                <input id="lName" name="lName" type="text" placeholder="Smith" value={form.lName} onChange={handleChange} requried />
                <label for="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <label for="pw">Password</label>
                <input id="pw" name="pw" type="password" placeholder="Password" value={form.pw} onChange={handleChange} />
                <fieldset>
                    <legend>Birthday</legend>
                    <select id="month" name="month" placeholder="Month">
                        <option></option>
                    </select>
                    <select id="day" name="day" placeholder="Day">
                        <option></option>
                    </select>
                    <select id="year" name="year" placeholder="Year">
                        <option></option>
                    </select>
                </fieldset>

                <label for="city">City</label>
                <input id="city" name="city" type="text" placeholder="Los Angeles" value={form.city} onChange={handleChange} required />
                <label for="state">State</label>
                <input id="state" name="state" type="text" placeholder="California" value={form.state} onChange={handleChange} requied />
                
            </form>
        </div>
    );
};

export default SignUp;