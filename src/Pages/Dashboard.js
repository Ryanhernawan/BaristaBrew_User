import React, { useState, useEffect, useRef } from "react";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
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
import { Button, Modal, Input, Alert } from "react-bootstrap";

function Dashboard() {
  const divRef = useRef(null);

  const scrollToDiv = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const openMenuModal = (menu) => {
    setSelectedMenu(menu);
    setIsModal1Open(true);
  };

  const [orders, setOrders] = useState([]);

  const handleOrder = (menu) => {
    if (menu) {
      const orderedItem = {
        menuName: menu.name,
        quantity,
        price: menu.price * quantity,
      };
      setOrders([...orders, orderedItem]);
      setIsModal1Open(false);
      setQuantity(1);
    }
  };

  // Tambahkan state untuk melacak pesanan yang akan dihapus atau dibatalkan
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  // ...

  // Fungsi untuk membatalkan pesanan tertentu
  const cancelOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    setSelectedOrderIndex(null);
  };

  // Fungsi untuk menghapus semua pesanan
  const clearOrders = () => {
    setOrders([]);
    setSelectedOrderIndex(null);
  };

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); // Tambah state untuk modal order
  const [orderName, setOrderName] = useState(""); // State untuk nama pelanggan
  const [orderDetails, setOrderDetails] = useState(""); // State untuk detail pesanan
  const [orderTotal, setOrderTotal] = useState(0); // State untuk total harga pesanan

  const openOrderModal = () => {
    setOrderTotal(calculateTotal()); // Hitung total harga pesanan
    setIsOrderModalOpen(true);
  };
  const handleOrderConfirmation = () => {
    if (orderName && orders && orderTotal > 0) {
      alert("sukses");
      setIsOrderModalOpen(false);
      setOrderName("");
      setOrderDetails("");
      setOrderTotal(0);
      setOrders([]);
    } else {
      // Tampilkan pesan kesalahan jika ada informasi yang belum diisi.
      alert("Silakan isi semua informasi pesanan dengan benar.");
    }
  };
  // Fungsi untuk menghitung total harga pesanan
  const calculateTotal = () => {
    let total = 0;
    for (const order of orders) {
      total += order.price;
    }
    return total;
  };
  // Fungsi untuk menutup modal order dan mereset state
  const closeOrderModal = () => {
    setOrderName("");
    setOrderDetails("");
    setIsOrderModalOpen(false);
  };

  const [additionalOptions, setAdditionalOptions] = useState({
    ice: false,
    hot: false,
    lessSugar: false,
    lessIce: false,
    extraShot: false,
    extraSugar: false,
  });

  const handleAdditionalOptionChange = (option) => {
    setAdditionalOptions({
      ...additionalOptions,
      [option]: !additionalOptions[option],
    });
  };

  const additionalOptionsData = [
    { key: "ice", label: "Ice ",  },
    { key: "hot", label: "Hot ", },
    { key: "lessSugar", label: "Less Sugar ",  },
    { key: "lessIce", label: "Less Ice ", },
    { key: "extraShot", label: "Extra Shot ", price: 6000},
    { key: "extraSugar", label: "Extra Sugar ", price: 6000 },
  ];

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

  const [dataFood, setDataFood] = useState([]);
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
            <div
              key={item.data}
              className="menu-card"
              onClick={() => openMenuModal(item)}
            >
              <img src={item.imageURL} className="menu-card-img" />
              <h1 className="menu-card-title">{item.name}</h1>
              <h2 className="menu-card-price">{item.price}</h2>
            </div>
          ))}
        </div>
        <div className="additional-container">
          <h1>Additional</h1>
          <ul className="additional">
            {additional.map((item) => (
              <li key={item.additional} className="additional-item">
                <h1>{item.name}</h1>
                <p>Harga : {item.price}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* Coffee menu section End */}

        {/* Food menu section start */}
        <div className="row">
          {dataFood.map((item) => (
            <div
              key={item.data}
              className="menu-card"
              onClick={() => openMenuModal(item)}
            >
              <img src={item.imageURL} className="menu-card-img" />
              <h1 className="menu-card-title">{item.name}</h1>
              <h2 className="menu-card-price">{item.price}</h2>
            </div>
          ))}
        </div>
        {/* Food menu section End */}
        <div className="orders-container" style={{ marginBottom: 100 }}>
          <h2>Pesanan Anda:</h2>
          <ul>
            {orders.map((order, index) => (
              <li key={index} style={{ textAlign: "left", fontSize: 15 }}>
                {order.menuName} - {order.quantity} - {order.price}
                <button
                  onClick={() => cancelOrder(index)}
                  style={{ marginLeft: 10 }}
                >
                  Batal
                </button>
              </li>
            ))}
          </ul>
          <Button onClick={openOrderModal}>Order Now</Button>
        </div>
      </div>

      <div className="model_box">
        <Modal
          backdrop="static"
          keyboard={false}
          show={isModal1Open}
          onHide={() => setIsModal1Open(false)}
          dialogClassName="modal-center"
        >
          <Button
            onClick={() => setIsModal1Open(false)}
            style={{
              backgroundColor: "white",
              color: "grey",
              marginTop: -100,
              marginLeft: 250,
            }}
          >
            X
          </Button>
          <Modal.Header>
            <Modal.Title>{selectedMenu && selectedMenu.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => e.preventDefault()}>
              <div class="form-group" style={{}}>
                <img src={selectedMenu && selectedMenu.imageURL} alt="Menu" />
                <div className="menu-details">
                  <p>{selectedMenu && selectedMenu.description}</p>
                  {/* <div className="additional-options">
                    {additionalOptionsData.map((optionData) => (
                      <div key={optionData.key} className="additional-option">
                        <label>
                          <input
                            type="checkbox"
                            checked={additionalOptions[optionData.key]}
                            onChange={() =>
                              handleAdditionalOptionChange(optionData.key)
                            }
                          />
                          {optionData.label}
                        </label>
                        {additionalOptions[optionData.key] && (
                          <span className="additional-price">
                            {optionData.price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div> */}

                  <p>Harga: {selectedMenu && selectedMenu.price}</p>
                  <div className="quantity">
                    <button
                      style={{ marginRight: 10 }}
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      style={{ marginLeft: 10 }}
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOrder(selectedMenu)}
                  >
                    Order
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <Modal
          backdrop="static"
          keyboard={false}
          show={isOrderModalOpen}
          onHide={() => setIsOrderModalOpen(false)}
          dialogClassName="modal-center"
        >
          <Modal.Header>
            <Modal.Title>Detail Pesanan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="orderName">Nama:</label>
                <input
                  type="text"
                  id="orderName"
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="orderDetails">Detail Pesanan:</label>
                <ul>
                  {orders.map((order, index) => (
                    <li key={index} style={{ fontSize: 13 }}>
                      {order.menuName} - {order.quantity} - {order.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="form-group">
                <label htmlFor="orderTotal">Total Harga:</label>
                <input
                  type="text"
                  id="orderTotal"
                  value={orderTotal}
                  readOnly
                  style={{ border: "none", marginLeft: 10, fontWeight: "bold" }}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeOrderModal}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleOrderConfirmation}>
              Order Now
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;
