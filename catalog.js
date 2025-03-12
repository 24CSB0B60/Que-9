const themeToggleButton = document.getElementById('theme-toggle-btn');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
if(savedTheme === 'dark') {
    body.classList.add('dark-mode');
} else {
    body.classList.remove('dark-mode');
}

themeToggleButton.addEventListener('click', function() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
});

let countdownInterval;
let timeLeft = 0;
let timerRunning = false;

const timerInput = document.getElementById('timer-input');
const timerDisplay = document.getElementById('timer-display');
const startTimerButton = document.getElementById('start-timer-btn');
const pauseTimerButton = document.getElementById('pause-timer-btn');
const resetTimerButton = document.getElementById('reset-timer-btn');

startTimerButton.addEventListener('click', function() {
    const inputTime = parseInt(timerInput.value);
    if (isNaN(inputTime) || inputTime <= 0) return;
    timeLeft = inputTime;
    if (!timerRunning) {
        startCountdown();
    }
});

pauseTimerButton.addEventListener('click', function() {
    clearInterval(countdownInterval);
    timerRunning = false;
});

resetTimerButton.addEventListener('click', function() {
    clearInterval(countdownInterval);
    timeLeft = 0;
    timerRunning = false;
    timerDisplay.textContent = '00:00';
    document.body.style.backgroundColor = '#e0f7fa';
});

function startCountdown() {
    timerRunning = true;
    countdownInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerRunning = false;
            alert("Time's up!");
        } else {
            timeLeft--;
            updateTimerDisplay();
            updateBackgroundColor();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function updateBackgroundColor() {
    if (timeLeft > 10) {
        document.body.style.backgroundColor = 'green';
    } else if (timeLeft > 5) {
        document.body.style.backgroundColor = 'yellow';
    } else {
        document.body.style.backgroundColor = 'red';
    }
}

const changeStyleButton = document.getElementById('change-style-btn');
const header = document.querySelector('.header');

changeStyleButton.addEventListener('click', function() {
    header.style.fontSize = '40px';
    header.style.fontWeight = 'bold';
    header.style.color = 'yellow';
});


class Product {
    constructor(name, price, image, id) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.id = id;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addProduct(product) {
        this.items.push(product);
        this.updateCartDisplay();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    updateCartDisplay() {
        const cartContainer = document.querySelector('.cart-items');
        cartContainer.innerHTML = '';
        
        this.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" class="cart-item-img" />
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = this.getTotal().toFixed(2);
    }
}

const cart = new Cart();

document.querySelectorAll('.add-to-cart-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const productElement = button.parentElement;
        const productName = productElement.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', ''));
        const productImage = productElement.querySelector('img').src;
        const productId = `${productName}-${Date.now()}`;
        
        const product = new Product(productName, productPrice, productImage, productId);
        cart.addProduct(product);

        alert(`${productName} has been added to your cart.`);
    });
});