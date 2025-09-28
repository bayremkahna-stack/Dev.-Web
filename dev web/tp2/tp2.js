
// ========================================
// TP2 : Application de gestion de tâches
// Étapes 7-10 : Tableaux, objets, localStorage et améliorations
// ========================================

// ========================================
// ÉTAPE 7-8 : STRUCTURE DE DONNÉES AVANCÉE
// ========================================

// Tableau des tâches sous forme d'objets (Étapes 7 & 8)
let listeTaches = [
    {
        texte: "Apprendre JavaScript",
        terminee: false,
        id: Date.now() + Math.random(), // ID unique
        dateCreation: new Date().toISOString()
    },
    {
        texte: "Créer mon premier projet web", 
        terminee: false,
        id: Date.now() + Math.random() + 1,
        dateCreation: new Date().toISOString()
    },
    {
        texte: "Pratiquer les variables",
        terminee: false, 
        id: Date.now() + Math.random() + 2,
        dateCreation: new Date().toISOString()
    },
    {
        texte: "Maîtriser les fonctions",
        terminee: false,
        id: Date.now() + Math.random() + 3,
        dateCreation: new Date().toISOString()
    }
];

// Variable pour le filtrage
let filtreActuel = "";


// ========================================
// FONCTIONS DÉDIÉES - LOGIQUE MÉTIER
// ========================================

/**
 * Ajouter une nouvelle tâche à la liste (ÉTAPE 8: Objets)
 * @param {string} texteTache - Le texte de la tâche à ajouter
 * @returns {boolean} - Succès de l'opération
 */
function ajouterTache(texteTache) {
    if (texteTache && texteTache.trim() !== "") {
        const nouvelleTache = {
            texte: texteTache.trim(),
            terminee: false,
            id: Date.now() + Math.random(),
            dateCreation: new Date().toISOString()
        };
        
        listeTaches.push(nouvelleTache);
        sauvegarderDonnees(); // ÉTAPE 9: Persistance
        afficherTaches();
        mettreAJourCompteur();
        return true;
    } else {
        alert("Veuillez entrer une tâche avant d'ajouter.");
        return false;
    }
}


/**
 * Supprimer une tâche de la liste (ÉTAPE 8: Objets)
 * @param {number} index - L'index de la tâche à supprimer
 * @returns {boolean} - Succès de l'opération
 */
function supprimerTache(index) {
    if (index >= 0 && index < listeTaches.length) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la tâche "${listeTaches[index].texte}" ?`)) {
            listeTaches.splice(index, 1);
            sauvegarderDonnees(); // ÉTAPE 9: Persistance
            afficherTaches();
            mettreAJourCompteur();
            return true;
        }
    }
    return false;
}


/**
 * Marquer une tâche comme terminée ou la reprendre (ÉTAPE 8: Objets)
 * @param {number} index - L'index de la tâche à basculer
 * @returns {boolean} - Succès de l'opération
 */
function terminerTache(index) {
    if (index >= 0 && index < listeTaches.length) {
        listeTaches[index].terminee = !listeTaches[index].terminee;
        sauvegarderDonnees(); // ÉTAPE 9: Persistance
        afficherTaches();
        mettreAJourCompteur();
        return true;
    }
    return false;
}

// ========================================
// ÉTAPE 9 : PERSISTANCE AVEC LOCALSTORAGE
// ========================================

/**
 * Sauvegarder les données dans localStorage
 */
function sauvegarderDonnees() {
    try {
        localStorage.setItem('listeTaches', JSON.stringify(listeTaches));
    } catch (error) {
        alert('Erreur lors de la sauvegarde des tâches');
    }
}

/**
 * Charger les données depuis localStorage
 */
function chargerDonnees() {
    try {
        const donneesStockees = localStorage.getItem('listeTaches');
        if (donneesStockees) {
            listeTaches = JSON.parse(donneesStockees);
        }
    } catch (error) {
        alert('Erreur lors du chargement des tâches sauvegardées');
        // Utiliser les tâches par défaut en cas d'erreur
    }
}

// ========================================
// ÉTAPE 10 : NOUVELLES FONCTIONNALITÉS
// ========================================

/**
 * Supprimer toutes les tâches (ÉTAPE 10)
 */
function supprimerToutesToches() {
    if (listeTaches.length === 0) {
        alert("Aucune tâche à supprimer.");
        return;
    }
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer toutes les ${listeTaches.length} tâches ?`)) {
        listeTaches = [];
        sauvegarderDonnees();
        afficherTaches();
        mettreAJourCompteur();
        // Vider aussi le champ de recherche
        const champRecherche = document.getElementById("champRecherche");
        if (champRecherche) {
            champRecherche.value = "";
            filtreActuel = "";
        }
    }
}


