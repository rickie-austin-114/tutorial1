/* I declare that the lab work here submitted is original 
except for source material explicitly acknowledged,
and that the same or closely related material has not been 
previously submitted for another course.
I also acknowledge that I am aware of University policy and 
regulations on honesty in academic work, and of the disciplinary 
guidelines and procedures applicable to breaches of such
policy and regulations, as contained in the website.

University Guideline on Academic Honesty: 
https://www.cuhk.edu.hk/policy/academichonesty/

Student Name : Liu Man Yin
Student ID : 1155159567
Student Name : Li Tsz Kin 
Student ID: 1155158177 
Student Name : Cheung Mei Yi 
Student ID : 1155159106 
Student Name : Ho Yun Kit 
Student ID : 1155158328 
Student Name : AU Yeuk Lai Rickie 
Student ID : 1155143101

Class/Section : CSCI2720
Date : 15/12/2023 */
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import "./loginScript.js";

const Login = () => {
  const [status, setStatus] = useState(0);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [input, setInput] = useState("");
  const [res, setRes] = useState("");

  signIn = () => {
    setInput(`{"user": "${user}", "password": "${password}"}`);
    const fetchLoginData = () => {
      fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(input),
      })
        .then((response) => {
          setStatus(response.status);
          return response.json();
        })
        .then((data) => {
          if (status === 200) {
            setRes(JSON.stringify(data));
            document.cookie = `username=${res.username}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `jwt=${res.JWT}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          } else if (status === 403) {
            document.getElementById("errorMessage").innerText =
              "Incorrect username or password";
          }
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    };
    fetchLoginData();
  };

  passwordSignIn = () => {
    setUser(document.getElementById("user"));
    setPassword(document.getElementById("password"));
    if (user === "") {
      alert("Invalid input, please type it again!");
      return;
    }
    if (password === "") {
      alert("Invalid input, please type it again!");
      return;
    }
    signIn();
  };

  oauthSignIn = () => {
    setUser(email);
    setPassword("googlehdfe");
    signIn();
  };

  return (
    <div>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <div class="container p-10 my-10 border bg-info">
        <div class="container p-5 my-5 border bg-white">
          <h1>User login</h1>
          <h2 id="errorMessage"></h2>
          <form
            action="https://localhost:3000/login"
            method="POST"
            id="loginform"
          >
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <br />
            <div class="g-signin2" data-onsuccess={oauthSignIn()}></div>
            <button onClick={passwordSignIn()}></button>
            <i class="bi bi-file-person"></i>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
