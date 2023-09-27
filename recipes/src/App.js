import {Home} from './Home.js';
import Recipedetails from './recipedetails.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Error from './Error.js';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/recipe/:recipeId' element={<Recipedetails/>}/>
      <Route path='*' element={<Error/>}/>

    </Routes >
    </BrowserRouter>
    </>
  );
}

export default App;
