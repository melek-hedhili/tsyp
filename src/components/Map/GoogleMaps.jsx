import React, { useState, useEffect } from "react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import useStyles from "./styles.js";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Rating } from "@mui/material";
import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

const GoogleMaps = ({ places, setChildClicked }) => {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    // const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        // const radius = e.accuracy;
        // const circle = L.circle(e.latlng, radius);
        // circle.addTo(map);s
        // setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={greenIcon}>
        <Popup>
          You are here. <br />
        </Popup>
      </Marker>
    );
  }
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-width:600px)");
  var greenIcon = L.icon({
    iconUrl: "marker.png",
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  return (
    <div className={classes.mapContainer}>
      <MapContainer
        center={[35.8339669, 10.615674]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {places.map((item, index) => (
          <Marker position={item.coords} key={index}>
            <Popup>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setChildClicked(index)}
              >
                {item.name} <br /> {item.address}.
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* <Map
        defaultCenter={[35.8339669, 10.615674]}
        defaultZoom={13}
        height={"100%"}
      >
        <ZoomControl />

        {places.map((item, index) => (
          <Overlay
            key={index}
            anchor={[item.coords.lat, item.coords.lng]}
            className={classes.markerContainer}
          >
            <div onClick={() => setChildClicked(index)}>
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {item.name}
                </Typography>
                <img className={classes.pointer} src={item.image} />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(item.rating)}
                  readOnly
                  style={{ alignSelf: "center" }}
                />
              </Paper>
            </div>
          </Overlay>
        ))}
      </Map> */}
    </div>
  );
};

export default GoogleMaps;
