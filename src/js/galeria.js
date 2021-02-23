document.addEventListener('DOMContentLoaded', function () {
    crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1 ; i<=12 ; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        //Añadir la imagen a la funcion mostrarImagen
        imagen.onclick = mostrarImagen;
        
        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
        
    }

}

function mostrarImagen(e) {
    //console.log(e.target.dataset.imagenId); //revuelve un numero
    //convertir a numero
    const id = parseInt(e.target.dataset.imagenId);

    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`; // creo el elemento en html

    const overly = document.createElement('DIV');
    overly.appendChild(imagen);
    overly.classList.add('overley');

    //boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent='X';
    cerrarImagen.classList.add('btn-cerrar');

    //cuando se da click se cierre la imagen
    overly.onclick = function() {
        overly.remove();
        body.classList.remove('fijar-body');
    }

    //que cierre cuando se presiona
    cerrarImagen.onclick = function() {
        overly.remove();
        body.classList.remove('fijar-body');
    }

    overly.appendChild(cerrarImagen);

    // muestro en HTML
    const body = document.querySelector('body');
    body.appendChild(overly);
    body.classList.add('fijar-body');
    
}