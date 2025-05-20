import { Link } from "react-router";

const Historial = () => {

  const informacion = [
  {
    "_id": "chat1",
    "doctorEmail": "medico1@ejemplo.com",
    "messages": [
      { "sender": "usuario", "text": "Necesito ayuda para interpretar un ECG anormal en un paciente de 45 años." },
      { "sender": "chatBot", "text": "Claro, ¿podrías proporcionarme los detalles del ECG y los síntomas del paciente?" },
      { "sender": "usuario", "text": "El ECG muestra elevación del ST en las derivaciones V2-V4. El paciente tiene dolor torácico." },
      { "sender": "chatBot", "text": "Esto podría indicar un infarto anterior. Se recomienda evaluación urgente y considerar angiografía coronaria." }
    ],
    "rating": {
      "timestamp": "2025-05-16T14:45:00Z",
      "scores": {
        "precision": 10,
        "claridad": 9,
        "utilidad_clínica": 8,
        "empatía": 6
      }
    }
  },
  {
    "_id": "chat2",
    "doctorEmail": "medico1@ejemplo.com",
    "messages": [
      { "sender": "usuario", "text": "¿Qué antibiótico recomiendas para una neumonía adquirida en la comunidad?" },
      { "sender": "chatBot", "text": "Para adultos sanos, amoxicilina o doxiciclina son buenas opciones. En pacientes con comorbilidades, se puede considerar amoxicilina-clavulánico más macrólido." },
      { "sender": "usuario", "text": "¿Y en caso de alergia a penicilina?" },
      { "sender": "chatBot", "text": "Doxiciclina o una fluoroquinolona respiratoria como levofloxacino podrían ser adecuadas, dependiendo del perfil del paciente." }
    ],
    "rating": {
      "timestamp": "2025-05-16T15:00:00Z",
      "scores": {
        "precision": 9,
        "claridad": 8,
        "utilidad_clínica": 7,
        "empatía": 7
      }
    }
  },
  {
    "_id": "chat3",
    "doctorEmail": "medico2@ejemplo.com",
    "messages": [
      { "sender": "usuario", "text": "Tengo un paciente pediátrico con fiebre persistente de 5 días. ¿Qué sugerencias tienes?" },
      { "sender": "chatBot", "text": "Se debe considerar enfermedad de Kawasaki o una infección viral prolongada. ¿Tiene otros síntomas como exantema, conjuntivitis o cambios en la lengua?" },
      { "sender": "usuario", "text": "Sí, presenta lengua aframbuesada y ojos enrojecidos." },
      { "sender": "chatBot", "text": "Los síntomas son consistentes con enfermedad de Kawasaki. Recomiendo referir al paciente a un centro especializado para evaluación y posible tratamiento con inmunoglobulina intravenosa." }
    ],
    "rating": {
      "timestamp": "2025-05-16T15:15:00Z",
      "scores": {
        "precision": 9,
        "claridad": 9,
        "utilidad_clínica": 9,
        "empatía": 8
      }
    }
  }
]

const filtro = informacion.filter((info => info.doctorEmail === "medico1@ejemplo.com"))
console.log(filtro)

  return (
    <div className="historial-container bg-[var(--color-light-green)] h-screen grid grid-rows-12">
      <div className="row-start-2 col-span-11 row-span-11 grid grid-rows-12">
        <div className="flex flex-row justify-start ml-15 gap-x-10">
            <span className="bg-[var(--color-dark-green)] w-15 h-8 items-center text-white px-2 py-1 rounded hover:bg-emerald-800 hover:text-gray-200 transition cursor-pointer">
              <Link to={"/"}>Volver</Link>
            </span>
            <h1>Página de historial de valoraciones</h1>
        </div>
        <div className="cards-container row-span-11 flex flex-wrap gap-10 ml-15">
            <div className="card-ejemplo bg-white rounded-md h-75 w-60 grid grid-rows-8">
                <div className="row-span-7"><img src="images/card.png" className="h-fit w-fit" /></div>
                <div className="row-span-1 row-start-8 bg-gray-300 items-center flex justify-center"><p>Ejemplo de fecha</p></div>
            </div>
            {filtro.map((val, index) => (
              <div key={index} className="card-ejemplo bg-white rounded-md h-75 w-60 grid grid-rows-8">
                <div className="row-span-7"><img src="images/card.png" className="h-fit w-fit" alt={val._id} /></div>
                <div className="row-span-1 row-start-8 bg-gray-300 items-center flex justify-center"><p> {val.rating.timestamp} </p></div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Historial;
