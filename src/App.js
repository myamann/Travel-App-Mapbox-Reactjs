import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format, register } from "timeago.js";
import "./app.css";

function App() {
  const currentUser = "yaman";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
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

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
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
      >
        {pins.map((p) => {
          return (
            <>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <Room
                  style={{
                    fontSize: viewport.zoom * 7,
                    color: p.username === currentUser ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(p._id)}
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
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
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
      </ReactMapGL>
    </div>
  );
}

export default App;
