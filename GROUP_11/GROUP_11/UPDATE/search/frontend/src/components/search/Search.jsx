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
import React, { useState } from "react";
import "./about.css";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [sortedData, setSortedData] = useState([]);

  const handleSearch = async () => {
    if (searchText === "") {
      alert("Invalid input, please type it again!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/keywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchText }),
      });

      const dataGOT = await response.json();
      setSortedData(dataGOT);
      console.log(dataGOT);
    } catch (error) {
      console.error(error);
    }
    setSearchText("");
  };

  const handleSort = () => {
    const newSortingOrder = sortingOrder === "asc" ? "desc" : "asc";
    setSortingOrder(newSortingOrder);

    const sorted = [...sortedData].sort((a, b) => {
      if (a.eventCount === "") return 1;
      if (b.eventCount === "") return -1;
      if (newSortingOrder === "desc") {
        return parseInt(a.eventCount) - parseInt(b.eventCount);
      } else {
        return parseInt(b.eventCount) - parseInt(a.eventCount);
      }
    });

    setSortedData(sorted);
  };

  const handleLinkClick = (event, link) => {
    const clickedText = event.target.textContent;
    const internalLink = `/ev/${clickedText}`;
    console.log(internalLink);
    window.open(link, "_blank");
  };

  const generateEmptyRows = () => {
    const emptyRows = [];
    const remainingRows = 10 - sortedData.length;

    for (let i = 0; i < remainingRows; i++) {
      emptyRows.push(
        <tr key={`empty-row-${i}`}>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }

    return emptyRows;
  };

  return (
    <div className="container">
      <div className="title">
        <b>
          Location Search Result &nbsp;
          <FaSearch />
        </b>
      </div>
      <div className="separator"></div>
      <div className="keyword_bx">
        <div className="search_box">Enter keywords:</div>
        <div>
          <input
            id="input_keywords"
            type="text"
            placeholder="Library"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <br />
      <br />
      <div className="result_bx">
        <table className="result-table">
          <thead>
            <tr>
              <th>
                <div>Venue Name</div>
              </th>
              <th>
                <div>Link to Location Details</div>
              </th>
              <th onClick={handleSort}>
                <u>No. of Events</u>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td id={`name-${index + 1}`}>{item?.name || ""}</td>
                <td
                  id={`link-${index + 1}`}
                  onClick={(event) => handleLinkClick(event, item?.link || "")}
                  style={{ cursor: "pointer" }}
                >
                  <u>{item?.link || ""}</u>
                </td>
                <td id={`no-${index + 1}`}>{item?.eventCount || ""}</td>
              </tr>
            ))}
            {generateEmptyRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
