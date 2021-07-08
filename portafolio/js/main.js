/*               ....... MUURI........

 Este bloque es para poder ejecutar la libreria MUURI 
 donde cogemos la propiedad roundding y de true lo pasamos a false para que no 
 ejecute aleatoriamente el tamaño de las imagenes con las cuales esta interactuando
 
 */


const grid = new Muuri('.grid',{
  layout: {
    rounding: false,
  }
});

/* funcion para ejecutar al cargar la pagina*/

window.addEventListener("load", () => {

  /* este es para que laa imagenes se acomoden segun el tamaño de la pagina

  refreshItems(): esta funcion es para que al momento de que la pantalla se vaya modificando 
  refresque las imagenes y les de el tamaño que se le espesifico. 
  
  layout(): es el diseño de la estructura de la grid*/
  grid.refreshItems().layout();

  // este evento es para recargar las imagenes una ves cargue la pagina
  document.querySelector('#grid').classList.add('imagenes-cargadas');

  /* seleccionar los enlaces y filtar por categorias
  
  document. : selecciona todo el documento.
  querySelectorAll: devuelve una lista de nodos estatica (no viva) que representa una lista de elementos
  del documentos que considen con el grupo de selectores indicados (dentro de el parentesis se le espesifica de donde quiero que coja los elementos)
  En la siguiente estructura forme una constante la cual tiene guarda : quiero que interactue con el documento y seleccione todos los enlaces del id:categorias*/
  const enlaces = document.querySelectorAll('#categorias a');

  /* froEach(): ejecuta la funcion callback una ves por cada elemento cel array;
     callback: (llamada de vuelta) es una funcion que recibe como argumento otra funcion y la ejecuta 
     
     en la siguiente estructura seleccionmos la constante guardada y hacemos unforEach para recorrer todos los enlaces que se guardaron, dentro hacemos una funcion tipo flecha y se le da un parametro*/
  enlaces.forEach( (elemento) => {

    /* addEventListener: registra un evento a un objeto en especifico. El objeto Especifico puede ser un     simple elemento o un archivo, el mismo documento, una ventana o un XMLHttpRequest.
      
       XMLHttpRequest:  Los objetos (XHR) se utilizan para interactuar con los servidores. Puede recuperar datos de una URL sin tener que actualizar la pagina completa. Esto permite que una pagína web actualice solo una parte de la página sin interrmpir lo que está haciendo el usuario.
       
       cogemos el parametro que le dimos a la funcion y le desimos que haga el evento click, lo cual que cuando haga click en las imagenes me haga la siguiente funcion de flecha con parametro evento*/
    elemento.addEventListener('click', (evento) => {

      /* preventDefault: cancela el evento si es cancelable, lo que significa que la acción predeterminada que pertenece al evento no ocurrirá.
      
      el siguiente codigo es para prevenir el comportamiento por defecto.que tiene vel navegador*/
      evento.preventDefault();

      /* classList: es una forma práctica de acceder a la lista de clases de un elemento
         remove: remover.
         
         cogemos la const enlaces y hacemos un recorrido con un foreach donde hacemos una funcion tipo flecha de una sola linea la cul no lleva corchetes, este va a recorrer todos los enlaces y va a mirar cual tiene la clase activo y se la va a qar */
      enlaces.forEach( (enlace) => enlace.classList.remove('activo'));

      /* target: La propiedad de destino obtiene el elemento en el que ocurrió originalmente el evento
      
      cojo el parametro evento al dar click me muestre con target cual elemento precione y le ponga la clase activo.*/
      evento.target.classList.add('activo');

      /* innerHTML: La propiedad Element.innerHTML devuelve o establece la sintaxis HTML describiendo los descendientes del elemento.
      Al establecerse se reemplaza la sintaxis HTML del elemento por la nueva.
      toLowerCase():  devuelve el valor en minúsculas de la cadena que realiza la llamada.
      
      se crea una constante categoria donde miramos el parametro evento, con target miramos cual fue selecionado y con innerHTML seleccionamos la estructura del hatml y la modificamos pasandola a minusculas con toLowerCase*/
      const categoria = evento.target.innerHTML.toLowerCase();

      /* ESTA ES UN BUCLE IF EN UNA SOLA LINEA
      
      filter: crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
      
      Si categoria es igual a todos entonces: entonces en la grid mire tdos los atributos que considan con [data-categoria] y si no filtreme por la categuerio a la cual le dimos click*/
      
      categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
    })
  });

  // ...........................BARRA DE BUSQUEDA........................

  /* El elemento HTML <input> se usa para crear controles interactivos para formularios basados en la web con el fin de recibir datos del usuario.Hay disponible una amplia variedad de tipos de datos de entrada y widgets de control, que dependen del dispositivo y el agente de usuario (user agent).El elemento <input> es uno de los más potentes y complejos en todo HTML debido a la gran cantidad de combinaciones de tipos y atributos de entrada.
  
  Cogemos todo el documento y seleccionamos el ID.barra-busqueda el cual va a añadir un eevento input con una funcion flecha y parametro evento */
  document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {

    /* value: devuelve un array con los valores correspondientes a las propiedades enumerables de un objeto.
    
    creamos una constante busqueda la cual va a guardar: parametro evento va a mirar que se a escrito en el input y lo va a validar*/
    const busqueda = evento.target.value;

    /* getElement: Devuelve una referencia al elemento
    dataset: proporciona una interfaz lectura/escritura para obtener todos los atributos de datos personalizados (data-*) de cada uno de los elementos.
    includes: determina si una matriz incluye un determinado elemento, devuelve true o false según corresponda.
    
    vamos a filtrar enla grid la siguiente funcion de flecha, le damos un parametro item => miramos toso los elementos donde seleccionamos dta etiquetas y miramos si lo escrito en la barra de busqueda conside con alguno. */
    grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda));
  })

  // Licener para las imagenes

  /* se crea una variable que acceda al id overlay*/
  const overlay = document.getElementById('overlay');

  /* en este codigo queremos que acceda al documento sssssssssscione todos los documentos acceda a la clase grid y dentro a la clse items y que coja todas las img y que por cada img me ejecute una funcion*/
  document.querySelectorAll('.grid .item img').forEach((elemento) => {

    

    /* cojemos el parametro elemento y le damos el evento click y ejecutaos una funcion tipo flecha  */
    elemento.addEventListener('click', () => {

      /* getAttribute: devuelve el valor del atributo especificado en el elemento. Si el atributo especificado no existe, el valor retornado puede ser tanto null como "" (una cadena vacía).
    Hacemos una variable la cual me coja todos los elementos y de ellos queremos obtener el atributo src*/ 
    const ruta = elemento.getAttribute('src');

    /* parentNode: devuelve el padre del nodo especificado en el árbol.
    hago otra variable la cual cojamos la desacripcion en el cual vamos a acceder al padre y al padre de el, luego al datad*/
    const descripcion = elemento.parentNode.parentNode.dataset.descripcion 

      /* cogemos la variable de overlay accedemos a la cases y le agregaamos la clase activo */
      overlay.classList.add('activo')

      /* accedemos al documento y accedemos al id overlay a las imagenes y queremos que la src sea igual a la ruta */
      document.querySelector('#overlay img').src = ruta;

      /* accedemos al documento y accedemos al id overlay a la clase de descripcion y queremos que su innerHTML sea igual a DESCRIPCION */
       document.querySelector('#overlay .descripcion').innerHTML = descripcion;
    })
  }) 

  // EventLisener del boton cerrar

  /* accedemos al documento y accedemos al id del boton y le agregamos un evento que va a ser de tipo click, hacmos una funcion tipo flecha*/
  document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {

    /* accedemos a la variable overlay y removemos la clace de activo */
    overlay.classList.remove('activo');
  })
  
  // Evenlisenert del overlay

  /* cogemos el overlay y le agregamos un evento click y hacemos una funcion tipo flecha */
  overlay.addEventListener('click', (evento) => {

    /* vamos a coger el evento le damos un target donde selecione solo los id y si cumple con esto ejecute */
    evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
  })
})

