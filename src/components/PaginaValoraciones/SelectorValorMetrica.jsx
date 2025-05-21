const valorSeleccionado = "bg-dark-green text-white hover:border-lightest-green"
const valorDeseccionado = "bg-off-white text-black hover:border-dark-green"

const SelectorValorMetrica = ({ valorActual, onSeleccionar }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(10)].map((_, i) => {
        const valor = i + 1
        const seleccionado = valorActual === valor

        return (
          <button
            key={valor}
            className={`px-3 py-1 rounded-md border-1 border-transparent ${
              seleccionado ? valorSeleccionado : valorDeseccionado
            }`}
            onClick={() => onSeleccionar(valor)}
          >
            {valor}
          </button>
        );
      })}
    </div>
  )
}

export default SelectorValorMetrica