function filtrerTaches(texteRecherche) {
    filtreActuel = texteRecherche.toLowerCase();
    afficherTaches();
}


function obtenirTachesFiltrees() {
    if (!filtreActuel) {
        return listeTaches.map((tache, index) => ({ tache, indexOriginal: index }));
    }
    
    return listeTaches
        .map((tache, index) => ({ tache, indexOriginal: index }))
        .filter(item => item.tache.texte.toLowerCase().includes(filtreActuel));
}

/**
 * Mettre à jour le compteur de tâches (ÉTAPE 10)
 */
function mettreAJourCompteur() {
    const stats = obtenirStatistiques();
    
    // Mettre à jour les éléments d'affichage
    const compteurTotal = document.getElementById("compteurTotal");
    const compteurTerminees = document.getElementById("compteurTerminees");
    const compteurEnCours = document.getElementById("compteurEnCours");
    const barreProgres = document.getElementById("barreProgres");
    
    if (compteurTotal) compteurTotal.textContent = stats.total;
    if (compteurTerminees) compteurTerminees.textContent = stats.terminees;
    if (compteurEnCours) compteurEnCours.textContent = stats.enCours;
    if (barreProgres) {
        barreProgres.style.width = `${stats.pourcentage}%`;
        barreProgres.textContent = `${stats.pourcentage}%`;
    }
}

// ========================================
// FONCTIONS DÉDIÉES - INTERFACE UTILISATEUR
// ========================================

/**
 * Récupérer la tâche depuis le champ input et l'ajouter
 */
function ajouterTacheDepuisInput() {
    let inputElement = document.getElementById("id1");
    if (inputElement) {
        let texteTache = inputElement.value;
        if (ajouterTache(texteTache)) {
            inputElement.value = ""; // Vider le champ après ajout réussi
        }
    }
}


function creerBouton(texte, couleur, couleurHover, callback) {
    let bouton = document.createElement("button");
    bouton.appendChild(document.createTextNode(texte));
    
    // Styles de base
    bouton.style.backgroundColor = couleur;
    bouton.style.color = "white";
    bouton.style.border = "none";
    bouton.style.padding = "5px 10px";
    bouton.style.borderRadius = "3px";
    bouton.style.cursor = "pointer";
    bouton.style.fontSize = "12px";
    
    // Événements
    bouton.addEventListener("click", callback);
    bouton.addEventListener("mouseover", () => bouton.style.backgroundColor = couleurHover);
    bouton.addEventListener("mouseout", () => bouton.style.backgroundColor = couleur);
    
    return bouton;
}



function creerElementTache(tacheInfo) {
    const { tache, indexOriginal } = tacheInfo;
    let li = document.createElement("li");
    let estComplete = tache.terminee;
    
    // Styles du conteneur
    li.style.marginBottom = "10px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "12px";
    li.style.backgroundColor = estComplete ? "#e8f5e8" : "#f9f9f9";
    li.style.borderRadius = "8px";
    li.style.border = estComplete ? "2px solid #4CAF50" : "1px solid #ddd";
    li.style.transition = "all 0.3s ease";
    
    // Texte de la tâche avec surlignage pour la recherche
    let spanTache = document.createElement("span");
    let texteAffiche = tache.texte;
    
    // Surligner le terme recherché
    if (filtreActuel) {
        const regex = new RegExp(`(${filtreActuel})`, 'gi');
        texteAffiche = texteAffiche.replace(regex, '<mark>$1</mark>');
        spanTache.innerHTML = texteAffiche;
    } else {
        spanTache.textContent = texteAffiche;
    }
    
    spanTache.style.flexGrow = "1";
    spanTache.style.fontSize = "16px";
    
    // Styles conditionnels pour le texte
    if (estComplete) {
        spanTache.style.textDecoration = "line-through";
        spanTache.style.color = "#666";
        spanTache.style.fontStyle = "italic";
    } else {
        spanTache.style.textDecoration = "none";
        spanTache.style.color = "#333";
        spanTache.style.fontStyle = "normal";
    }
    
    // Conteneur des boutons
    let conteneurBoutons = document.createElement("div");
    conteneurBoutons.style.display = "flex";
    conteneurBoutons.style.gap = "8px";
    
    // Bouton Terminer/Reprendre
    let boutonTerminer = creerBouton(
        estComplete ? "Reprendre" : "Terminer",
        estComplete ? "#ff9800" : "#4CAF50",
        estComplete ? "#f57c00" : "#45a049",
        () => terminerTache(indexOriginal)
    );
    
    // Bouton Supprimer
    let boutonSupprimer = creerBouton(
        "Supprimer",
        "#f44336",
        "#d32f2f",
        () => supprimerTache(indexOriginal)
    );
    
    // Assemblage
    conteneurBoutons.appendChild(boutonTerminer);
    conteneurBoutons.appendChild(boutonSupprimer);
    li.appendChild(spanTache);
    li.appendChild(conteneurBoutons);
    
    return li;
}

