// src/components/PaginaValoraciones.jsx
import React from 'react';

export default function PaginaValoraciones() {
  return (
    <div className="min-h-screen bg-green-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Valoración de los chats por: medico1@gmail.com</h1>
        <button className="flex items-center gap-1 text-blue-600 hover:underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h3m10 0h3a1 1 0 011 1v3m0 10v3a1 1 0 01-1 1h-3m-10 0H4a1 1 0 01-1-1v-3" />
          </svg>
          Historial
        </button>
      </div>

      {/* Main content */}
      <div className="flex space-x-6">
        {/* Chat pane */}
        <div className="flex-1 bg-white rounded-lg shadow h-[70vh] overflow-y-auto p-4">
          {/* Mensajes de ejemplo */}
          <div className="space-y-4">
            <div className="self-start bg-green-200 p-3 rounded-lg max-w-xs">
              Mensaje del chatbot: aquí iría el texto simulado...
            </div>
            <div className="self-end bg-gray-200 p-3 rounded-lg max-w-xs">
              Mensaje del usuario: aquí iría su respuesta...
            </div>
            <div className="self-start bg-green-200 p-3 rounded-lg max-w-xs">
              Mensaje del chatbot: más texto de ejemplo para ver scroll...
            </div>
          </div>
        </div>

        {/* Valoraciones */}
        <div className="w-1/3 bg-white rounded-lg shadow p-6 flex flex-col justify-between h-[70vh]">
          <div className="space-y-6">
            {[
              'Precisión diagnóstica',
              'Claridad textual',
              'Fluidez conversacional',
              'Utilidad de las recomendaciones'
            ].map((criterio) => (
              <div key={criterio}>
                <label className="block font-medium mb-1">{criterio}: <span className="text-sm text-gray-500">1–10</span></label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="mt-4 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Terminar Valoraciones
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
