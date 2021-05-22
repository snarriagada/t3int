import React, { useState, useEffect, useRef} from 'react';
import socket from './Socket';



const Chat = ({nombre}) => {

    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        const temp = {};
        temp["name"] = nombre;
        temp["message"] = "conectado";
        console.log("^^IMPRIMIENDO MENSAJE DE CONECTADO  (TEMP)");
        console.log(temp);
        console.log("^^ FIN IMPRIMIENDO MENSAJE CONECTADO");
        socket.emit('CHAT', temp);
        //socket.emit('CHAT', {nombre, "conectado"});

    }, [nombre] )

    const submit = (e) => {
        e.preventDefault();
        const temp = {};
        temp["name"] = nombre;
        temp["message"] = mensaje;
        console.log("^^IMPRIMIENDO MENSAJE A ENVIAR (TEMP)");
        console.log(temp);
        console.log("^^ FIN IMPRIMIENDO MENSAJE A ENVIAR");

        socket.emit('CHAT', temp);
        //socket.emit('CHAT', {nombre, mensaje});

    }
    
    /*
    useEffect(() => {
        socket.on('CHAT', mensaje => {
            setMensajes([...mensajes,mensaje]);
        })
        // return () => {socket.off()}
    }, [mensajes])
    */
    useEffect(() => {
        socket.on('CHAT', function(data){
            console.log("!!!!!!! IMPRIMIENDO INFO DE MENSAJE RECIBIDO");
            console.log(data);
            console.log("!!!!!! FIN INFO DE MENSAJE");
            mensajes.push(data);

        })
        return () => {socket.off()}
    }, [mensajes])
    //             {mensajes.map((e, i) => <div key={i}> {e.message} </div>)}

    return (
    <div>
        <div>
            <p><b>MENSAJES</b></p>
            {Object.values(mensajes).map((msj) => (
                <p>{msj.date} <b>{msj.name}</b>: {msj.message}</p>

        ))}
        </div>
    <form onSubmit={submit}>
    <label htmlFor="">Escribe tu mensaje</label>
    <textarea cols="15" rows="5" value={mensaje} onChange={e=>setMensaje(e.target.value)}></textarea>
    <button>Enviar</button>
    </form>
    </div>
    );
}

export default Chat;