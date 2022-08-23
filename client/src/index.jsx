import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'normalize.css';

import AppLayout from "./components/AppLayout";
import Properties from "./components/Properties";
import EditProperties from "./components/PropertyUpdate";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import VerifyUser from './components/VerifyUser'
import Mood from './components/Moods'
import Detail from './components/Detail';
import Landing from './components/Landing';

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import { AuthTokenProvider } from "./AuthTokenContext";

// import "./style/normalize.css";
// import "./style/index.css";

import './index.css';

const requestedScopes = [
  "read:todoitem",
  "read:user",
  "edit:todoitem",
  "edit:user",
  "delete:todoitem",
  "delete:user",
  "write:user",
  "write:todoitem",
];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) { //auth0 finihsed job && user is not authed
    return <Navigate to="/" replace />;
  }

  return children;
}


ReactDOM.render(
  <React.StrictMode>
    {/* auth0 provider */}
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={`${window.location.origin}/verify-user`}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope={requestedScopes.join(" ")}
    >
      {/* our code, save token and give it to all orther pages */}
      <AuthTokenProvider>
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<Landing/>}/>
            <Route path="/:propId"  element = {<Detail/>}/>

            {/* <Route path='/login' element={<Login />}></Route> */}
            {/* <Route path="/" element={<Home />} /> */}

            <Route path="/verify-user" element={<VerifyUser />} />

            <Route
              path="app"
              element={
                // when we access /app by url & not logged in, it will redirect us to the / page 
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              }
            >
              <Route path="properties" element={<Properties />} />
              <Route path="properties/update/:propertyId" element={<EditProperties />} />
             
              <Route path="moods" element={<Mood />} />
              
              {/* <Route path="debugger" element={<AuthDebugger />} /> */}
              <Route index element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
