# Cartas (PDFs)

Esta carpeta contiene los PDFs de las cartas que se enlazan desde la web.

## Archivos esperados

La web (`raco_web.html`) enlaza a estos nombres exactos:

| Archivo | Bloque en la web |
|---|---|
| `carta-desayunos.pdf` | Desayunos · Sin reserva |
| `carta-comida-cena.pdf` | Comida y cena · Menú de mediodía y carta de noche |

## Cómo actualizar la carta

1. Abre este repo en GitHub: https://github.com/companyfernandezagnes-hue/raco-web
2. Ve a la carpeta `cartas/`
3. Botón **"Add file" → "Upload files"**
4. Arrastra el PDF nuevo (debe llamarse igual que el anterior — ej: `carta-comida-cena.pdf`)
5. Abajo, **"Commit changes"**
6. Listo — la web ya muestra la nueva carta

## Si quieres cambiar nombres / añadir más cartas

Si en lugar de "Comida y cena" prefieres separar en "Comida" + "Postres", o añadir más PDFs:

1. Edita `raco_web.html` en GitHub buscando la sección `<!-- CARTA -->`
2. Cambia `href="cartas/carta-comida-cena.pdf"` por el nombre nuevo
3. Cambia los textos `cpb-label`, `cpb-name`, `cpb-desc`
4. Acuérdate de actualizar también las traducciones (CA y EN) más abajo en el JS
