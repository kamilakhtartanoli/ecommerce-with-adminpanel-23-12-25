import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Product = () => {
  const [products , setproducts] = useState([]);

  useEffect(()=>{
    const datafetch = async () =>{
      const response = await axios.get('http://localhost:8000/api/allproducts')
      setproducts(response.data)
    }
    datafetch()
  },[])

  const shirts = products.filter((item)=>item.category === 'shirt');
  const kurta = products.filter((item)=>item.category === 'kurta');
  const maleshoes = products.filter((item)=>item.category === 'shoes' && item.gender === 'male');
  const femaleshoes = products.filter((item)=>item.category === 'shoes' && item.gender === 'female');
  const sandals = products.filter((item)=>item.category === 'sandals');
  const malebags = products.filter((item)=>item.category==='bag' && item.gender === 'male');
  const femalebags = products.filter((item)=>item.category==='bag' && item.gender === 'female');

  const renderProducts = (items) => (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 m-5'>
      {
        items.map((item)=>{
          return(
            <div className='p-2 cursor-pointer' key={item._id}>
              <div>
                <img src={item.images[0]} alt="" />
              </div>
              <div>
                <h1>{item.name}</h1>
                <h2 className='text-slate-500'>{item.description}</h2>
                <h1>RS : {item.price}</h1>
              </div>
            </div>
          )
        })
      }
    </div>
  );

  return(
    <>
      <h2 className='text-2xl font-bold m-5'>Shirts</h2>
      {renderProducts(shirts)}

      <h2 className='text-2xl font-bold m-5'>Kurta</h2>
      {renderProducts(kurta)}

      <h2 className='text-2xl font-bold m-5'>Male Shoes</h2>
      {renderProducts(maleshoes)}

      <h2 className='text-2xl font-bold m-5'>Female Shoes</h2>
      {renderProducts(femaleshoes)}

      <h2 className='text-2xl font-bold m-5'>Sandals</h2>
      {renderProducts(sandals)}

      <h2 className='text-2xl font-bold m-5'>Male Bags</h2>
      {renderProducts(malebags)}

      <h2 className='text-2xl font-bold m-5'>Female Bags</h2>
      {renderProducts(femalebags)}
    </>
  )
}

export default Product;
