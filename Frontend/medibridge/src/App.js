import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';



function App(){


return <> 
         <BrowserRouter>
               <Routes>
                   <Route index path={"/"} element={<Home />} />
                   <Route path={"/signup"} element={<Signup />} />
                   <Route path={"/login"} element={<Login />} />
               </Routes>
          </BrowserRouter>
      </>

}

export default App;