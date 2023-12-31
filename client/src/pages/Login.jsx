import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import swal from 'sweetalert2';


const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    let res
    e.preventDefault();
    try {
      res = await login(inputs);
    } catch (err) {
      setError(err.response.data);
    }
    
    if(res == undefined){
      swal.fire({
        title: "Success",
        text: "Login success",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500
        }).then(function () {
          navigate("/");
        });
    }else{
      swal.fire({
        title: "Failed",
        text: "Username or Password was wrong!",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
        <span>
          <Link to="/">Back to home</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
