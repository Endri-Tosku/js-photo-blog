/* 
CONSEGNA

Milestone 1

Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: concentriamoci su HTML e CSS riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)

Milestone 2

Utilizzando Postman, testiamo una chiamata a questo endpoint: 

https://lanciweb.github.io/demo/api/pictures/

Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.

Milestone 3

Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!

Font utilizzati:

titoli:  ‘Edu Tas Beginner’, sans-serif;
date: ‘Sometype Mono’, ‘monospace’;
(Dovreste sapere a questo punto cosa e come prendere da Google Fonts… 😉)

Bonus

rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata

Note

Non siete obbligati a usare Bootstrap: siete liberi di decidere come gestire lo stile 
*/


/* 
CONSEGNA OVERLAY

Milestone 1

Facciamo in modo di creare un overlay che copra l’intera pagina e all’interno, centrata, disponiamo un’immagine qualunque ed un button di chiusura.

Milestone 2

Facciamo sparire l’overlay con l’aiuto di una classe CSS che imposti il display: none .

Dopodiché facciamo sì che cliccando una qualunque foto. L’overlay ricompaia.

Cliccando invece il button di chiusura, l’overlay scompare nuovamente.

Milestone 3

Inseriamo il pezzo di logica finale: quando una foto viene cliccata, dobbiamo fare in modo che sia proprio quella foto a essere mostrata all’interno dell’overlay.

Ci sono diversi modi di farlo, prova a sperimentare 🙂

Bonus

Spostandosi col mouse sopra le foto, queste si zoommano, ruotano di 10 gradi e la loro ombra aumenta, il tutto in manierà fluida. Inoltre il mouse diventa un puntatore, per far capire all’utente che può cliccare 
*/




// Recuperiamo dal DOM il contenitore dove inseriremo le card
const outputCont = document.getElementById("container");

// URL dell'endpoint API da cui recuperare le info
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// overlay refs
const overlay = document.querySelector("#overlay");
const overlayImg = document.querySelector("#overlay-img");
const closeBtn = document.querySelector("#close-btn");


// Effettuiamo una chiamata AJAX usando axios
axios.get(endpoint)
    .then(response => {
        // Questo codice viene eseguito se la chiamata va a buon fine

        // response.data contiene i dati restituiti dall'API
        // in questo caso è un array di oggetti
        const posts = response.data;

        // Stringa vuota che useremo per accumulare l'HTML delle card
        let postsOutput = "";

        // Cicliamo l'array per estrapolare le info
        posts.forEach((post, index) => {

            // Destrutturiamo l'oggetto per estrarre solo i dati che ci servono
            const { url, title, date } = post;

            // Aggiungiamo alla stringa HTML una nuova card
            postsOutput += `
            <div class="card">
                <img src="./img/pin.svg" class="pin" alt="">
                <div class="container-img">
                    <img class="img" src="${url}" alt="">
                </div>
                <h2 class="title">${title}</h2>
                <span class="date">${date}</span>
            </div>`;

            // Log di debug per controllare cosa succede ad ogni iterazione
            console.log("alla iterazione numero", index, postsOutput);
        })

        // Inseriamo tutto l'HTML generato dentro il container
        outputCont.innerHTML = postsOutput;

        const cards = document.querySelectorAll(".card");
        console.log(cards);

        // Ciclo su tutte le card per aggiungere un listener al click
        cards.forEach(card => {
            card.addEventListener("click", () => {
                // Recuperiamo l'immagine all'interno della card cliccata
                const img = card.querySelector(".img");

                // Impostiamo l'immagine dell'overlay uguale a quella cliccata
                overlayImg.src = img.src;

                // Mostriamo l'overlay rimuovendo la classe 'hidden'
                overlay.classList.remove("hidden")

                // Applichiamo lo stile flex all'overlay per centrare contenuto
                overlay.classList.add("d-flex")
            })

        })

        // Aggiungiamo un listener al bottone "Chiudi" per nascondere l'overlay
        closeBtn.addEventListener("click", () => {

            // Nascondiamo l'overlay aggiungendo la classe 'hidden'
            overlay.classList.add("hidden");

            // Rimuoviamo lo stile flex per evitare conflitti di layout
            overlay.classList.remove("d-flex");
        });

    })
    .catch(error => {
        // Questo codice viene eseguito se la chiamata fallisce
        console.error("Errore nella chiamata API:", error);
    });





/* 
///// USIAMO IL CICLO FOR AL POSTO DI forEach /////

axios.get(endpoint)
    .then(response => {
        const posts = response.data;
        let postsOutput = "";

        // Ciclo classico che ripete su tutte le card ricevute dall'API
        for (let i = 0; i < posts.length; i++) {

            // Recuperiamo l'oggetto corrente dall'array "posts"
            const post = posts[i];

            const { url, title, date } = post;

            postsOutput += `
            <div class="card">
                <img src="./img/pin.svg" class="pin" alt="">
                <div class="container-img">
                    <img class="img" src="${url}" alt="">
                </div>
                <h2 class="title">${title}</h2>
                <span class="date">${date}</span>
            </div>`;

            console.log("Iterazione numero", i, postsOutput);
        }

        outputCont.innerHTML = postsOutput;
    })
    .catch(error => {
        console.error("Errore nella chiamata API:", error);
    }); 
    */