/**
 * Afficher toutes les tâches dans l'interface (ÉTAPE 7: Boucles + Filtrage)
 */
function afficherTaches() {
    let conteneurListe = document.getElementById("id2");
    
    if (!conteneurListe) {
        return;
    }
    
    // Vider le conteneur
    conteneurListe.innerHTML = "";
    
    // Obtenir les tâches filtrées (ÉTAPE 7: utilisation des boucles)
    const tachesFiltrees = obtenirTachesFiltrees();
    
    // Utiliser une boucle forEach pour afficher chaque tâche (ÉTAPE 7)
    tachesFiltrees.forEach(tacheInfo => {
        conteneurListe.appendChild(creerElementTache(tacheInfo));
    });
    
    // Afficher un message si aucune tâche ne correspond à la recherche
    if (filtreActuel && tachesFiltrees.length === 0) {
        const messageVide = document.createElement("p");
        messageVide.textContent = `Aucune tâche ne correspond à "${filtreActuel}"`;
        messageVide.style.textAlign = "center";
        messageVide.style.color = "#666";
        messageVide.style.fontStyle = "italic";
        messageVide.style.padding = "20px";
        conteneurListe.appendChild(messageVide);
    } else if (listeTaches.length === 0) {
        const messageVide = document.createElement("p");
        messageVide.textContent = "Aucune tâche pour le moment. Ajoutez-en une !";
        messageVide.style.textAlign = "center";
        messageVide.style.color = "#666";
        messageVide.style.fontStyle = "italic";
        messageVide.style.padding = "20px";
        conteneurListe.appendChild(messageVide);
    }
}


function gererToucheEntree(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        ajouterTacheDepuisInput();
    }
}

/**
 * Gérer les événements du champ de recherche (ÉTAPE 10)
 */
function configurerEvenementsRecherche() {
    const champRecherche = document.getElementById("champRecherche");
    if (champRecherche) {
        champRecherche.addEventListener("input", function(event) {
            filtrerTaches(event.target.value);
        });
    }
}

/**
 * Configurer le bouton "Tout supprimer" (ÉTAPE 10)
 */
function configurerBoutonToutSupprimer() {
    const boutonToutSupprimer = document.getElementById("boutonToutSupprimer");
    if (boutonToutSupprimer) {
        boutonToutSupprimer.addEventListener("click", supprimerToutesToches);
    }
}


/**
 * Initialiser l'application (ÉTAPE 9: LocalStorage + ÉTAPE 10: Nouvelles fonctionnalités)
 */
function initialiserApplication() {
    // ÉTAPE 9: Charger les données sauvegardées
    chargerDonnees();
    
    // Configurer les événements
    let inputTache = document.getElementById("id1");
    if (inputTache) {
        inputTache.addEventListener("keydown", gererToucheEntree);
        inputTache.placeholder = "Entrez une nouvelle tâche...";
    }
    
    // ÉTAPE 10: Configurer les nouvelles fonctionnalités
    configurerEvenementsRecherche();
    configurerBoutonToutSupprimer();
    
    // Afficher les tâches et mettre à jour les compteurs
    afficherTaches();
    mettreAJourCompteur();
}


function obtenirStatistiques() {
    let total = listeTaches.length;
    let terminees = listeTaches.filter(tache => tache.terminee).length;
    let enCours = total - terminees;
    
    return {
        total: total,
        terminees: terminees,
        enCours: enCours,
        pourcentage: total > 0 ? Math.round((terminees / total) * 100) : 0
    };
}

// ========================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ========================================

document.addEventListener("DOMContentLoaded", function() {
    initialiserApplication();
});

// ========================================
// FONCTIONS UTILITAIRES POUR DÉBOGAGE (CONSOLE)
// ========================================

/**
 * Afficher toutes les tâches dans la console (pour débogage)
 */
function debug_afficherTaches() {
    listeTaches.forEach((tache, index) => {
        let statut = tache.terminee ? "TERMINÉE" : "EN COURS";
        console.log(`${index + 1}. ${tache.texte} - ${statut}`);
    });
    let stats = obtenirStatistiques();
    console.log(`Progression : ${stats.pourcentage}% (${stats.terminees}/${stats.total})`);
}

/**
 * Fonction utilitaire pour vider le localStorage (pour tests)
 */
function debug_viderLocalStorage() {
    localStorage.removeItem('listeTaches');
    console.log(" LocalStorage vidé. Rechargez la page pour voir les tâches par défaut.");
}
