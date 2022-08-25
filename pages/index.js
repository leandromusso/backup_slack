import { useState, useEffect } from "react";

export default function Home() {
  //call api lector
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/lector');
      const data = await response.json();
      setMensajes(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(mensajes);
  }, [mensajes]);

  return (
    <>
      <h1 style={{textAlign: "center"}} >Mensajes del canal de consultas</h1>
      <ul>
        {mensajes.map((mensaje, index) => (
          <div key={index}>
            {
              mensaje.parent_user_id || mensaje.subtype == "channel_join" ? (
                null
              ) : (
                <>
                <hr/>
                <li style={{listStyleType: "none"}}>
                  {mensaje.user_profile?.real_name? (<b>{mensaje.user_profile?.real_name + ": "} </b>) : ''}
                  {mensaje.text}
                  {
                    mensaje.files?.map((file, index) => (
                      <>
                        <br />
                        <img src={file.thumb_360} alt={file.name} />
                      </>
                    ))
                  }
                </li>
                </>
              )
            }
            {
              mensaje?.replies ? (
                <ul>
                  <h6>{mensaje.replies.length} respuestas</h6>
                  {mensaje.replies.map((reply, index) => (
                    <li key={index}>
                      {mensajes.find(m => m.ts === reply.ts).user_profile?.real_name? (<b>{mensajes.find(m => m.ts === reply.ts).user_profile?.real_name + ": "} </b>) : ''}
                      {mensajes.find(m => m.ts === reply.ts).text}
                      {
                        mensajes.find(m => m.ts === reply.ts).files?.map((file, index) => (
                          <>
                            <br />
                            <img src={file.thumb_360} alt={file.name} key={index} />
                          </>
                        ))
                      }
                    </li>
                  ))}
                </ul>
              ) : null
            }
          </div>
        ))}
      </ul>
    </>
  )
}
