import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import SideNav from './components/SideNav';
import Profile from './components/Profile'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppHeader from './components/Header'


const App: React.FC = () => {

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>

        <SideNav />

        <Layout className="site-layout">
        <AppHeader/>
          <Route path='/employee/profile'>
            <Profile />
          </Route>

        </Layout>
      </Layout>
    </Router>
  )
}




export default App;
