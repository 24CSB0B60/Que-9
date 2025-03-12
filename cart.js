class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    displayCartItems() {
        const cartContainer = document.querySelector('.cart-items');
        const totalPriceElement = document.getElementById('total-price');
        cartContainer.innerHTML = '';
        
        if (this.items.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            let total = 0;
            this.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <p>${item.name}</p>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                `;
                cartContainer.appendChild(itemElement);
                total += item.price;
            });
            totalPriceElement.textContent = total.toFixed(2);
        }
    }
}

const cart = new Cart();
cart.displayCartItems();