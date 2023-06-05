import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../fonts/Triforce.ttf";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`/User/GetByEmail?email=${email}`);
    const foundUsers = await res.json();
    console.log({foundUsers})
    if (foundUsers) {
      const user = foundUsers;
      localStorage.setItem(
        "capstone_user",
        JSON.stringify({
          id: user.id,
        })
      );

      navigate("/");
    } else {
      console.log({foundUsers})
      window.alert("Invalid login");
    }
  };
  

  return (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Hyrule Hangout</h1>
          <h2>It's dangerous to go alone! Sign In</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
