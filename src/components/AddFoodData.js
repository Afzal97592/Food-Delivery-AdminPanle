import React, { useState } from 'react'
import './AddFoodData.css'

// firbase imports
import { db, storage } from '../Firebase/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const AddFoodData = () => {
    // const inputRef = useRef(null)
    const[foodImg, setFoodImg] = useState(null)
    const[foodData, setFoodData] = useState(
        {
            foodName:'',
            foodDescription:'',
            foodPrice:'',
            foodCategory:'',
            // foodImg:'',
            restaurantName:'',
            restaurantAdd:'',
            restaurantPhone:'',
        }
    )
    // const[imgUrl, setImgUrl] = useState(null)
    const handleChange = (e) => {
        e.preventDefault();
        setFoodData({...foodData, [e.target.name]: e.target.value})
    }

    const submitFoodData = (e) =>{
        e.preventDefault();
        // console.log(foodData)
        // console.log('clicked')
        // inputRef.current.value=""

        if(foodImg === null){
            alert("Please select food image")
            return
        }else{
            const imageRef = ref(storage, `FoodImages/${foodImg.name}`)
            uploadBytes(imageRef, foodImg)
            .then(()=>{
                alert("Image uploaded sucessfuly")
                getDownloadURL(imageRef)
                .then((url)=>{
                    // console.log(url)
                    // setImgUrl(url)
                    const AllFoodData = {
                        foodData,
                        imgUrl:url,
                    }
                    console.log(AllFoodData)
                    try {
                        const docRef = addDoc(collection(db, "FoodData"),AllFoodData);
                      alert("Data Added successfully", docRef.id)
                    } catch (error) {
                        alert("Error occuring", error)
                    }
                })
            })
            .catch((err)=>{
                alert(err.message)
            })
        }

        setFoodData(
            {
                foodName:'',
                foodDescription:'',
                foodPrice:'',
                foodCategory:'',
                foodImg:'',
                restaurantName:'',
                restaurantAdd:'',
                restaurantPhone:''
            }
        )
    }

  return (
    <div className='formOuter'>
        <h1>Add Food Data</h1>
        <form className='form_inner'>
           <label>Food Name</label>
           <input type='text' className='food_name'
           onChange={handleChange} value={foodData.foodName}
           name='foodName'
           />
           <br/>
           <label>Food Description</label>
           <input type='text' className='food_description'
            value={foodData.foodDescription}
            onChange={handleChange}
            name='foodDescription'
           />
           <br/>
           <label>Food Price</label>
           <input type='number' className='food_price'
            value={foodData.foodPrice} 
            name='foodPrice'
            onChange={handleChange}
           />
           <br/>
           <label>Food Category</label>
           <input type='text' className='food_category'
            value={foodData.foodCategory} 
            name='foodCategory'
            onChange={handleChange}
           />
           <br/>
           <label>Food Image</label>
           <input type='file' className='food_image' 
            value={foodData.foodImg}
             onChange={(e)=>{setFoodImg(e.target.files[0])}}
             name='foodImgUrl'
           />
           <br/>
           <label>Restaurant Name</label>
           <input type='text' className='food_Restaurant' 
            value={foodData.restaurantName}
            name='restaurantName'
            onChange={handleChange}
           />
           <br />
           <label>Restaurant Address</label>
           <input type='text' className='food_Address'
            value={foodData.restaurantAdd} 
            name='restaurantAdd'
            onChange={handleChange}
           />
           <br />
           <label>Restaurant Phone</label>
           <input type='number' className='restaurant_phone'
            value={foodData.restaurantPhone}
            name='restaurantPhone'
            onChange={handleChange}
           />
           <br />
           <button onClick={submitFoodData}>Add Food</button>
        </form>
    </div>
  )
}

export default AddFoodData