'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/
// Codes des touches du clavier.
const SPACE_KEY= 'Space';
const LEFT_ARROW_KEY = 'ArrowLeft';
const RIGHT_ARROW_KEY = 'ArrowRight';

// La liste des slides du carrousel. un tableau avec un objet pour chaque index avec les infos de l'image dedans que l'on stock dans une constante
 
const slides = 
[
    { image: 'images/1.jpg', legend: 'Street Art'          },
    { image: 'images/2.jpg', legend: 'Fast Lane'           },
    { image: 'images/3.jpg', legend: 'Colorful Building'   },
    { image: 'images/4.jpg', legend: 'Skyscrapers'         },
    { image: 'images/5.jpg', legend: 'City by night'       },
    { image: 'images/6.jpg', legend: 'Tour Eiffel la nuit' }
];

let img = document.querySelector('img');
let figcaption = document.querySelector('figcaption');
let buttonToggled = document.querySelector('#slider-toggle');
let ul = document.querySelector('ul');
let nav = document.createElement('nav');
let miniatures = document.getElementsByClassName('miniature');
// Objet contenant l'état du carrousel.
let state = {slidesState: 0,
            startCarrousel: false,
            intervalCarrousel: 0,
            focused: []};

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/
//aller vers l'image suivante
function onSliderGoToNext()
{
    // Passage à la slide suivante.
    state.slidesState ++;

    // Si on est arrivé à la fin de la liste des slides ? (condition)
    if(state.slidesState > slides.length-1){
    //on revient au début (le carrousel est circulaire).
        state.slidesState = 0;
        state.focused[slides.length-1].classList.remove('focused');
    } else {
        state.focused[state.slidesState-1].classList.remove('focused');
    }
    
    // Mise à jour de l'affichage.
    refreshSlider();
    state.focused[state.slidesState].classList.add('focused');
}
//aller vers l'image précédente
function onSliderGoToPrevious()
{
    // Passage à la slide précédente.
    state.slidesState --;
    // si on est revenu au début de la liste des slides ?
    if(state.slidesState == -1){
        //on revient à la fin (le carrousel est circulaire).
        state.slidesState = slides.length-1;
        state.focused[0].classList.remove('focused');
    } else {
        state.focused[state.slidesState+1].classList.remove('focused');
    }
    // Mise à jour de l'affichage.
    refreshSlider();
    state.focused[state.slidesState].classList.add('focused');
}
//va afficher une photo aléatoire
function onSliderGoToRandom()
{
    let index = state.slidesState;
    let previousIndex = index;
    
    //boucle
    do{
        /*
         * Récupération d'un numéro de slide aléatoire différent
         * du numéro de slide actuel.
         */
        index = getRandomInteger(0,slides.length-1);

    }while(state.slidesState == index)
    state.focused[previousIndex].classList.remove('focused');
    // Passage à une slide aléatoire.
    state.slidesState = index;
    state.focused[state.slidesState].classList.add('focused');
    // Mise à jour de l'affichage.
    refreshSlider()
}

/*
 * Quand on créé un gestionnaire d'évènements, le navigateur appelle la
 * fonction en fournissant un argument event représentant l'évènement lui-même.
 *
 * Si le gestionnaire d'évènements n'a pas besoin de cet argument,
 * inutile de le déclarer !
 *
 * Mais ici on va en avoir besoin...
 */
function onSliderKeyUp(event)
{
    /*
     * Les gestionnaires d'évènements d'appui sur une touche (évènements
     * keydown, keyup, keypress) contiennent une propriété keyCode dans l'objet
     * event représentant le code de la touche du clavier.
     *
     * Il existe de très nombreux codes, plus ou moins standards, voir la page :
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
     
     CONDITION ICI SELON LA TOUCHE APPUYEE par rapport aux 3 touches (constantes globales)
     */
    console.log(event)
     switch (event.code){
        case SPACE_KEY:
            onSliderToggle();
            //installEventHandler('html', 'keyup', onSliderToggle);
        break;
        case LEFT_ARROW_KEY:
            onSliderGoToPrevious();
        break;
        case RIGHT_ARROW_KEY:
            onSliderGoToNext();
        break;
     }
     
}
// lecture automatique aléatoire

