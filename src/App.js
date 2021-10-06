import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./app.css";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/honeybadgerx/ckufhx5cd37dc18ohhkbppinc"
      >
        <Marker
          latitude={39.9251}
          longitude={32.8369}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room style={{ fontSize: viewport.zoom * 7, color: "slateblue" }} />
        </Marker>
        {/* <Popup
          latitude={39.9251}
          longitude={32.8369}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">Anıtkabir </h4>
            <label>Review</label>
            <p className="desc">Beautiful place.</p>
            <label>Rating</label>
            <div className="stars">
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
            </div>
            <label>Information</label>
            <span className="username">
              Created by <b>yaman</b>
            </span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup> */}
      </ReactMapGL>
    </div>
  );
}

export default App;
