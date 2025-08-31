const CART_KEY = "bookshop_cart";

export function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function addToCart(book) {
    let cart = getCart();

    const existingIndex = cart.findIndex((item) => item.id === book.id);
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
}

export function removeFromCart(bookId) {
    let cart = getCart().filter((item) => item.id !== bookId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}

export function getTotalPriceOfBooks(){
    let total = 0;
    for(let i = 0; i < getCart().length; i++){
        total += getCart()[i].quantity * getCart()[i].price;
    }
    return total.toFixed(2)
}