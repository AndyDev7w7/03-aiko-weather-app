# Technical Overview - Aiko Weather

## Stack
HTML, CSS, JavaScript, Open-Meteo API

## Responsabilidades
- Entrada de datos validada antes de ejecutar operaciones principales.
- Estado de aplicacion mantenido de forma explicita.
- Respuestas de error pensadas para humanos.
- Dependencias externas evitadas salvo cuando aportan valor real.

## Ejecucion local
```bash
Abrir index.html. La API publica no requiere key.
```

## APIs y datos
No usa secrets. Open-Meteo es publico sin key.

## Riesgos conocidos
- Es una demo de portafolio, no un sistema productivo.
- Si usa API externa, incluye fallback o documentacion para evitar bloquear la demo.
- La seguridad de los proyectos auth/backend esta explicada como base educativa.
