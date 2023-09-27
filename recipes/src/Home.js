import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




 export function Home() {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: '' });

  const handleButton = () => {
    const inputvalue = document.getElementById('input').value.trim();
    setValue(inputvalue);
  }

  useEffect(() => {
    fetchData(value);
  }, [value]);

  async function fetchData(value1) {
    try {
      setLoading(true);
      setIsError({ status: false, msg: '' });
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value1}`);
      const { meals } = await response.json();

      if (!meals) {
        throw new Error('Sorry no recipe found... ')
      }
      setLoading(false);
      setIsError({ status: false, msg: '' });
      setData(meals);
    }
    catch (error) {
      setIsError({ status: true, msg: error.message || 'Sorry no recipe found...' });
      setLoading(false);
    }
  }

  return (
    <div className='root'>
    <div className="container">
      <header>
        <div className="title">Search your favorite recipes</div>
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <div className="inputfiled">
            <input type="text" placeholder="Enter your recipe" id='input' />
          </div>
          <input type="submit" className="button" value="search" onClick={handleButton} />
        </form>
      </header>

      {isError.status && <h1 className='no'>{isError.msg}</h1>}

      {loading && !isError.status && <h1 className='non'>Loading...</h1>}

      
      
        {!loading && !isError.status &&
          <div className='cards'>
            {data.map((ele) => {
              let { idMeal, strMealThumb, strMeal } = ele
              return (
                <Link to={`recipe/${idMeal}`} key={idMeal}>
                  <div className='card'>
                    <img src={strMealThumb} alt={strMeal} />
                    <p>{strMeal}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        }
     
    </div>
    </div>
  )
}





