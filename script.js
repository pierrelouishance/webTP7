// const livres =[
//     {
//         titre : "le titre 1",
//         auteur : "l'auteur 2"
//     },
//     {
//         titre : "le titre 2",
//         auteur : "l'auteur 2"
//     }
// ]

let Livre1 = $("<div>").addClass("card");;

let livre1titre = $("<p>Titre : Sherlock Holmes</p>");
let livre1auteur = $("<p>").text("Auteur : Arthur Conan-Doyle");
Livre1.append(livre1titre);
Livre1.append(livre1auteur);


let Livre2 = $("<div>").addClass("card");;

let livre2titre = $("<p>").text("Titre : Sherlock Holmes");
let livre2auteur = $("<p>").text("Auteur : Arthur Conan-Doyle");

Livre2.append(livre2titre);
Livre2.append(livre2auteur);

$("#col_vente").append(Livre1);
$("#col_vente").append(Livre2);





