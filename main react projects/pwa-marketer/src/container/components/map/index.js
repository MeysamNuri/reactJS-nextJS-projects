import React from "react";

import "./index.css";

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      zoom: 10,
      maptype: "roadmap",
      newLocation: null,
    };
  }
  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 35.693633, lng: 51.410469 },
      zoom: 10,
      mapTypeId: "roadmap",
      fullscreenControlOptions: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: true,
    });

    map.addListener("zoom_changed", () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });

    map.addListener("maptypeid_changed", () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });

    var marker = new window.google.maps.Marker({
      map: map,
    });

    function placeMarker(location) {
      if (marker) {
        marker.setPosition(location);
      } else {
        marker = new window.google.maps.Marker({
          position: location,
          map: map,
        });
      }
    }

    window.google.maps.event.addListener(map, "click", function (event) {
      placeMarker(event.latLng);
      localStorage.setItem("lat", event.latLng.lat());
      localStorage.setItem("lng", event.latLng.lng());
    });
    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById("pac-input");
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace();

      if (place.geometry === undefined) {
        return;
      } else {
        let location = place.geometry.location;

        // bring the selected place in view on the map
        map.fitBounds(place.geometry.viewport);
        map.setCenter(location);
      }
    });
  }
  render() {
    return (
      <div
        id="app"
        style={{
          width: "95%",
          height: 330,
          border: "2px dotted #009286",
        }}
      >
        <div
          id="map"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <div id="pac-container">
          <input
            className="map-input"
            id="pac-input"
            type="text"
            placeholder="جستجو..."
          />
        </div>
      </div>
    );
  }
}
