import React, { useState } from "react";
import { Room } from "@material-ui/icons";
import "./Register.css";

export default function Register() {
  const [success, setSuccess] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        TravelApp
      </div>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="registerBtn">Register</button>
        {success && ( <span className="success">Successfull. You can login now!</span>
        )}
        {error && (<span className="failure">Something went wrong!</span>)}
      </form>
    </div>
  );
}
