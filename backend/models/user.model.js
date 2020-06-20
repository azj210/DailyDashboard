const sql = require("./db.js");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        fname: {
            type: Sequelize.STRING
        },
        lname: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATE
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
  
    return User;
};

/*
//constructor
//user model consists of uid, email, first name, last name, birthdate, city, state, and a hashed/salted password
const User = function(user) {
    this.uid = user.uid;
    this.email = user.email;
    this.fname = user.fname;
    this.lname = user.lname;
    this.birthdate = user.birthdate;
    this.city = user.city;
    this.state = user.state;
    this.password = user.password;
};

//call when new user account is created
User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }

    console.log("created user: ", { uid: res.insertuid, ...newUser });
    result(null, { id: res.insertuid, ...newUser });
    });
};

User.findByUID = (uid, result) => {
    sql.query(`SELECT * FROM users WHERE uid = ${uid}`, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }

    if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    console.log("users: ", res);
    result(null, res);
    });
};


User.updateById = (uid, user, result) => {
    sql.query(
    "UPDATE users SET fname = ?, active = ? WHERE id = ?",
    [uid, user.email, user.fname, user.lname, user.birthdate, user.city, user.state, user.password],
    (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
        }

        console.log("updated user: ", { uid: uid, ...user });
        result(null, { uid: uid, ...user });
    }
    );
};


//call when user deletes account
User.remove = (uid, result) => {
    sql.query("DELETE FROM users WHERE uid = ?", uid, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    if (res.affectedRows == 0) {
        // not found user
        result({ kind: "not_found" }, null);
        return;
    }

    console.log("deleted user with uid: ", id);
    result(null, res);
    });
};


module.exports = User;
*/