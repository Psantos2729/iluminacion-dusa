#!/usr/bin/env python3
"""
Prepara las fotos de un cliente para la base de páginas y analiza su estilo.

Uso (desde la carpeta del sitio):
    python herramientas/preparar_fotos.py CARPETA_CON_FOTOS [--max 10] [--salida assets/galeria]

Qué hace:
  1. Lee las fotos (jpg, png, webp) que le pasas: las que el cliente te envió, o las que él autorizó.
  2. Descarta duplicadas y las de baja resolución (lado corto menor a 600px).
  3. Las reduce a 1200px de ancho máx. y las guarda como .webp en assets/galeria/.
  4. Analiza: paleta dominante, brillo, saturación, proporción típica (vertical/horizontal).
  5. Escribe assets/galeria/analisis.json y assets/galeria/carrusel.html (las <img> listas para pegar).

Requiere:  pip install pillow
NO descarga nada de Instagram ni de ningún sitio. Solo trabaja con archivos que ya tienes.
"""
import argparse, json, hashlib, statistics, sys
from pathlib import Path
from PIL import Image, ImageOps

EXT = {'.jpg', '.jpeg', '.png', '.webp'}

def huella(im):
    """Huella perceptual simple (average hash 8x8) para detectar duplicadas."""
    g = im.convert('L').resize((8, 8))
    px = list(g.tobytes()); m = sum(px) / len(px)
    bits = ''.join('1' if p > m else '0' for p in px)
    color = im.convert('RGB').resize((1, 1)).getpixel((0, 0))  # color medio: dos fotos distintas pueden tener la misma forma
    return bits, color

def parecidas(a, b):
    bits = sum(x != y for x, y in zip(a[0], b[0]))
    color = sum(abs(x - y) for x, y in zip(a[1], b[1]))
    return bits <= 4 and color < 40

def paleta(imagenes, n=5):
    """Paleta dominante agrupando los colores de todas las fotos."""
    muestra = Image.new('RGB', (64 * len(imagenes), 64))
    for i, im in enumerate(imagenes):
        muestra.paste(im.convert('RGB').resize((64, 64)), (64 * i, 0))
    q = muestra.quantize(colors=n, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()[: n * 3]
    cuenta = sorted(q.getcolors(), reverse=True)
    return ['#%02X%02X%02X' % tuple(pal[i * 3: i * 3 + 3]) for _, i in cuenta]

def brillo_y_saturacion(imagenes):
    bs, ss = [], []
    for im in imagenes:
        c = im.convert('RGB').resize((32, 32))
        raw = c.convert('HSV').tobytes()
        n = len(raw) // 3
        bs.append(sum(raw[2::3]) / n / 255)
        ss.append(sum(raw[1::3]) / n / 255)
    return statistics.mean(bs), statistics.mean(ss)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('entrada'); ap.add_argument('--max', type=int, default=10)
    ap.add_argument('--salida', default='assets/galeria')
    a = ap.parse_args()
    ent, sal = Path(a.entrada), Path(a.salida)
    if not ent.is_dir():
        sys.exit(f'No existe la carpeta {ent}')
    sal.mkdir(parents=True, exist_ok=True)

    vistas, buenas, avisos = [], [], []
    for f in sorted(p for p in ent.iterdir() if p.suffix.lower() in EXT):
        try:
            im = ImageOps.exif_transpose(Image.open(f)); im.load()
        except Exception as e:
            avisos.append(f'{f.name}: no se pudo abrir ({e})'); continue
        w, h = im.size
        if min(w, h) < 600:
            avisos.append(f'{f.name}: resolución baja ({w}x{h}), se descarta'); continue
        hu = huella(im)
        if any(parecidas(hu, v) for v in vistas):
            avisos.append(f'{f.name}: parece duplicada, se descarta'); continue
        vistas.append(hu); buenas.append((f, im))

    buenas = buenas[: a.max]
    if len(buenas) < 3:
        sys.exit('Se necesitan al menos 3 fotos buenas (el carrusel en anillo no funciona con menos). ' + ' | '.join(avisos))

    ims, filas = [], []
    for i, (f, im) in enumerate(buenas, 1):
        im = im.convert('RGB')
        if im.width > 1200:
            im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
        nombre = f'foto-{i:02d}.webp'
        im.save(sal / nombre, 'WEBP', quality=82, method=6)
        ims.append(im); filas.append((nombre, im.size))

    props = [w / h for _, (w, h) in filas]
    mediana = statistics.median(props)
    pal = paleta(ims)
    brillo, sat = brillo_y_saturacion(ims)
    prop_sugerida = 0.8 if mediana < 0.95 else (1.0 if mediana < 1.2 else 1.33)
    tema = ('A (oscuro) o D (editorial)' if brillo < 0.42 else
            'B (spa) o E (cálido)' if sat < 0.40 else 'C o E según el negocio')

    resumen = {
        'fotos_usadas': len(filas), 'descartadas': avisos,
        'paleta_dominante': pal, 'brillo_medio': round(brillo, 2), 'saturacion_media': round(sat, 2),
        'proporcion_mediana_ancho_alto': round(mediana, 2), 'data_proporcion_sugerida': prop_sugerida,
        'tema_sugerido': tema,
        'nota': 'Sugerencias automáticas: confirma con el cliente y con tu criterio.',
        'archivos': [n for n, _ in filas],
    }
    (sal / 'analisis.json').write_text(json.dumps(resumen, ensure_ascii=False, indent=2), encoding='utf-8')

    html = [f'<div class="carrusel3d" data-carrusel data-proporcion="{prop_sugerida}" data-ancho="260" data-titulos="si">']
    for n, (w, h) in filas:
        html.append(f'  <img src="assets/galeria/{n}" alt="{{{{ALT {n}}}}}" width="{w}" height="{h}" loading="lazy" data-titulo="{{{{TITULO}}}}">')
    html.append('</div>')
    (sal / 'carrusel.html').write_text('\n'.join(html) + '\n', encoding='utf-8')

    print(json.dumps(resumen, ensure_ascii=False, indent=2))
    print(f'\nListo: {len(filas)} fotos en {sal}/. Pega {sal}/carrusel.html en tu index.html y escribe los alt.')

if __name__ == '__main__':
    main()
