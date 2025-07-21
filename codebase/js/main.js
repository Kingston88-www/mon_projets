
// Dynamique pour tous les boutons "Ajouter au panier"
document.addEventListener('DOMContentLoaded', function () {
    // Crée la notification si elle n'existe pas
    let notif = document.createElement('div');
    notif.id = 'panier-notif';
    notif.style.position = 'fixed';
    notif.style.top = '30px';
    notif.style.right = '30px';
    notif.style.background = '#1a8917';
    notif.style.color = '#fff';
    notif.style.padding = '16px 28px';
    notif.style.borderRadius = '8px';
    notif.style.fontSize = '1.1rem';
    notif.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
    notif.style.zIndex = '9999';
    notif.style.opacity = '0';
    notif.style.transition = 'opacity 0.3s';
    notif.style.pointerEvents = 'none';
    document.body.appendChild(notif);

    function showNotif(message) {
        notif.textContent = message;
        notif.style.opacity = '1';
        setTimeout(() => {
            notif.style.opacity = '0';
        }, 1500);
    }

    // Sélectionne tous les boutons "Ajouter au panier"
    document.querySelectorAll('.panier button').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            // Récupère les infos du produit
            const parent = btn.closest('.panier');
            const product = {
                img: btn.getAttribute('data-img') || parent.querySelector('img')?.getAttribute('src') || '',
                name: btn.getAttribute('data-name') || parent.querySelector('.name')?.textContent || '',
                id: btn.getAttribute('data-Id') || '',
                description: btn.getAttribute('data-description') || parent.querySelector('.description')?.textContent || '',
                prix: parent.querySelector('.prix')?.innerText || ''
            };
            // Ajoute au panier dans localStorage
            let panier = JSON.parse(localStorage.getItem('panier')) || [];
            panier.push(product);
            localStorage.setItem('panier', JSON.stringify(panier));
            // Affiche la notification
            showNotif('Produit ajouté au panier !');
        });
    });
});

// filepath: c:\Users\HP\Desktop\projet\panier.html
document.addEventListener('DOMContentLoaded', function () {
    const panierDiv = document.querySelector('.article');
    panierDiv.innerHTML = ''; // Vide le contenu initial

    let panier = JSON.parse(localStorage.getItem('panier')) || [];

    if (panier.length === 0) {
        panierDiv.innerHTML = '<p style="text-align:center;font-size:1.2rem;color:#888;">Votre panier est vide.</p>';
        return;
    }

    panier.forEach((product, idx) => {
        const prod = document.createElement('div');
        prod.className = 'panier';
        prod.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3 class="name">${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="prix">${product.prix}</p>
            <button class="remove-btn" data-index="${idx}">Retirer</button>       
            </button>
            <button class="commande" type="submit" data-img="" data-name="" data-Id="" data-description=""> 
                Passer la commande 

            </button>
        `;
        panierDiv.appendChild(prod);
    });

    // Gestion du retrait d'un produit
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            let index = parseInt(this.getAttribute('data-index'));
            panier.splice(index, 1);
            localStorage.setItem('panier', JSON.stringify(panier));
            location.reload();
        });
    });
});