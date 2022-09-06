import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {getProducts} from '../../helper/helper.js';
import {ItemList} from './ItemList/ItemList.js';
// Bootstrap spinner
import Spinner from 'react-bootstrap/Spinner';
// CSS
import './ItemListContainer.css';

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const {categoryId} = useParams();

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const data = await getProducts();

        if(!categoryId){
          setItems(data);
          setLoading(false);
        } else {
          const filteredData = data.filter(item => item.category === categoryId);
          setItems(filteredData);
          setLoading(false);
        }
      } catch (error) {
        console.log("Hubo un error")
      }
    };

    asyncFunction();
  },[categoryId]);

  return (
    <>
      <div>
        {
          loading ? 
          <Spinner animation="grow" variant="dark" style={{display: "flex", margin: "0 auto"}}/>
          :
          <ItemList items = {items}/>
        }
      </div>
    </>
  )
}
