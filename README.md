# Aplicación Web para Valorar Chats.

## Objetivo del Proyecto.

Desarrollar una aplicación web que permite a médicos valorar conversaciones (chats) entre usuarios y un chatBot. Estas valoraciones servirán para analizar la calidad de las respuestas y mejorar el servicio.

## Identificación del Usuario.
- Usuarios: Médicos autorizados.
- Identificación: Ingresan únicamente su correo electrónico para comenzar a valorar.

## Requisitos Funcionales

1. **Valoración por múltiples criterios**
   - Cada chat se valora por varios criterios, del 1 al 10.
   - Criterios actuales:
     - Precisión diagnóstica
     - Claridad textual
   - Se podrán añadir más criterios más adelante (ej: empatía, utilidad, etc.).

2. **Valoración asociada al médico y al chat**
   - Cada valoración incluye:
     - Email del médico
     - ID del chat valorado
     - Puntuaciones por criterio
     - Fecha y hora

3. **Selección automática de chats**
   - La aplicación selecciona aleatoriamente un chat no valorado.
   - Una vez valorado, se guarda y se carga otro chat aleatorio.
   - Cuando no quedan más chats: se muestra un mensaje indicándolo.

4. **Historial de valoraciones**
   - Página donde el médico puede ver todas las valoraciones realizadas.
   - Incluye criterios puntuados, fechas y acceso a cada chat evaluado.

## Diseño de Interfaz de Usuario (UI).

Link al Figma: [https://www.figma.com/design/4xiukW0XyofFgKi6UZvodn/Feedback-ChatBot?node-id=14-17&t=yUEtdXaoCrlY8lTq-1](https://www.figma.com/design/4xiukW0XyofFgKi6UZvodn/Feedback-ChatBot?node-id=14-17&t=yUEtdXaoCrlY8lTq-1)

## Flujo del Usuario.

1. El médico accede con su correo.
    
2. El sistema carga un chat suyo aún no valorado.
    
3. Valora cada criterio (1 a 10).
    
4. Guarda la valoración.
    
5. Se carga otro chat pendiente (si queda).
    
6. Puede acceder a su historial en cualquier momento.
    

## Tecnologías a Utilizar.

### Frontend.

- React.
    
- Tailwind CSS.
    
- React Router (para navegación).
    
- Axios para las llamadas a la API.
    

### Backend (para testing).

- Guardamos chat de ejemplo y tipos de valoración en unos JSON.
    
- Se utilizaria Json-server para API.
