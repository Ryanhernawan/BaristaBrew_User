import React, { useState, useEffect, useRef } from "react";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js"
import backgorund from "../assets/background.jpg";
import app from "./config.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
  update,
} from "firebase/database";


function Dashboard() {
  const divRef = useRef(null);

  const scrollToDiv = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [data, setData] = useState([]);

  // FETCHING DATA
  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/drinks");
    console.log("Receiving Data");
    onValue(dbRef, (snapshot) => {
      let data = snapshot.val();
      let dWorkout = Object.values(data);
      setData(dWorkout);
      console.log("Console Log Set Data", data);
      console.log("data.recipesThisWeek", data.data);
    });
  }, [app]);

  const [dataFood, setDataFood] = useState([])
  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/food");
    console.log("Receiving Data");
    onValue(dbRef, (snapshot) => {
      let data = snapshot.val();
      let dWorkout = Object.values(data);
      setDataFood(dWorkout);
      console.log("Console Log Set Data", data);
      console.log("data.recipesThisWeek", data.data);
    });
  }, [app]);
  

  const [additional, setAdditional] = useState([]);
  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/Additional");
    console.log("Receiving Data");
    onValue(dbRef, (snapshot) => {
      let data = snapshot.val();
      let dWorkout = Object.values(data);
      setAdditional(dWorkout);
      console.log("Console Log Set Data", data);
      console.log("data.recipesThisWeek", data.additional);
    });
  }, [app]);
  return (
    <>
      <Navigation />
      <div className="background-image-container">
        <img src={backgorund} alt="Background" className="background-image" />
        <div className="text-overlay">
          <h1>
            Mari Nikmati Secangkir<span> Kopi</span>
          </h1>
          <p>
            Enjoy your day with<span> coffee</span>
          </p>
          <button onClick={() => scrollToDiv()}>See Menu!</button>
        </div>
      </div>

      {/* Coffee menu section start */}
      <div className="menu" id="menu" ref={divRef}>
        <h2>
          Coffee<span> Menu</span>
        </h2>
        <div className="row">
          {data.map((item) => (
            <div>
              <div key={item.data} className="menu-card">
                <img src={item.imageURL} className="menu-card-img" />
                <h1 className="menu-card-title">{item.name}</h1>
                <h2 className="menu-card-price">{item.price}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="additional-container">
          <h1>Additional</h1>
          <ul className="additional">
            {additional.map((item) =>(
              <li key={item.additional} className="additional-item">
                <h1>{item.name}</h1>
                <p>Harga : {item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Coffee menu section End */}

      {/* Food menu section start */}
      {/* <div className="menu" id="menu" >
        <h2>
          Food<span> Menu</span>
        </h2>
        <div className="row">
          {dataFood.map((item) => (
            <div>
              <div key={item.data} className="menu-card">
                <img src={item.imageURL} className="menu-card-img" />
                <h1 className="menu-card-title">{item.name}</h1>
                <h2 className="menu-card-price">{item.price}</h2>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Food menu section End */}
      {/* <Footer /> */}
    </>
  );
}

export default Dashboard;
