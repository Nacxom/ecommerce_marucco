import React, {useContext} from 'react';
import {CartContext} from '../../../context/CartContext';
// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// CSS
import './CartItem.css';

export const CartItem = ({item}) => {
  const {removeItem} = useContext(CartContext);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Img src={item.pictureUrl} alt={`Imagen de ${item.name}.`} className='cardImg'/>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>Precio por Unidad: ${item.price}</Card.Text>
          <Card.Text>Cantidad: {item.quantity}</Card.Text>
          <Card.Text>Precio Subtotal: ${item.totalPrice}</Card.Text>
          <Button variant="danger" onClick={()=>removeItem(item.id)}>Eliminar producto</Button>
        </Card.Body>
      </Card>
    </>
  )
}