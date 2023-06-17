import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    userName: "",
  });
  const [existingUsers, setExistingUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://localhost:7248/api/User");
      const userData = await response.json();
      setExistingUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const registerNewUser = async () => {
    const requestBody = {
      email: user.email,
      userName: user.userName,
    };

    try {
      const response = await fetch("https://localhost:7248/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const createdUser = await response.json();
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "capstone_user",
            JSON.stringify({
              id: createdUser.id,
              fullName: user.userName,
            })
          );
          navigate("/");
        }
      } else {
        console.error("Failed to create user:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (user.email.trim() === "" || user.userName.trim() === "") {
      window.alert("Please enter your name and email address.");
      return;
    }

    const duplicateUser = existingUsers.find(
      (existingUser) => existingUser.email === user.email
    );
    if (duplicateUser) {
      window.alert("An account with that email address already exists.");
      return;
    }

    registerNewUser();
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
          <label htmlFor="userName">Full Name</label>
          <input
            onChange={updateUser}
            type="text"
            id="userName"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email address</label>
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
          <button type="submit">Register</button>
        </fieldset>
      </form>
    </main>
  );
};
