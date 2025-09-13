const CART_KEY = "bookshop_cart";

export function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function addToCart(book) {
    let cart = getCart();

    const existingIndex = cart.findIndex((item) => item.id === book.id);
    if (existingIndex !== -1) {
        return;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
}

export function isBookExist(book) {
    let cart = getCart();
    return cart.find((item) => item.id === book.id);
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

export function increaseQuantity(id) {
    const cart = getCart();
    const updated = cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    return updated;
}

export function decreaseQuantity(id) {
    const cart = getCart();
    const updated = cart.map(item =>
        item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    return updated;
}