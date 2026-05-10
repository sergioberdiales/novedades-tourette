# Novedades Tourette

Prototipo personal en Astro para recopilar novedades fiables sobre el Síndrome de Tourette: investigación, tratamientos, familias, educación, asociaciones, eventos y divulgación.

El proyecto nace como página personal para poder enseñarlo a socios de APASTTA y valorar, más adelante, si tiene sentido integrarlo o enlazarlo desde la web oficial.

> Esta página tiene fines informativos y no sustituye la valoración de profesionales sanitarios.

## Stack

- Astro como generador de sitio estático.
- Posts en Markdown.
- CSS sencillo en `src/styles/global.css`.
- JavaScript mínimo para filtros, búsqueda y copiar enlace.
- Sin backend, base de datos, comentarios, APIs externas ni llamadas a LLM en esta fase.

## Instalar dependencias

```bash
npm install
```

## Ejecutar en local

```bash
npm run dev
```

Astro mostrará una URL local, normalmente `http://localhost:4321/novedades-tourette/`.

## Comprobar la build

```bash
npm run build
npm run preview
```

## Añadir un nuevo post

1. Crea un archivo `.md` en `src/content/posts/`, por ejemplo:

```text
src/content/posts/nombre-de-la-ficha.md
```

2. Añade el bloque inicial con los campos obligatorios:

```md
---
title: "Título de la novedad"
date: 2026-05-10
category: "Investigación"
tags: ["tics", "familias"]
excerpt: "Entradilla breve para la tarjeta."
source: "Nombre de la fuente"
originalUrl: "https://example.org/fuente-original"
originalLanguage: "Español"
summary: "Resumen en español de la novedad."
relevance: "Por qué puede ser relevante para familias, personas afectadas o profesionales."
---

Texto adicional de la ficha si hace falta.
```

Categorías válidas:

- `Investigación`
- `Tratamientos`
- `Familias`
- `Educación`
- `Asociaciones`
- `Eventos`
- `Divulgación`

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub llamado `novedades-tourette`.
2. Sube el proyecto:

```bash
git init
git add .
git commit -m "Crear prototipo inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/novedades-tourette.git
git push -u origin main
```

3. El archivo `astro.config.mjs` ya está configurado para este repositorio:

```js
site: "https://sergioberdiales.github.io",
base: "/novedades-tourette",
```

4. En GitHub, ve a `Settings` > `Pages`.
5. En `Build and deployment`, elige `GitHub Actions`.
6. El archivo `.github/workflows/deploy.yml` despliega automáticamente la web estática al hacer push a `main`.

Esta primera fase no incluye automatización editorial ni generación de contenidos. El despliegue de GitHub Pages solo serviría para publicar el sitio estático cuando se suban cambios.

## Roadmap futuro

- Revisar el prototipo con socios, familias y profesionales.
- Sustituir las fichas ficticias por contenidos reales verificados.
- Añadir criterios editoriales: fuentes aceptadas, fecha de revisión, responsable de revisión y nivel de evidencia.
- Crear una automatización semanal con GitHub Actions para recopilar candidatas desde fuentes predefinidas.
- Incorporar una fase asistida por LLM para proponer resúmenes en español, siempre con revisión humana antes de publicar.
- Añadir control de cambios y fecha de última revisión de cada ficha.
- Explorar integración o enlace desde la web oficial de APASTTA si el formato resulta útil.
