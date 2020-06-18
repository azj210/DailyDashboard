import React, { useState } from 'react';

function SignUp() {
    
    const [form, setForm] = useState({
        fName: "",
        lName: "",
        birthday: "",
        email: "", 
        password: "",
        city: "",
        state: "",
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
            <form action="/sign-up" method="post">
                <label for="fName">First Name</label>
                <input id="fName" name="fName" type="text" placeholder="John" value={form.fName} onChange={handleChange} required />

                <label for="lName">Last Name</label>
                <input id="lName" name="lName" type="text" placeholder="Smith" value={form.lName} onChange={handleChange} requried />

                <label for="email">Email(this will be your username)</label>
                <input id="email" name="email" type="email" placeholder="john.smith@gmail.com" value={form.email} onChange={handleChange} />

                <label for="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Password" value={form.pw} onChange={handleChange} />

                <label for="birthday">Birthday</label>
                <input id="birthday" type="date" name="birthday" value={form.birthday} />

                <label for="city">City</label>
                <input id="city" name="city" type="text" placeholder="Los Angeles" value={form.city} onChange={handleChange} required />

                <label for="state">State</label>
                <input id="state" name="state" type="text" placeholder="California" value={form.state} onChange={handleChange} requied />
            </form>
        </div>
    );
};

export default SignUp;