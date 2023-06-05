import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
  });
  const navigate = useNavigate();


  const registerNewUser = () => {
    const requestBody = {
      Email: user.email,
      FullName: user.fullName,
    };
  
    return fetch("user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "capstone_user",
            JSON.stringify({
              id: createdUser.id,
              fullName: user.fullName,
            })
          );
          navigate("/");
        }
      });
  };
  
  
  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:7248/api/User/${user.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length === 0) {
          // Good email, create user.
          registerNewUser();
        } else {
          // Duplicate email. No good.
          window.alert("Account with that email address already exists");
        }
      });
  };
  
  

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Your Destiny Awaits</h1>
        <fieldset>
          <label htmlFor="fullName"> Full Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="fullName"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  );
};
