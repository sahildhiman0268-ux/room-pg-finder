import { useEffect, useState } from "react";
import "./App.css";

const rooms = [
  {
    id: 1,
    title: "Comfortable Single Room",
    location: "Shimla",
    type: "Single Room",
    rent: 6000,
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Student PG",
    location: "Chandigarh",
    type: "PG",
    rent: 5500,
    icon: "🏡",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Premium Room",
    location: "Delhi",
    type: "Single Room",
    rent: 8000,
    icon: "🏢",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Budget PG",
    location: "Dharamshala",
    type: "PG",
    rent: 4500,
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Double Sharing Room",
    location: "Shimla",
    type: "Double Sharing",
    rent: 5000,
    icon: "🏡",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
];

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState(rooms);
  const [allRooms, setAllRooms] = useState(rooms);

useEffect(() => {
  fetch("http://localhost:5000/rooms")
    .then((res) => res.json())
    .then((data) => {
      const roomsWithImages = data.map((dbRoom) => {
        const localRoom = rooms.find((room) => room.title === dbRoom.title);
        return { ...dbRoom, image: localRoom?.image, icon: localRoom?.icon };
      });
      
      setAllRooms(roomsWithImages);
      setResults(roomsWithImages);
    })
    .catch((error) => {
      console.log("Error loading rooms:", error);
    });
}, []);

  const handleSearch = () => {
    const filteredRooms = allRooms.filter((room) => {
      const locationMatch =
        !location ||
        room.location.toLowerCase().includes(location.toLowerCase());

      const typeMatch =
        !roomType || room.type === roomType;

      const budgetMatch =
        !budget || room.rent <= Number(budget);

      return locationMatch && typeMatch && budgetMatch;
    });

    setResults(filteredRooms);
  };

  const clearSearch = () => {
    setLocation("");
    setRoomType("");
    setBudget("");
    setResults(rooms);
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🏠 Room<span>Finder</span>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#rooms">Find Rooms</a>
          <a href="#">About</a>
          {currentUser ? (
  <button className="login-btn" onClick={handleLogout}>
  👤 {currentUser.name} — Logout
</button>
) : (
  <button
    className="login-btn"
    onClick={() => setShowLogin(true)}
  >
    Login
  </button>
)}       
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">

          <h1>
            Find Your Perfect
            <span> Room & PG</span>
          </h1>

          <p>
            Find affordable rooms and PGs near your college,
            workplace or preferred location.
          </p>

          {/* Search */}
          <div className="search-box">

            <input
              type="text"
              placeholder="📍 Enter city or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">Room Type</option>
              <option value="Single Room">Single Room</option>
              <option value="Double Sharing">
                Double Sharing
              </option>
              <option value="PG">PG</option>
            </select>

            <input
              type="number"
              placeholder="Max Rent ₹"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <button onClick={handleSearch}>
              🔍 Search
            </button>

          </div>

          <button className="clear-btn" onClick={clearSearch}>
            Clear Search
          </button>

        </div>
      </section>

      {/* Popular Locations */}
      <section className="locations">
        <h2>Popular Locations</h2>

        <div className="location-cards">
          <div className="location-card">📍 Shimla</div>
          <div className="location-card">📍 Chandigarh</div>
          <div className="location-card">📍 Delhi</div>
          <div className="location-card">📍 Dharamshala</div>
        </div>
      </section>

      {/* Rooms */}
      <section className="rooms" id="rooms">

        <h2>
          {results.length > 0
            ? `Available Rooms (${results.length})`
            : "No Rooms Found"}
        </h2>

        <div className="room-container">

          {results.map((room) => (
            <div className="room-card" key={room.id}>

              <div className="room-image">
                <img
                  src={room.image}
                  alt={room.title}
                />
              </div>

              <div className="room-info">

                <h3>{room.title}</h3>

                <p>📍 {room.location}</p>

                <p>🛏️ {room.type}</p>

                <h4>
                  ₹{room.rent.toLocaleString()} / month
                </h4>

                <button onClick={() =>
                setSelectedRoom(room)}>
                  View Details
                    </button>

              </div>

            </div>
          ))}

        </div>

      </section>
      {selectedRoom && (
  <div className="modal-overlay">
    <div className="modal">
      <button
        className="close-btn"
        onClick={() => setSelectedRoom(null)}
      >
        ✕
      </button>

      <div className="modal-image">
        <img
          src={selectedRoom.image}
          alt={selectedRoom.title}
          onClick={() => window.open(selectedRoom.image, "_blank")}
          style={{ cursor: "pointer" }}
        />
      </div>

      <h2>{selectedRoom.title}</h2>

      <p>📍 {selectedRoom.location}</p>
      <p>🛏️ {selectedRoom.type}</p>

      <h3>
        ₹{selectedRoom.rent.toLocaleString()} / month
      </h3>

      <p>👤 Owner: RoomFinder Owner</p>
      <p>📞 Contact: 98765 43210</p>

      <button
        className="contact-btn"
        onClick={() =>
          window.open(
            "https://wa.me/919876543210?text=Hello%20I%20am%20interested%20in%20this%20room",
            "_blank"
          )
        }
      >
        Contact Owner
      </button>
    </div>
  </div>
)}
   {showLogin && (
  <div className="modal-overlay">
    <div className="modal login-modal">

      <button
        className="close-btn"
        onClick={() => setShowLogin(false)}
      >
        ✕
      </button>

      <h2>🔐 Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />

      <button
        className="contact-btn"
        onClick={async () => {
          try {
            const response = await fetch("http://localhost:5000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
              }),
            });
        
            const data = await response.json();
        
            if (response.ok) {
              alert("Login successful!");
              localStorage.setItem("token", data.token);
              setCurrentUser(data.user);
              localStorage.setItem("user", JSON.stringify(data.user));
              setShowLogin(false);
            } else {
              alert(data.message);
            }
          } catch (error) {
            alert("Unable to connect to the server. Please try again.");
          }
        }}
      >
        Login
      </button>

      <p>
  Don't have an account?{" "}
  <span
    className="register-link"
    onClick={() => {
      setShowLogin(false);
      setShowRegister(true);
    }}
  >
    Register
  </span>

    </p>

    </div>
  </div>
)}
{showRegister && (
  <div className="modal-overlay">
    <div className="modal login-modal">

      <button
        className="close-btn"
        onClick={() => setShowRegister(false)}
      >
        ✕
      </button>

      <h2>📝 Register</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={registerName}
        onChange={(e) => setRegisterName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Create Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />

      <button
        className="contact-btn"
        onClick={async () => {
          try {
            const response = await fetch("http://localhost:5000/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: registerName,
                email: registerEmail,
                password: registerPassword,
              }),
            });
        
            const data = await response.json();
        
            if (response.ok) {
              alert("Registration successful!");
              setShowRegister(false);
              setRegisterName("");
              setRegisterEmail("");
              setRegisterPassword("");
            } else {
              alert(data.message);
            }
          } catch (error) {
            alert("Unable to connect to the server. Please try again.");
          }
        }}
      >
        Create Account
      </button>

      <p>
        Already have an account?{" "}
        <span
          className="register-link"
          onClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        >
          Login
        </span>
      </p>

    </div>
  </div>
)}
      {/* Footer */}
      <footer>
        <h3>🏠 RoomFinder</h3>
        <p>
          Find rooms. Find PGs. Find your perfect place.
        </p>
        <p>© 2026 RoomFinder</p>
      </footer>

    </div>
  );
}

export default App;