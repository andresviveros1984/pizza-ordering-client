import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';



const OrderDetails = ({pizzas}) => {

let {id} = useParams();
const [selectedPizza,setSelectedPizza] = useState({});
const [displayPrice,setDisplayPrice] = useState(false);

const [errorMessage,setErrorMessage] = useState('');

const [orderDetail, setOrderDetail] = useState({});

const getOrderDetails = async () => {
  const response = await fetch(`/orders/${id}`);
  const data = await response.json();

  setOrderDetail(data.data);
  setSelectedPizza(data.data.pizza)
}

useEffect(() => {
  getOrderDetails()

},[])





const handleSelect = (e) =>{
  let pizzaId = e.target.value;
  let filteredPizza = pizzas.data.filter(pzza =>{
    return(
      pzza.id === pizzaId
    )
  })
  
  setSelectedPizza(filteredPizza[0]);
  if(pizzaId === ""){
    setDisplayPrice(false)
  }else{
    setDisplayPrice(true)
  };
  // setFormData({...formData,pizza:filteredPizza[0].name})
}


return (
  <FormArea className="form-area">
    {console.log(pizzas)}
    <form >
      <label htmlFor="fname">First Name: <input type="text" id='fname' name='fname' placeholder='fabio' disabled value={orderDetail.fname}/></label>
      <label htmlFor="sname">Surname: <input type="text" id='lname' name='lname' placeholder='lopez' disabled /></label>
      <label htmlFor="address">Address: <input type="text" id='address' name='address' placeholder='London Town' disabled /></label>
      <label htmlFor="email">Email: <input type="email" id='email' name='email' placeholder='fabio.lopez@email.com' disabled /></label>
      <label htmlFor="tel">Telephone <input type="tel" id='phone' name='phone' placeholder='111-111-1111' disabled/></label>

      <label htmlFor="pizzas">
        Pizza: 
        <select name="pizza" id="" onChange={handleSelect} >
          <option value={orderDetail.pizza}>Select Pizza</option>
          {pizzas.status == 200 ?  pizzas.data.map(pizza => {
            return(
              <option value={pizza.id}>{pizza.name}</option>
            )
          }) : <h1>Loading</h1>}
        </select>
      </label>
      
      {displayPrice &&  (<label htmlFor="price">Price: {Object.keys(selectedPizza.price).map(p => {
        return(
          <div className='radioarea'>
            <input type="radio" name='price' value={selectedPizza.price[p]} />
              <p>{p}</p>
              <p>{selectedPizza.price[p]}</p>
          </div>
        )
      })}</label>)}
      {errorMessage.length > 0 && <div className='errormessages'>
        <p>{errorMessage}</p>
      </div>}
      <button type='submit'>Update Order</button>
    </form>
  </FormArea>
)

}
export default OrderDetails;

const FormArea = styled.div `
display:flex;
justify-content:center;
align-items:center;
height:100vh;
width:100vw;
form{
 
  border-radius:20px;
  box-shadow:10px 10px 5px lightblue;
  border:1px solid lightblue;
  width:500px;
  height:max-content;
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  /* align-items:flex-start; */
  align-items:center;
  padding:10px;

  label {
    width:260px;
    display:flex;
    justify-content:space-between;
    padding:20px 30px;
  }
  input,select {
    width:120px;
    border-radius:10px;
    text-align:center;
  
  }
}
button {
  margin:0 auto;
  padding:10px;
  border-radius:10px;
  border:1px solid lightblue;
  background-color:white;
}

.radioarea{
  /* width:60px; */
  input{
    width:14px;
    
  }
 font-size:12px;
 font-weight:bold;
 
}

.errormessages p{
  font-weight:bolder;
  color:red;
}

`

