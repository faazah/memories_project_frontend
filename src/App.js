import { Container } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";

export const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <>
    <GoogleOAuthProvider clientId='340742392150-vlhc550bg9s02c3o3qqll9ibkovqr41i.apps.googleusercontent.com'>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts"/>}></Route>
        <Route path="/posts" element={<Home/>}></Route>
        <Route path="/posts/search" element={<Home/>}></Route>
        <Route path="/posts/:id" element={<PostDetails/>}></Route>
        <Route path="/auth" element={(!user ? <Auth/> : <Navigate to="/posts"/>)}></Route>
      </Routes>
    </Container>
    </GoogleOAuthProvider>
    </>
  );
};
