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

// Recuperiamo dal DOM il contenitore dove inseriremo le card
const outputCont = document.getElementById("container");

// URL dell'endpoint API da cui recuperare le info
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";


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
            const { url, title, data } = post;

            // Aggiungiamo alla stringa HTML una nuova card
            postsOutput += `
            <div class="card">
                <div class="container-img">
                    <img class="img" src="${url}" alt="">
                </div>
                <h2>${title}</h2>
                <span>${data}</span>
            </div>`;

            // Log di debug per controllare cosa succede ad ogni iterazione
            console.log("alla iterazione numero", index, postsOutput);
        })

        // Inseriamo tutto l'HTML generato dentro il container
        outputCont.innerHTML = postsOutput;

    })
    .catch(error => {
        // Questo codice viene eseguito se la chiamata fallisce
        console.error("Errore nella chiamata API:", error);
    });