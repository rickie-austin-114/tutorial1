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
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "./about.css";

const Table = () => {
  const [locations, setLocations] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/lo')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        const rows = Array.from(htmlDoc.querySelectorAll('tbody tr'));
        const locations = rows.map(row => {
          const columns = Array.from(row.querySelectorAll('td'));
          return {
            name: columns[0].textContent,
            link: columns[1].querySelector('a').href,
            eventCount: parseInt(columns[2].textContent, 10),
          };
        });
        setLocations(locations);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/coordinates')
      .then(response => response.json())
      .then(data => {
        setCoordinates(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Sort locations by number of events
  const sortedLocations = [...locations].sort((a, b) => sortAscending ? a.eventCount - b.eventCount : b.eventCount - a.eventCount);

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  {Array.isArray(coordinates) && coordinates.map((location, index) => {
    console.log(location[0]);  // Add this line
    return (
      <p>{location[0]}</p>
    );
  })}
  

  return (
    <div className="container">
      <div className="title">
        <b>
          Table of All Contents &nbsp;
        </b>
      </div>
      <div className="result_bx">
        <table className="result-table">
          <thead>
            <tr>
              <th>Venue Name</th>
              <th>Link to Location Details</th>
              <th onClick={toggleSort} style={{cursor: 'pointer'}}>Number of Events</th>
            </tr>
          </thead>
          <tbody>
            {sortedLocations.map(location => (
              <tr key={location.name}>
                <td>{location.name}</td>
                <td><a href={location.link}>{location.link}</a></td>
                <td>{location.eventCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <LoadScript googleMapsApiKey="AIzaSyDnl5cb5IkZERJGggE5xutunRr3n-fNfrw">
        <GoogleMap
            mapContainerStyle={{ width: '85%', height: '85%' }}
            center={{ lat: 22.35665, lng: 114.12623 }}
            zoom={11}
          >
            {Array.isArray(coordinates) && coordinates.map((location, index) => (
              <Marker
                key={index}
                position={{
                  lat: location[0],
                  lng: location[1]
                }}
              />
            ))}

          </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Table;
