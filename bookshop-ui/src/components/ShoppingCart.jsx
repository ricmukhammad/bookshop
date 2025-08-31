import { Fragment, useEffect, useState } from "react";
import {Dialog, Transition} from '@headlessui/react'
import {getCart, getTotalPriceOfBooks, removeFromCart} from "../utils/cartService.js";
import empty_cart from "../assets/empty-cart-svgrepo-com.svg";
import {XMarkIcon} from "@heroicons/react/24/outline/index.js";
import {useShoppingCart} from "../hooks/ShoppingCartContext.jsx";

export default function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const {showShoppingCart,setShowShoppingCart, totalPrice, setTotalPrice} = useShoppingCart()

    useEffect(() => {
        setCart(getCart());
    }, [totalPrice, showShoppingCart]);

    const handleRemove = (id) => {
        setCart(removeFromCart(id));
        setTotalPrice(getTotalPriceOfBooks())
    };

    return (
        <Transition.Root show={showShoppingCart} as={Fragment}>
            <Dialog as="div" className="relative z-1000" onClose={() => setShowShoppingCart(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500/25 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping
                                                    cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setShowShoppingCart(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>
                                            {cart.length > 0 ?
                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul className="-my-6 divide-y divide-gray-200">
                                                            { cart.map((product) => (

                                                                <li key={product.id} className="flex py-6">
                                                                    <div
                                                                        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={product.imageUrl}
                                                                            alt="book cover"
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div
                                                                                className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <a href={product.href}>{product.title}</a>
                                                                                </h3>
                                                                                <p className="ml-4">{product.price}$</p>
                                                                            </div>
                                                                            {product.authors.map((author)=>
                                                                                <p className="mt-1 text-sm text-gray-500">{`${author.firstName}  ${author.lastName}`}</p>
                                                                            )}
                                                                            <p className="mt-1 text-sm font-bold text-gray-500">Total
                                                                                price: {product.price * product.quantity}$</p>
                                                                        </div>
                                                                        <div
                                                                            className="flex flex-1 items-end justify-between text-sm pt-4">
                                                                            <p className="text-gray-500">Qty</p>
                                                                            <div className='relative'>
                                                                                <span
                                                                                       className='block p-0 m-0  text-xs border-0 rounded w-11 h-5 leading-relaxed float-left'
                                                                                >{product.quantity}</span>
                                                                            </div>
                                                                            <div className="flex">
                                                                                <button
                                                                                    onClick={()=> handleRemove(product.id)}
                                                                                    type="button"
                                                                                    className="font-medium text-yellow-700 hover:text-yellow-600"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))
                                                            }
                                                        </ul>
                                                    </div>
                                                </div> :
                                                <div>
                                                    <img
                                                        className="mx-auto max-w-full h-screen "
                                                        src={empty_cart}
                                                        alt="no data found"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setShowShoppingCart(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                        {cart.length > 0 &&
                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                <div
                                                    className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>{totalPrice} $</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes
                                                    calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <a
                                                        onClick={() => {}}
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-yellow-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-600 hover:cursor-pointer"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                                <div
                                                    className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or
                                                        <button
                                                            type="button"
                                                            className="font-medium text-yellow-700 hover:text-yellow-600 hover:cursor-pointer"
                                                            onClick={() => setShowShoppingCart(false)}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}