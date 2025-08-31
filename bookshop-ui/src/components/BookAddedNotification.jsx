import { useEffect } from "react";
import {useShoppingCart} from "../hooks/ShoppingCartContext.jsx";

const BookAddedNotification= ({ book, onClose }) => {
    const {setShowShoppingCart} = useShoppingCart()

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!book) return null;

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg border border-gray-200 rounded-lg p-4 flex items-start space-x-3 z-50">
            <img src={book.imageUrl} alt={book.title} className="h-16 w-12 object-cover rounded" />
            <div className="flex-1">
                <p className="font-semibold text-sm">The book has been successfully added to your cart!</p>
                <button className="text-yellow-700 text-sm font-medium hover:underline" onClick={()=>setShowShoppingCart(true)}>
                    Check my cart
                </button>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ✕
            </button>
        </div>
    );
}

export default BookAddedNotification