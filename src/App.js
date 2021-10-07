import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format, register } from "timeago.js";
import Register from "./components/Register/Register";
import "./app.css";

function App() {
  const [currentUser,setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins", {
          headers: { "Access-Control-Allow-Origin": "*" },
        });
        setPins(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  // var locale = function(number, index, totalSec) {
  //   // number: the time ago / time in number;
  //   // index: the index of array below;
  //   // totalSec: total seconds between date to be formatted and today's date;
  //   return [
  //     ['az önce', 'şimdi'],
  //     ['%s saniye önce', '%s saniye içinde'],
  //     ['1 dakika önce', '1 dakika içinde'],
  //     ['%s dakika önce', '%s dakika içinde'],
  //     ['1 saat önce', '1 saat içinde'],
  //     ['%s saat önce', '%s saat içinde'],
  //     ['1 gün önce', '1 gün içinde'],
  //     ['%s gün önce', '%s gün içinde'],
  //     ['1 hafta önce', '1 hafta içinde'],
  //     ['%s hafta önce', '%s hafta içinde'],
  //     ['1 ay önce', '1 ay içinde'],
  //     ['%s ay önce', '%s ay içinde'],
  //     ['1 yıl önce', '1 yıl içinde'],
  //     ['%s yıl önce', '%s yıl içinde'],
  //   ][index];
  // };

  // register('tr', locale);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/honeybadgerx/ckufhx5cd37dc18ohhkbppinc"
        onDblClick={handleAddClick}
      >
        {pins.map((p) => {
          return (
            <>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-viewport.zoom * 3.5} //centered marker
                offsetTop={-viewport.zoom * 7} //centered marker
              >
                <Room
                  style={{
                    fontSize: viewport.zoom * 7,
                    color: p.username === currentUser ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrentPlaceId(null)}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </>
          );
        })}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout">Logout</button>
        ) : (
          <div className="buttons">
            <button className="button login">Login</button>
            <button className="button register">Register</button>
          </div>
        )}
        <Register/>
      </ReactMapGL>
    </div>
  );
}

export default App;
