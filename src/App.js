import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthContext } from './Contexts/AuthProvider';
import routes from './Routes/Routes';
function App() {
  const { user, logOut } = useContext(AuthContext);

  // useEffect(() => {
  //   if (user) {
  //     fetch('http://localhost:5000/uservalidationcheck', {
  //       headers: {
  //         'content-type': 'application/json',
  //         authorization: `barer ${localStorage.getItem('accessToken')}`
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.status === 'Forbidden' || data.status === 'unauthorized access') {
  //           logOut()
  //             .then(res => toast.success('Session dead, Please login Again!'))
  //             .then(error => console.log(error))
  //         }
  //       })
  //   }
  // }, [])
  return (
    <div className="max-w-[1440px] mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
