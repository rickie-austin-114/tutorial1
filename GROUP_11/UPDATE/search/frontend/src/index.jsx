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
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Favourite from "./components/favourite/Favourite";
import Search from "./components/search/Search";
import UserLogin from "./components/authentications/UserLogin";
// import SingleMap from "./components/SingleMap/SingleMap";
import Table from "./components/table/Table";
import Event from "./components/event/Event";

const Home = () => <div>Welcome to Location Page</div>;
const NoMatch = () => <div>404 Components not found</div>;

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
                <li>
                  <Link to="/home" style={{ fontSize: "20px" }}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/search" style={{ fontSize: "20px" }}>
                    Location Search
                  </Link>
                </li>
                <li>
                  <Link to="/favourite" style={{ fontSize: "20px" }}>
                    Favourite
                  </Link>
                </li>
                <li>
                  <Link to="/event" style={{ fontSize: "20px" }}>
                    Show Event
                  </Link>
                </li>
                <li>
                  <Link to="/table" style={{ fontSize: "20px" }}>
                    Table of All Contents
                  </Link>
                </li>
                {/* <li>
                  <Link to="/login" style={{ fontSize: "20px" }}>
                    Admin Login
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/adminlogin" style={{ fontSize: "20px" }}>
                    Admin Login
                  </Link>
                </li> */}
                <li>
                  <Link to="/map" style={{ fontSize: "20px" }}>
                    Map
                  </Link>
                </li>
              </ul>
            </div>
            <button className="logOut">Log out</button>
          </div>

          <hr />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/search" element={<Search />} />
            <Route path="/adminlogin" element={<UserLogin />} />
            <Route path="/map" element={<NoMatch />} />
            <Route path="/table" element={<Table />} />
            <Route path="/event" element={<Event />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App name="CUHK pictures" />);
