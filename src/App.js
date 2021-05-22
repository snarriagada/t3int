import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Socket from './componentes/Socket';
import socket from './componentes/Socket';
import Chat from './componentes/Chat';


import {Map, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

function App() {

  const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [55,75],
  });

  const flightsMarkers = [];
  // let vuelos = [];
  const [vuelos, setVuelos] = useState([]); //state for flights data
  const [positions, setPositions] = useState([]); //state for flights data

  //console.log("print positions inicial");
  //console.log(positions);
  //console.log("fin print positions inicial");

  const [response, setResponse] = useState(""); //state for car data

  // chat: https://www.youtube.com/watch?v=mEr9lt5mG9A&t=804s

  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if(nombre !== ""){
      setRegistrado(true);
    }
  }

  // fin chat 


  // socket.emit('FLIGHTS');
  
  useEffect( () => {
    console.log("EMIT FLIGHTS");
    socket.emit('FLIGHTS');
    console.log("FIN EMIT FLIGHTS");

}, [] );
  

  
  /*
  socket.on('POSITION', function(data){
    console.log(data);
  });
  */

  /*
  socket.on('FLIGHTS', function(data){
    console.log("IMPRIMIENDO INFO DE FLIGHTS");
    console.log(data);
    console.log("FIN INFO DE FLIGHTS");

    flightsMarkers.push(data);
    //console.log("print array");
    //console.log(flightsMarkers);
    // flightsMarkers.forEach(myFunction);
  

    vuelos = flightsMarkers[0];

    // console.log("print vuelos");
    // console.log(vuelos);
    // console.log("fin print vuelos");
  });
  */

// ---------- PROBANDO USE STATE Y EFFECT
  // const [response, setResponse] = useState(""); //state for car data
    //get data
    // let [positions, setPositions] = useState([]); //state for flights data

    useEffect(() => {

      socket.on('FLIGHTS', function(data){
        console.log("IMPRIMIENDO INFO DE FLIGHTS");
        console.log(data);
        console.log("FIN INFO DE FLIGHTS");

        flightsMarkers.push(data);
        //console.log("print array");
        //console.log(flightsMarkers);
        // flightsMarkers.forEach(myFunction);

        //vuelos = flightsMarkers[0];
        setVuelos(flightsMarkers[0])
    
        console.log("print vuelos");
        console.log(vuelos);
        console.log("fin print vuelos");

        Object.values(vuelos).map((avion) => (
          console.log([avion.origin,avion.destination])
        ))

      });

      socket.on("POSITION", data => {
        console.log("print nueva position (data)");
        console.log(data);
        // console.log("fin print nueva position");
        // setResponse(data);
        // position =  data.location.coordinates;
        const temp = positions;
        temp[data.code] = data;
        setPositions(temp);



        // console.log("print positions modificado");
        // console.log(positions);
        //console.log("fin print positions modificado");
        //console.log("probando impresion de positions");
        // Object.values(positions).forEach((elem)=>{console.log(elem.position);});
        //Object.values(positions).forEach((elem)=>{console.log(elem.position);});

        //console.log("FIN probando impresion de positions");
        //console.log("RESPONSE ACTUAL");
        //console.log(response);
        //console.log("RESPONSE NUEVO (data dentro de POSITION)");

        //console.log(data);
        //console.log("fin");
        setResponse(data);

        

      });
      return () => {socket.off()}

    }, []);
// ----------------------------------------
  
  const centro = [51.52437, 13.41053];


  return (
    <div>
      <div class="box">
      <h2>Bienvendo a Flight Tracker</h2>
    <Map center={{lat: '20.52437', lng: '13.41053'}} zoom={2}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

        {Object.values(positions).map((pos) => (
          <Marker position={pos.position} icon={markerIcon}>
          <Popup>
            <b>{pos.code}</b>
          </Popup>
          </Marker>
        ))}

        {Object.values(vuelos).map((vuelo) => (
          <Polyline positions={[vuelo.origin,vuelo.destination]}>

          </Polyline>
        ))}
    </Map>

    {
      !registrado &&
      <div class="boxchat">
      <h2>CHAT</h2>

      <form onSubmit={registrar}>
        <label htmlFor="">Introduce tu nombre para chatear</label>
        <input value={nombre} onChange={e => setNombre(e.target.value)}></input>
        <button>Ir al Chat</button>
      </form>

    </div>

    }
    {
      registrado && 
      <div class="boxchat">
      <Chat nombre={nombre}></Chat>
      </div>
    }




    </div>

    <div class="box">

    {Object.values(vuelos).map((vuelo) => (
      <ul class="boxinfo">
        <li><b>Airline</b>: {vuelo.airline} </li>
        <li><b>Code:</b> {vuelo.code}</li>
        <li><b>Plane:</b> {vuelo.plane}</li>
        <li><b>Origin:</b> {vuelo.origin}</li>
        <li><b>Destination:</b> {vuelo.destination}</li>
        <li><b>Seats:</b> {vuelo.seats}</li>

      </ul>

        ))}
    </div>

    </div>

  );

}

export default App;

/*


        {Object.values(positions).forEach((elem) => {
        {console.log("DENTRO DE FOREACH")}
        {console.log(elem["position"])}
        <Marker position= {elem["position"]} icon={markerIcon}>
        </Marker>
        })}

        {vuelos.map((avion) => (
          <Polyline positions={[avion["origin"], avion["destination"]]}></Polyline>
        ))}


        {Object.values(vuelos).map((pos) => (
          <Polyline positions={[pos.origin,pos.destination]}>

          </Polyline>
        ))}


*/