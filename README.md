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

Astro mostrará una URL local, normalmente `http://localhost:4321/`.

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
audience: ["Familias", "Profesionales"]
tags: ["tics", "familias"]
excerpt: "Entradilla breve para la tarjeta."
source: "Nombre de la fuente"
sourceType: "Tipo de fuente"
evidenceLevel: "Lectura divulgativa / estudio observacional / ensayo clínico..."
originalUrl: "https://example.org/fuente-original"
originalLanguage: "Español"
checkedDate: 2026-05-29
summary: "Resumen breve, claro y prudente en español. Debe explicar qué dice la fuente, datos relevantes y cautelas importantes si las hay."
caution: "Aviso de prudencia médica específico para esta ficha."
---
```

La ficha publicada mostrará una única sección editorial titulada `Resumen`.

Campo opcional:

```md
featured: true
```

Si una ficha incluye `featured: true`, se mostrará como `Novedad destacada`.
Si ninguna ficha lo incluye, se destacará automáticamente la noticia más reciente.

Categorías válidas:

- `Investigación`
- `Tratamientos`
- `Familias`
- `Educación`
- `Asociaciones`
- `Eventos`
- `Divulgación`

Públicos usados en los filtros:

- `Familias`
- `Personas con Tourette`
- `Profesionales`
- `Docentes`

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub llamado `novedades-tourette`.
2. Sube el proyecto:

```bash
git init
git add .
git commit -m "Crear prototipo inicial"
git branch -M main
git remote add origin https://github.com/sergioberdiales/novedades-tourette.git
git push -u origin main
```

3. El archivo `astro.config.mjs` utiliza el subdominio de APASTTA como dirección pública:

```js
site: "https://noticias.touretteasturias.org",
base: "/",
```

4. En GitHub, ve a `Settings` > `Pages`.
5. En `Build and deployment`, elige `GitHub Actions`.
6. El archivo `.github/workflows/deploy.yml` despliega automáticamente la web estática al hacer push a `main`.

Esta primera fase no incluye automatización editorial ni generación de contenidos. El despliegue de GitHub Pages solo serviría para publicar el sitio estático cuando se suban cambios.

## Dominio público noticias.touretteasturias.org

GitHub Actions compila Astro al recibir cambios en `main` y despliega en el entorno `github-pages`. La URL pública es `https://noticias.touretteasturias.org/`. La dirección anterior era `https://sergioberdiales.github.io/novedades-tourette/`. Los DNS del dominio institucional se gestionan en WordPress.com.

GitHub verificó la titularidad del subdominio con un TXT. El CNAME explícito `noticias` apunta a `sergioberdiales.github.io`. Conserva ambos registros mientras el subdominio esté asociado a GitHub Pages.

### Reproducir la configuración del dominio

1. Prepara en una rama el cambio en `astro.config.mjs` a `site: "https://noticias.touretteasturias.org"` y `base: "/"`. Conserva `trailingSlash: "always"`. Compila y comprueba que portada, fichas, favicon, CSS y scripts se resuelven desde `/` y que los enlaces para compartir incluyen el nuevo host. Guarda el cambio para desplegarlo durante la migración.
2. Desde los **ajustes de la cuenta** de GitHub `sergioberdiales`, abre **Pages → Add a domain** e introduce `noticias.touretteasturias.org`. En WordPress.com, abre **Escritorio de alojamiento → Dominios → touretteasturias.org → Ajustes → Registros DNS → Añadir registro**. Añade el `TXT` con el nombre y valor exactos que muestre GitHub. Para este subdominio, el nombre esperado en la zona es `_github-pages-challenge-sergioberdiales.noticias`. Completa **Verify** en GitHub y conserva el `TXT`.
3. Durante la ventana de cambio, abre **Settings → Pages** del **repositorio** `sergioberdiales/novedades-tourette`. Guarda `noticias.touretteasturias.org` como **Custom domain** y conserva **GitHub Actions** como origen. Con ese origen, la asociación del dominio se configura en Pages.
4. En los registros DNS de WordPress.com, añade el registro explícito `CNAME` con **Nombre** `noticias` y **Destino** `sergioberdiales.github.io`. Usa el TTL predeterminado. Si el panel ya muestra una entrada explícita para `noticias`, edítala. Si el alias actual procede del comodín, el registro explícito prevalecerá para este nombre. Mantén los registros del dominio principal, `www`, correo y demás subdominios.
5. Incorpora a `main` el cambio de Astro preparado en el paso 1 y confirma que finaliza el flujo **Deploy to GitHub Pages**. Consulta el CNAME con `dig noticias.touretteasturias.org CNAME +short`. Cuando GitHub confirme el DNS y disponga del certificado, activa **Enforce HTTPS**.
6. Comprueba la portada, una ficha abierta directamente, búsqueda, filtros, copiar enlace y carga de recursos por HTTPS. Prueba también la portada y una ficha con la URL anterior para comprobar la redirección. Actualiza el menú de WordPress.com cuando funcionen las rutas públicas del subdominio.

Si hay que volver atrás, retira el CNAME explícito hacia GitHub de la zona DNS o repón el valor previo si el registro existía. Mantén la verificación durante la propagación. Quita el dominio personalizado de Pages y vuelve a desplegar con `site: "https://sergioberdiales.github.io"` y `base: "/novedades-tourette"`. Comprueba la portada y una ficha con sus URL anteriores.

[Dominios personalizados en GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) · [Verificación de dominio en GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) · [Registros DNS en WordPress.com](https://wordpress.com/support/domains/custom-dns/add-a-new-dns-record/)

### Enlace desde la web institucional

La web de APASTTA usa un tema clásico. En WordPress.com, abre **Apariencia → Menús**, selecciona el menú principal y añade un **Enlace personalizado** con el texto `Noticias Tourette` y la URL `https://noticias.touretteasturias.org/`, por ejemplo junto a `Blog` o `Publicaciones APASTTA`. Si el panel ofrece el personalizador, la ruta equivalente es **Apariencia → Personalizar → Menús**. Comprueba el enlace también desde el menú móvil.

La aplicación ya identifica a APASTTA y enlaza de vuelta a su web desde la cabecera. La vinculación se puede hacer mediante un enlace directo y conservar así la navegación, la búsqueda y los enlaces individuales de la aplicación. Si en la futura plataforma se quiere reforzar la continuidad visual, bastaría con acordar el uso del nombre, el logotipo y los colores institucionales.

[Añadir enlaces a un menú de WordPress.com](https://wordpress.com/support/menus/add-links-to-a-menu/)

## Roadmap futuro

- Revisar el prototipo con socios, familias y profesionales.
- Ampliar el catálogo de contenidos reales verificados.
- Añadir criterios editoriales: fuentes aceptadas, fecha de revisión, responsable de revisión y nivel de evidencia.
- Crear una automatización semanal con GitHub Actions para recopilar candidatas desde fuentes predefinidas.
- Incorporar una fase asistida por LLM para proponer resúmenes en español, siempre con revisión humana antes de publicar.
- Añadir control de cambios y fecha de última revisión de cada ficha.
- Explorar integración o enlace desde la web oficial de APASTTA si el formato resulta útil.
