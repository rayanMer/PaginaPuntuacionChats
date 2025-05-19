const Historial = () => {
  return (
    <div className="historial-container bg-[var(--color-light-green)] h-screen grid grid-rows-12">
      <div className="row-start-2 col-span-11 row-span-11 grid grid-rows-12">
        <div className="flex flex-row justify-around">
            <span className="bg-[var(--color-dark-green)] w-15 h-8 items-center text-white">Volver</span>
            <h1>Página de historial de valoraciones</h1>
        </div>
        <div className="cards-container row-span-11">
            <div className="card-ejemplo bg-white rounded-md h-75 w-60 grid grid-rows-8">
                <div className="row-span-7"><img src="images/card.png" className="h-fit w-fit" /></div>
                <div className="row-span-1 row-start-8 bg-gray-300 items-center align-middle"><p>Ejemplo de fecha</p></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Historial;
