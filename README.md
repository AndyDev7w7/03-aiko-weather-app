# Aiko Weather

Buscador de clima con async/await, estados de carga y fallback cuando la red falla.

## Que demuestra tecnicamente
Consumo REST, manejo de errores de red, datos mock y UI de tarjeta premium.

## Features
- Flujo principal funcional de punta a punta.
- Manejo de errores con mensajes claros.
- UI responsive o CLI usable, segun el caso.
- Datos locales, mock o SQLite para que el proyecto no dependa de servicios fragiles.
- Documentacion en `docs/project-notes.md` y `docs/technical-overview.md`.

## Tecnologias
HTML, CSS, JavaScript, Open-Meteo API

## Instalacion
Revisa los requisitos del proyecto. Los proyectos estaticos no requieren dependencias. Los proyectos Python incluyen `requirements.txt` cuando usan librerias externas.

## Ejecucion
```bash
Abrir index.html. La API publica no requiere key.
```

## Estructura
```txt
.
|-- README.md
|-- docs/
|   |-- project-notes.md
|   `-- technical-overview.md
`-- codigo del proyecto
```

## Variables de entorno
No usa secrets. Open-Meteo es publico sin key.

Este proyecto es una demo de portafolio. Las variables sensibles no se suben al repositorio. Cuando una API requiere clave, se incluye un archivo `.env.example` para mostrar la configuracion esperada sin exponer secrets reales.

## Screenshots
Agrega capturas en `docs/screenshots/` cuando publiques el repo. Sugerencia: una captura desktop y una mobile mostrando el flujo principal.

## Decisiones tecnicas
- Se priorizo una implementacion pequena, clara y ejecutable localmente.
- La logica sensible se separo de la interfaz cuando aporta legibilidad.
- Los errores se muestran con microcopy sobrio para mantener personalidad sin perder profesionalismo.

## Posibles mejoras
- Agregar pipeline CI para tests.
- Guardar screenshots reales del proyecto desplegado.
- Mejorar accesibilidad con auditorias Lighthouse/axe.

## Estado
Funcional como demo de portafolio.
