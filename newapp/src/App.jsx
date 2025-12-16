import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Admin from './pages/Admin'
import ProtectedAdminRoute from './pages/ProtectedAdminRoute'
import Signup from '../src/pages/Signup.jsx'
import Login from './pages/Login.jsx'
import AdminProducts from './pages/AdminProducts.jsx'
import Adminorders from './pages/Adminorders.jsx'
import Admindashboard from './pages/Admindashboard.jsx'
import Addproducts from './pages/Addproducts.jsx'
import EditProduct from './pages/EditProduct.jsx'

function App() {
  return<>
  <Routes>
    <Route path='/'  element={<Home/>}/>
    <Route path='/admin/signup' element={<Signup />}/>
    <Route path='/admin/login' element={<Login />}/>
    <Route
    path='/admin'
    element={<ProtectedAdminRoute>
      <Admin />
    </ProtectedAdminRoute>}
    >
    </Route>
    <Route
    path='/admin/products'
    element={
      <ProtectedAdminRoute>
        <Admin>
          <AdminProducts />
        </Admin>
      </ProtectedAdminRoute>
    }
    >     
    </Route>
     <Route
    path='/admin/orders'
    element={
      <ProtectedAdminRoute>
        <Admin>
          <Adminorders />
        </Admin>
      </ProtectedAdminRoute>
    }
    >     
    </Route>
      <Route
    path='/admin/dashboard'
    element={
      <ProtectedAdminRoute>
        <Admin>
          <Admindashboard />
        </Admin>
      </ProtectedAdminRoute>
    }
    >     
    </Route>
    <Route
    path='/admin/add'
    element={
      <ProtectedAdminRoute>
      <Admin>
        <Addproducts/>
      </Admin>
      </ProtectedAdminRoute>
    }
    >
    </Route>
    <Route
    path='/admin/updatedproduct/:id'
    element={
      <ProtectedAdminRoute>
        <Admin>
          <EditProduct/>
        </Admin>
      </ProtectedAdminRoute>
    }
    >
    </Route>
  </Routes>
    </>
}

export default App
