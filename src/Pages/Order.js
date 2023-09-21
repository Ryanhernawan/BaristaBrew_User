import React, { useState, useEffect, useRef, placeOrder } from "react";
import Navigation from "./Navigation.js";
import backgorund from "../assets/background.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; // Import untuk navigasi
import app from "./config.js";
import css from "../assets/global.css";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
  update,
} from "firebase/database";

function Order() {
  const [orderedItems, setOrderedItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
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
  // Fungsi untuk menambah jumlah item
  const incrementItem = (menuItem) => {
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[menuItem] = (newCounts[menuItem] || 0) + 1;
      return newCounts;
    });
  };

  // Fungsi untuk mengurangi jumlah item
  const decrementItem = (menuItem) => {
    if (itemCounts[menuItem] > 0) {
      setItemCounts((prevCounts) => {
        const newCounts = { ...prevCounts };
        newCounts[menuItem] = newCounts[menuItem] - 1;
        return newCounts;
      });
    }
  };

  const addToOrder = (menuItem) => {
    // Menambahkan menu ke dalam daftar pemesanan berdasarkan jumlah yang telah diatur
    for (let i = 0; i < itemCounts[menuItem]; i++) {
      setOrderedItems((prevOrderedItems) => [...prevOrderedItems, menuItem]);
    }
    // Mengatur ulang jumlah item ke 0 setelah ditambahkan ke pesanan
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[menuItem] = 0;
      return newCounts;
    });
  };

  const removeItem = (index) => {
    const removedItem = orderedItems[index];
    // Menghapus item dari daftar pemesanan berdasarkan indeks
    const newOrderedItems = [...orderedItems];
    newOrderedItems.splice(index, 1);
    setOrderedItems(newOrderedItems);
  };

  const placeOrder = () => {
    // Mengirim pemesanan ke server atau melakukan tindakan yang sesuai
    // Di sini, Anda dapat mengakses orderedItems untuk mengirim pemesanan
  };
  const divRef = useRef(null);

  return (
    <>
      {/* <Navigation /> */}
      <div style={{ color: "white" }} className="menu" id="menu">
        <h1>Menu for Order</h1>
        {/* Coffee menu section start */}
        <div className="menu" id="menu" ref={divRef}>
          <div className="row">
            {data.map((item) => (
              <div>
                <div key={item.data} className="menu-card">
                  <img src={item.imageURL} className="menu-card-img" />
                  <h1 className="menu-card-title">{item.name}</h1>
                  <h2 className="menu-card-price">{item.price}</h2>
                  <button onClick={() => decrementItem("Menu 1")}>-</button>
                  <span
                    style={{ color: "white", marginRight: 10, marginLeft: 10 }}
                  >
                    {itemCounts["Menu 1"] || 0}
                  </span>{" "}
                  {/* Jumlah item */}
                  <button
                    style={{ marginRight: 10 }}
                    onClick={() => incrementItem("Menu 1")}
                  >
                    +
                  </button>
                    <button onClick={() => addToOrder("Menu 1")}>
                      Add to Order
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Coffee menu section End */}

        {/* Daftar pesanan saat ini */}
        <div >

        <h2 >Your Order</h2>
        <ul >
          {orderedItems.map((item, index) => (
            <li key={index}>
              {item} <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          ))}
        </ul>

        <button onClick={placeOrder}>Order Now</button>
        </div>

      </div>
    </>
  );
}

export default Order;
