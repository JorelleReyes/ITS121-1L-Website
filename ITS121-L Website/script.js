function toggleLanguageDropdown() {
    document.querySelector(".language-dropdown").classList.toggle("active");
}

function changeLanguage(language) {
    document.querySelector(".language-btn").textContent = language + " ▼";
    document.querySelector(".language-dropdown").classList.remove("active");
}

document.addEventListener("click", function (event) {
    let dropdown = document.querySelector(".language-dropdown");
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
    }
});

function openBag() {
    document.getElementById("bagSidebar").classList.add("active");
}

function closeBag() {
    document.getElementById("bagSidebar").classList.remove("active");
}

function openWishlist() {
    document.getElementById("wishlistSidebar").classList.add("active");
}

function closeWishlist() {
    document.getElementById("wishlistSidebar").classList.remove("active");
}

document.addEventListener("click", function (event) {
    let bagSidebar = document.getElementById("bagSidebar");
    let wishlistSidebar = document.getElementById("wishlistSidebar");
    let bagButton = document.querySelector(".my-bag");
    let wishlistButton = document.querySelector(".wishlist");

    let clickIsOutside = !bagSidebar.contains(event.target) &&
        !wishlistSidebar.contains(event.target) &&
        !bagButton.contains(event.target) &&
        !wishlistButton.contains(event.target) &&
        !event.target.classList.contains('remove-item') &&
        !event.target.classList.contains('quantity-button');

    if (clickIsOutside) {
        closeBag();
        closeWishlist();
    }
});

function shopCategory(category) {
    if (category === 'boy') {
        window.location.href = 'boy.html';
    } else if (category === 'girl') {
        window.location.href = 'girl.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const footer = document.getElementById('footer-credits');

    if (footer) {
        footer.style.display = 'none';

        function checkScrollPosition() {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollPosition + windowHeight >= scrollHeight - 10) {
                footer.style.display = 'block';
            } else {
                footer.style.display = 'none';
            }
        }

        window.addEventListener('scroll', checkScrollPosition);
        window.addEventListener('resize', checkScrollPosition);
        checkScrollPosition();
    }

    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const productName = product.dataset.name;
            const productImage = product.querySelector('img').src;
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: productName, image: productImage, quantity: 1 });
            }
            updateCart();
            openBag();
        });
    });

    updateCart();

    function updateCart() {
        const cartItemsList = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart');
        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            document.getElementById('checkout-button').style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            document.getElementById('checkout-button').style.display = 'block';
            cart.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width: 30px; height: 30px; vertical-align: middle; margin-right: 5px;">
                    ${item.name}
                    <div style="display: inline-block; margin-left: 5px;">
                        <button class="quantity-button" data-index="${index}" data-action="decrease" style="background-color: #A1DDF3; border: none; padding: 5px 8px; cursor: pointer; border-radius: 5px; color: #1B3A57; font-weight: bold;">-</button>
                        <span style="margin: 0 8px; color: #1B3A57; font-weight: bold;">${item.quantity}</span>
                        <button class="quantity-button" data-index="${index}" data-action="increase" style="background-color: #F973A9; border: none; padding: 5px 8px; cursor: pointer; border-radius: 5px; color: white; font-weight: bold;">+</button>
                    </div>
                    <span class="remove-item" style="cursor: pointer; margin-left: 5px; color: #F973A9;">✖</span>
                `;
                cartItemsList.appendChild(listItem);
            });
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function () {
                    const indexToRemove = parseInt(this.dataset.index);
                    cart.splice(indexToRemove, 1);
                    updateCart();
                });
            });
            document.querySelectorAll('.quantity-button').forEach(button => {
                button.addEventListener('click', function () {
                    const index = parseInt(this.dataset.index);
                    const action = this.dataset.action;
                    if (action === 'increase') {
                        cart[index].quantity++;
                    } else if (action === 'decrease' && cart[index].quantity > 1) {
                        cart[index].quantity--;
                    }
                    updateCart();
                });
            });
        }
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.05)';
        });
        checkoutButton.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
        checkoutButton.addEventListener('mousedown', function () {
            this.style.transform = 'scale(0.95)';
        });
        checkoutButton.addEventListener('mouseup', function () {
            this.style.transform = 'scale(1.05)';
        });
        checkoutButton.addEventListener('click', function (event) {
            event.preventDefault();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        const footer = document.getElementById('footer-credits');
    
        if (footer) {
            footer.style.display = 'none';
    
            function checkScrollPosition() {
                const scrollHeight = document.documentElement.scrollHeight;
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
    
                if (scrollPosition + windowHeight >= scrollHeight - 10) {
                    footer.style.display = 'block';
                } else {
                    footer.style.display = 'none';
                }
            }
    
            window.addEventListener('scroll', checkScrollPosition);
            window.addEventListener('resize', checkScrollPosition);
            checkScrollPosition();
        }
    });
});