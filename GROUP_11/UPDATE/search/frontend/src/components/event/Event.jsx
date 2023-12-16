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
import React, { useState, useEffect } from "react";
import "./about.css";

const Event = () => {
  const [priceLimit, setPriceLimit] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/events?price=${priceLimit}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error:", error));
    console.log(priceLimit);
  }, [priceLimit]);

  return (
    <div className="container">
      <div className="title">
        <b>Events whose Price under a Specific Number&nbsp;</b>
      </div>
      <div className="separator"></div>
      <div className="keyword_bx">
        <div className="search_box">Enter number:</div>
        <div>
          <input
            type="number"
            value={priceLimit}
            onChange={(e) => setPriceLimit(e.target.value)}
          />
        </div>
      </div>
      <div className="result_bx">
        <table className="result-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.eventId}</td>
                <td>{event.title}</td>
                <td>{event.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Event;
