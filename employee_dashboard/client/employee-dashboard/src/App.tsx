import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import SideNav from './components/SideNav';
import Profile from './components/profile/Profile'
import Attendance from './components/attendance/Attendance'
import Tasks from './components/tasks/Tasks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppHeader from './components/Header'
import { tokenContext } from "./context";


export interface StateType {
  access: string,
  refresh: string
}

const App: React.FC = () => {
  const [tokens, setTokens] = useState<StateType>()

  useEffect(() => {
    (async () => {
      const result = await getTokens()
      setTokens(result)
    })()
  }, [])


  return (
    <Router>
      <tokenContext.Provider value={tokens}>
        {tokens && <Layout style={{ minHeight: '100vh' }}>
        <SideNav />
        <Layout className="site-layout">
          <AppHeader />
          <Switch>
            <Route path='/employee/profile'>
              <Profile />
            </Route>
            <Route path='/employee/attendance'>
              <Attendance />
            </Route>

            <Route path='/employee/tasks'>
              <Tasks />
            </Route>
            
          </Switch>

        </Layout>
      </Layout>
        }
        
      </tokenContext.Provider>
    </Router>
  )
}

async function getTokens() {
  const res = await fetch(process.env.REACT_APP_API + '/get_token',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  )
  const result = await res.json()
  return result

}





export default App;
