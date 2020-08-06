import React from 'react';
import Layout from './core/Layout';

function App() {
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="pt-5 text-center">React Node MongoDB Authenntication boilerplate</h1>
        <h2 className="pt-4 text-center">MERN STACK</h2>
        <hr/>
        <p className="text-center lead mt-1">Learn MERN stack web development by building production ready login register system with account activation, forgot password, reset password, login with facebook, login with google as well as ACL by implementing private and protected routes for authenticated user and users with the role of admin.</p>
      </div>
    </Layout>
  );
}

export default App;
