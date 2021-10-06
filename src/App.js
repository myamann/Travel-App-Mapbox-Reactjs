import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Room } from "@material-ui/icons";

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
      </ReactMapGL>
    </div>
  );
}

export default App;
