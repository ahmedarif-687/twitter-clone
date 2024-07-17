import './App.css';
import Body from './components/Body';
import {Toaster} from "react-hot-toast"
// import { Route, Routes } from 'react-router-dom';
// import Home from './components/Home';


function App() {
  return (
    <div>
       {/* <Routes>
        <Route path="/" element={<Home />} />
      </Routes>  */}
       <Body/>
       <Toaster/>
    </div>
  );
}

export default App;



