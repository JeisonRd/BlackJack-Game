        //funcion anonima, que no se puede llamar por nombre
        // Esta funcion se ejecuta automaticamente, pero no se puede saber donde esta ubicada
        // Asi aplicamos el patron modulo
  const miModulo = (() => {
        'use strict' // Hace que js sea estricto con el codigo, se debe de usar en conjunto con este patron

// Dentro de este patron restringimos el acceso a todas nuestras funciones

        // Creando el deck, 
        let deck = [];
        const tipos = ['C', 'D', 'H', 'S'];
        const especiales = ['A','J', 'Q', 'K']

        let puntosJugadores = [];
        // let puntosJugador = 0;
        // let puntosComputadora = 0;  

        

        // Referencias HTML
        const btnPedir = document.querySelector('#btnPedir');
        const btnDetener = document.querySelector('#btnDetener');
        const btnNuevo = document.querySelector('#btnNuevo');
      
        const divCartasJugadores = document.querySelectorAll('.divCartas'),
              puntosHTML = document.querySelectorAll('small');

        const inicializarJuego = (numJugadores = 2) => {
         deck = CrearDeck();
         for (let i = 0; i < numJugadores; i++) {      
         puntosJugadores.push(0);
          }
         
            puntosHTML.forEach(elemnt => elemnt.innerText = 0);

            divCartasJugadores.forEach(elemnt => elemnt.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        };
    

        const CrearDeck = () =>{

            deck = [];
        for(let i = 2; i <= 10; i++){
        for (let tipo of tipos) {

            deck.push(i + tipo);

        }
        
        };


        for (let tipo of tipos) {
        for(let esp of especiales){

            deck.push( esp + tipo);
        }  

        };



        return  _.shuffle(deck);
        
        };
          

        // Funcion para tomar una carta

        const pedirCarta = () => {

            if(deck.length === 0){
        // throw lanza un error en consola
                throw('No hay cartas en el deck');
            };


        // Quiero una extraer una carta y luego borrarla, con pop hacemos esto ya que borra un elemento y luego lo retorna 
        return deck.pop();
            
        };


        //pedirCarta();


        const valorCarta = (carta) => {

            const valor = carta.substring(0, carta.length - 1);
        let puntos = 0;

        // 10 = 10 , 3 = 3, etc
        //En blackjack j,k,q valen 10 y la A 11

        // isNaN = Is not a number
        if (isNaN(valor)){
        
            //Operador ternario
            puntos = (  valor === 'A' ) ? 11 : 10;


        } else {
            console.log('Es un numero');
        puntos = valor * 1; // Lo que sucede aqui es que tomamos en primer valor de lo que estan en nuestro array
        // Que sucede, estamos buscando el valor numerico, al final lo agregamos en nuestra variable puntos, pero hay un problema
        // Se agrega como string, por lo tanto para retornarlo como int, multiplicamos * 1 

        }

        //  console.log(puntos);

        return 

        };

        const valorCartaResumido = (carta) => {

            const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;

        };


        //const valor = valorCartaResumido('//');
        ///console.log(valor);



        //Funcion Acumular puntos
//0 Primer jugador y ultimo la computadora
const acumularPuntos = (carta, turno) => {
    
    puntosJugadores[turno] = puntosJugadores[turno]  + valorCartaResumido(carta);    
    puntosHTML[turno].innerText = puntosJugadores[turno] ;
    
    return puntosJugadores[turno];

};


//Funcion crear carta

const crearCarta = (carta, turno) => {


             const imgCarta = document.createElement('img');
             imgCarta.src = `Assets/cartas/${carta}.png`
             imgCarta.classList.add('carta');
             divCartasJugadores[turno].append(imgCarta)
};


//funcion para definir quien gana

const Definirganador = () => {
    
    //destructuracion de arrays, paso dos parametros y los extraigo de: puntosJugadores
    const [puntosMinimos, puntosComputadora] = puntosJugadores;
    
    setTimeout(() => {    

        if (puntosComputadora === puntosJugadores){
            alert('Nadie gana')
        } else if (puntosMinimos > 21) {
            alert('Computadora Gana!')
        }  else if (puntosComputadora > 21) {
            alert(' Jugador Gana!')
        } else {
            alert('Computadora Gana!');
        }

        }, 10);

}

 //Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
            let puntosComputadora = 0;

            do {

                const carta = pedirCarta();
                  puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
                  crearCarta(carta, puntosJugadores.length - 1);            

         

        } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ));

            Definirganador();
      
        };


        /// eventos
 btnPedir.addEventListener('click', () => {
        
        
            const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21){
            console.warn('Usted ha perdido');
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21){
            alert('Ganaste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        }

        }); 



btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);

        });


btnNuevo.addEventListener('click', () => {

            inicializarJuego();
 


        });

        // Lo que se ponga en el return, se puede hacer publico, se va poder accesar a traves del nombre del patron o la funcion vacia
        return {
            nuevoJuego: inicializarJuego // Quiero hacer publico inicializar juego y se 
        }

        })();