function onSliderToggle()
{
    // Modification de l'icône du bouton pour démarrer ou arrêter le carrousel. (voir les classes css)
    buttonToggled.classList.toggle('toggled');
    //this.classList.toggle('toggled')
    
    // si le carousel n'est pas démarré ?
        
        if (state.startCarrousel == false){
            //démarrage du carousel, toutes les deux secondes.
            state.startCarrousel = true;
            
            console.log(`startCarrousel : ${state.startCarrousel}`)
            buttonToggled.textContent = "ON";
            //this.textContent = "ON";
            state.intervalCarrousel = setInterval(onSliderGoToRandom, 2000);
            /*
            * Modification du libellé du bouton en mode "OFF".
            *
            * La variable spéciale this est automatiquement initialisée par le
            * navigateur avec l'objet DOM qui a déclenché l'évènement.
            *
            * C'est le bouton "Démarrer/Arrêter le carrousel" qui a déclenché
            * l'évènement, donc la variable spéciale this vaut la même chose
            * que l'objet renvoyé par document.querySelector('#js-slider-toggle');
            * modifier l'attribut title
            */
        } else {
 
        //sinon
        
            //arrêt du carousel.
            // Réinitialisation de la propriété pour le prochain clic sur le bouton.
            buttonToggled.textContent = "OFF";
            //this.textContent = "OFF";
            state.startCarrousel = false;
            console.log(`startCarrousel : ${state.startCarrousel}`);
            clearInterval(state.intervalCarrousel);
            /*
            * Modification du libellé du bouton en mode "ON".
            *
            * La variable spéciale this est automatiquement initialisée par le
            * navigateur avec l'objet DOM qui a déclenché l'évènement.
            *
            * C'est le bouton "Démarrer/Arrêter le carrousel" qui a déclenché
            * l'évènement, donc la variable spéciale this vaut la même chose
            * que l'objet renvoyé par document.querySelector('#js-slider-toggle');
            */
        }
        
        
         
}
//change l'icon du bouton pour ouvrir ou cacher le menu
function onToolbarToggle()
{
    // Modification de l'icône du lien pour afficher ou cacher la barre d'outils. (class css)
    installEventHandler('.toolbar', 'click', () =>{
        ul.classList.toggle('hidden');
    });
    // Affiche ou cache la barre d'outils.
}
//mise à jour du slider
function refreshSlider()
{
    // Recherche des balises de contenu du carrousel.
    img.src = slides[state.slidesState].image;
    figcaption.textContent = slides[state.slidesState].legend;
    // Changement de la source de l'image et du texte de la légende du carrousel.
    
}

/*************************************************************************************************/
/* ************************************** BONUS *************************************** */
/*************************************************************************************************/
/*Fonction ajoutant des miniatures des images disponibles */

function miniList(){


    document.body.appendChild(nav);
    for(let i=0; i< slides.length; i++)
    {
        let newMiniImg = document.createElement('img');
        nav.appendChild(newMiniImg);
        newMiniImg.src = slides[i].image;
        state.focused[i] = nav.childNodes[i];
        newMiniImg.classList.add('miniature')
    }
    state.focused[state.slidesState].classList.add('focused');
}


/*Fonction ajoutant la gestion de l'évenement click sur les miniatures*/

function onMiniClick(){
    Array.from(miniatures).forEach((miniature, index) => {
        miniature.addEventListener('click', () => {
            let previousIndex = state.slidesState;
            state.slidesState = index;
            miniature.classList.add('focused');
            state.focused[previousIndex].classList.remove('focused');

            refreshSlider();
        })
    });
}
/*miniatures.forEach(miniature => {
    console.log(miniature)
});*/

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

/*
 * Installation d'un gestionnaire d'évènement déclenché quand l'arbre DOM sera
 * totalement construit par le navigateur.
 *
 * Le gestionnaire d'évènement est une fonction anonyme que l'on donne en deuxième
 * argument directement à document.addEventListener().
 */
 //au chargement de la page on rend possible les événements suivants
    document.addEventListener('DOMContentLoaded', function() {

    // Initialisation du carrousel. (on crée un objet state)
    
    miniList();

    
    // On commence à la première slide 
    refreshSlider()
    buttonToggled.classList.add('toggled');
    // Le carrousel est arrêté au démarrage
    // Installation des gestionnaires d'évènement.
    onToolbarToggle();
    installEventHandler('html', 'keyup', onSliderKeyUp);
    installEventHandler('#slider-previous', 'click', onSliderGoToPrevious);
    installEventHandler('#slider-toggle', 'click', onSliderToggle);
    installEventHandler('#slider-next', 'click', onSliderGoToNext);
    installEventHandler('#slider-random', 'click', onSliderGoToRandom);
    onMiniClick();
    
    /*
     * L'évènement d'appui sur une touche doit être installé sur l'ensemble de la
     * page, on ne recherche pas une balise en particulier dans l'arbre DOM.
     *
     * L'ensemble de la page c'est la balise <html> et donc la variable document.
     */
     // Affichage initial.

})
