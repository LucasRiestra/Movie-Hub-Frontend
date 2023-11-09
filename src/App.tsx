import  { FC } from 'react';
import AppRoutes from './Routes/AppRoutes';
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer/Footer'



const App: FC = () => {
  return (
    <>
    <AppRoutes /> 
    <Footer />
    </>
  );
};

export default App;
