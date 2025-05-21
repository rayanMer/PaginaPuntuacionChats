import SelectorValorMetrica from "./SelectorValorMetrica";

const METRICAS = [
  { label: 'Precisión diagnóstica', key: 'metric_1' },
  { label: 'Claridad textual', key: 'metric_2' },
  { label: 'Fluidez conversacional', key: 'metric_3' },
  { label: 'Utilidad de las recomendaciones', key: 'metric_4' },
];

const PanelMetricas = ({ metricas, setMetricas }) => {
  const manejarValoracion = (key, valor) => {
    setMetricas((prev) => ({
      ...prev,
      [key]: valor,
    }))
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">Selecciona un valor 1–10</p>
      <div className="flex flex-col gap-3">
        {METRICAS.map(({ label, key }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-lg text-sapphire font-bold">{label}</label>
            <SelectorValorMetrica
              valorActual={metricas[key]}
              onSeleccionar={(valor) => manejarValoracion(key, valor)}
          />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PanelMetricas
