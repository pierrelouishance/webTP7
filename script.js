let livresEnVente = [
    {id: 1, nom: 'Livre 1', auteur: 'Auteur 1', prix: 10},
    // Ajoutez plus de livres ici
];

let livresVendus = [
    {id: 2, nom: 'Livre 2', auteur: 'Auteur 2', prix: 20},
    // Ajoutez plus de livres ici
];

function afficherLivres() {
    $('#livresEnVente').html('');
    $('#livresVendus').html('');
    livresEnVente.forEach(livre => {
        $('#livresEnVente').append(`
            <div class="card m-2" draggable="true" id="${livre.id}">
                <div class="card-body">
                    <h5 class="card-title">${livre.nom}</h5>
                    <p class="card-text">${livre.auteur}</p>
                    <p class="card-text">${livre.prix}€</p>
                    <button onclick="supprimerLivre(${livre.id}, 'vente')" class="btn btn-primary">Supprimer</button>
                </div>
            </div>
        `);
    });
    livresVendus.forEach(livre => {
        $('#livresVendus').append(`
            <div class="card m-2" draggable="true" id="${livre.id}">
                <div class="card-body">
                    <h5 class="card-title">${livre.nom}</h5>
                    <p class="card-text">${livre.auteur}</p>
                    <p class="card-text">${livre.prix}€</p>
                </div>
            </div>
        `);
    });
}

function supprimerLivre(id, type) {
    if (type === 'vente') {
        livresEnVente = livresEnVente.filter(l => l.id !== id);
    }
    afficherLivres();
}

$('#ajouterLivre').submit(function(e) {
    e.preventDefault();
    let nom = $('#nom').val();
    let auteur = $('#auteur').val();
    let prix = $('#prix').val();
    let id = Math.max(...livresEnVente.map(l => l.id), ...livresVendus.map(l => l.id)) + 1;
    livresEnVente.push({id, nom, auteur, prix});
    afficherLivres();
});

afficherLivres();

const addBehaviorToBook = (book) => {
    const bookId = book.id || window.crypto.randomUUID()
    $(book).attr('id', bookId)

    $(book).on('dragstart', (event) => {
        event.originalEvent.dataTransfer.setData("book-id", bookId)
    })

    $(book).on('dragend', (event) => {
        event.preventDefault()
    })
}

const addBehaviorToList = (list, type) => {
    $(list).on('dragover', (event) => {
        event.preventDefault()
    })

    $(list).on('drop', (event) => {
        event.preventDefault();
        const dragged_book_id = event.originalEvent.dataTransfer.getData("book-id");
        const book = $('#' + dragged_book_id);

        book.fadeOut(300, function () {
            book.appendTo($(event.target)).fadeIn(300)
            const livre = livresEnVente.find(l => l.id === parseInt(dragged_book_id)) || livresVendus.find(l => l.id === parseInt(dragged_book_id));
            if (type === 'vente') {
                livresEnVente.push(livre);
                livresVendus = livresVendus.filter(l => l.id !== livre.id);
            } else if (type === 'vendu') {
                livresVendus.push(livre);
                livresEnVente = livresEnVente.filter(l => l.id !== livre.id);
            }
        })
    })
};

const main = () => {
    $(".card").attr('draggable', true).each(function () {
        addBehaviorToBook(this)
    })

    addBehaviorToList("#livresEnVente", 'vente');
    addBehaviorToList("#livresVendus", 'vendu');
}

$(document).ready(main);
