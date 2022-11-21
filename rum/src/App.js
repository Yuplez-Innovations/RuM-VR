import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Signup from "./pages/auth/Signup.page";
import Login from "./pages/auth/Login.page";
import Folder from './pages/Folder.page'
import EachFolder from './pages/EachFolder.page'
import UserRoute from "./routes/User.route";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    //   <>
    //   <ToastContainer
    //   position="top-right"
    //   autoClose={3000}
    //   hideProgressBar
    //   newestOnTop
    //   closeOnClick
    //   rtl={false}
    //   pauseOnFocusLoss
    //   draggable
    //   pauseOnHover
    // />

    <Router>
      <div className="">
        <Routes >
          {user ? (
            <>
              <Route path="/" element={<UserRoute />}>
                {
                  user.role === 'admin' ?
                    (
                      <Route path="/" element={<Folder />} />
                    ) : (
                      <Navigate to={`/${user.folderAccess}`} />
                    )
                }
              </Route>
              <Route path="/" element={<UserRoute />}>
                <Route path="/:id_folder" element={<EachFolder />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to={`/login`} />} />
            </>
          )}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </Router>
    // </>
  );
}

export default App;