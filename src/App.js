import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import routes from './Routes/Routes';
function App() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
