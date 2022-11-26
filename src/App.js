import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthContext } from './Contexts/AuthProvider';
import routes from './Routes/Routes';
function App() {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="max-w-[1440px] mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
