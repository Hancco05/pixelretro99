Localhost 99 retro games

Reproductor web para jugar juegos de PlayStation 1 en el navegador usando EmulatorJS.

¿Qué necesitas?

- Una BIOS de PS1 (archivo `.bin`, 512 KB).
- Una ISO del juego (archivo `.iso`).
- Un servidor local para abrir la página (por ejemplo Python).

¿Dónde pongo los archivos?

Deja tu BIOS en la carpeta:

    bios/

Deja tu juego (ISO) en la carpeta: 

    roms/

Ejemplo:

    bios/SCPH1001.BIN
    roms/SHill.iso

Puedes usar cualquier BIOS y cualquier ISO que tengas.
Solo respeta que la BIOS sea .bin y la ISO sea .iso.

¿Cómo le digo al index qué archivos usar?

Abre el archivo index.html y busca estas dos líneas al final:

    EJS_biosUrl = 'bios/scph5501.bin';
    EJS_gameUrl = 'roms/SHill.iso';

Cambia el nombre por el tuyo. Por ejemplo:

    EJS_biosUrl = 'bios/SCPH1001.BIN';
    EJS_gameUrl = 'roms/SHill.iso';

Importante: el nombre tiene que coincidir EXACTAMENTE
con el archivo que dejaste en la carpeta.
Cuidado con las mayúsculas y minúsculas.

¿Cómo lo ejecuto?

1. Abre una terminal en la carpeta del proyecto.

2. Ejecuta:

    python -m http.server 8000

3. Abre el navegador en:

    http://localhost:8000

4. Pulsa F11 para pantalla completa.

Controles por defecto

    Flechas ....... mover
    Z ............. botón A
    X ............. botón B
    Enter ......... Start
    V ............. Select
    Q / E ......... L1 / R1

Se pueden cambiar desde el icono de mando dentro del emulador.

<img width="1536" height="681" alt="capturaprincipal1 jpg" src="https://github.com/user-attachments/assets/dbb5014e-7d7a-479c-9c63-d723e8c7c879" />


Notas

- El navegador no puede ejecutar archivos .exe.
- Solo funciona con BIOS .bin y juegos .iso.
- Los archivos pesan bastante, la primera carga tarda un poco.
- No subas BIOS ni ISOs a GitHub, superan el límite y tienen copyright.

Aviso legal
Usa tus propios respaldos legales.
Este proyecto no incluye ni distribuye BIOS ni ISOs.

ESTE PROYECTO ES DE LIBRE USO.
