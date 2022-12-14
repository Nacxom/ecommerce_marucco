import {createContext, useEffect, useState} from "react";

// Creo el contexto
export const CartContext = createContext();

// Componente para que los children tengan acceso a las variables y funciones que necesitemos (retornando el proveedor del contexto)
export const CartProvider = ({children}) => {
  // Listado de productos del carro. Como va a cambiar lo creo como variable de estado
  const [itemCartList, setItemCartList] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(itemCartList));
  },[itemCartList])

  // Funcion para verificar si el item ya existe en el carro (gracias a un id unico):
  const isInCart = (idItem) => {
    return itemCartList.some((elemento) => elemento.id === idItem);
  }

  // Funcion para encontrar X item
  const findItemIndex = (item) => {
    return itemCartList.findIndex(element => element.id === item.id); 
  }

  // Funcion para evitar superar la cantidad de items en stock al agregar el mismo item reiteradas veces
  const itemQuantityCart = (item) => {
    const itemIndex = findItemIndex(item);
    if (itemIndex < 0 ) {
      return 0;
    } else {
      return itemCartList[itemIndex].quantity;
    }
  }

  // Funcion para agregar item al carro (le doy el item y la cantidad q eligio el usuario):
  const addItem = (item, count) => {
    const newList = [...itemCartList];
    if(isInCart(item.id)){
      // Si existe el producto:
      // Definimos la ubicacion del item
      const itemIndex = findItemIndex(item);
      // Modificamos su cantidad
      newList[itemIndex].quantity = newList[itemIndex].quantity + count;
      // Modificamos el precio total
      newList[itemIndex].totalPrice = newList[itemIndex].quantity * newList[itemIndex].price;
      setItemCartList(newList);
    } else {
      // Si no existe el producto, agregamos las propiedades quantity y totalPrice, y lo agregamos al carro
      const newItem = {...item, quantity: count, totalPrice: count * item.price};
      const newList = [...itemCartList , newItem ];
      setItemCartList(newList);
    }
  }

  // Funcion para eliminar un item del carro (gracias al id unico):
  const removeItem = (idItem) => {
    const copyArray = [...itemCartList];
    const newArray = copyArray.filter(element => element.id !== idItem);
    setItemCartList(newArray);
  }

  // Funcion para vaciar el carro:
  const clearCart = () => {
    setItemCartList([]);
  }

  // Funcion para obtener la cantidad (quantity) total de items en el carro
  const getTotalQuantity = () => {
    const totalQuantity = itemCartList.reduce((acc, item) => acc + item.quantity, 0);
    return totalQuantity;
  }

  // Funcion para obtener el precio total
  const getTotalPrice = () => {
    return itemCartList.reduce((acc,item) => acc + item.price * item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{
      itemCartList, 
      addItem, 
      removeItem, 
      clearCart, 
      getTotalQuantity, 
      getTotalPrice,
      itemQuantityCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
