import {useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useState} from 'react';



function Recipedetails() {
   const {recipeId}=useParams();
   const[detail,setdetail]=useState({});
   const [loading, setLoading] = useState(false);
   const [isError, setIsError] = useState({ status: false, msg: '' });
    const navigate=useNavigate();
    const navigateto=()=>{
        navigate('/');
    }

    useEffect(()=>{
        eachrecipe(recipeId)

    },[])

    async function eachrecipe(recipeId){
        try {
         setLoading(true);
         setIsError({ status: false, msg: '' });
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const { meals } = await response.json();
        if (!meals) {
            throw new Error('Sorry  recipe details not found... ')}

        setLoading(false);
        setIsError({ status: false, msg: '' });
        const [data]=meals;
        setdetail(data);

        
    }
    catch (error) {
        setIsError({ status: true, msg: error.message || 'Sorry no recipe found...' });
        setLoading(false);
      }
    
}

    
    return(
       <div className="recipe">
        <div className="recipecontainer">
        {isError.status && <h1 className='no'>{isError.msg}</h1>}
        {loading && !isError.status && <h1 className='non'>Loading...</h1>}
        {!loading && !isError.status &&
        <div className="recipedetails">

           <div className="recipename">{detail.strMeal}</div>
           <p>Ingredients:</p>
           <ul>
              {Object.keys(detail).map((key,ind) => {
                if (key.startsWith('strIngredient') && detail[key]) {
                    const measureKey = `strMeasure${key.slice(13)}`;
                    const ingredient = detail[key];
                    const measure = detail[measureKey];
                  return (
                  <li key={ind}> {`${ingredient}( ${measure})`}</li>
                  )
                }
                
              })}
            </ul>
            <p>Instructions:</p>
           <div className="text">{detail.strInstructions} </div>
           
             <div className="button">
          <button onClick={navigateto}>Back</button>
          </div>
        </div>

        }

        </div>

       </div>
    )

    
}
export default Recipedetails;