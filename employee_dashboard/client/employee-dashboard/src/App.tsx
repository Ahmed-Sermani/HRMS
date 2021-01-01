import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import SideNav from './components/SideNav';
import Profile from './components/profile/Profile'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppHeader from './components/Header'
import { tokenContext } from "./context";


export interface StateType {
  access: string,
  refresh: string
}

const App: React.FC = () => {
  const [tokens, setTokens] = useState<StateType>({ access: '', refresh: '' })

  useEffect(() => {
    (async () => {
      const result = await getTokens()
      setTokens(result)
    })()
  }, [])
  

  return (
    <Router>
      <tokenContext.Provider value={tokens}>
      <Layout style={{ minHeight: '100vh' }}>

        <SideNav />

        <Layout className="site-layout">
          <AppHeader />
          <Route path='/employee/profile'>
            <Profile />
          </Route>

        </Layout>
      </Layout>
      </tokenContext.Provider>
    </Router>
  )
}

async function getTokens() {
  //const res = await fetch(process.env.REACT_APP_API + '/get_token')
  const res = await fetch(process.env.REACT_APP_API_AUTH + '/token/',
    {
      method: 'POST',
      body: JSON.stringify(
        {
          email: "test@test.com",
          password: "a1h2m3d4"
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  const result = await res.json()
  return result
}



export default App;
