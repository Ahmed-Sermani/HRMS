import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import SideNav from './components/SideNav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppHeader from './components/Header'
import { tokenContext } from "./context";
import ManagementBase from "./components/information_management/ManagementBase";
import  EmployeeListAndActionsBase  from "./components/employee_list_and_actions/EmployeeListAndActionsBase";
export interface StateType {
	access: string,
	refresh: string
}
const App: React.FC = () => {
	const [tokens, setTokens] = useState<StateType>()

	useEffect(() => {
		(async () => {
			try {
				const result = await getTokens()
				setTokens(result)
			} catch (e) {
				console.log(e);
			}
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
							<Route path='/information_management'>
									<ManagementBase />
							</Route>

							<Route path='/employee_list_and_actions'>
								<EmployeeListAndActionsBase />
							</Route>
						</Switch>

						

					</Layout>
				</Layout>
				}

			</tokenContext.Provider>
		</Router>
	)
}

// async function getTokens() {
//   const res = await fetch(process.env.REACT_APP_API + '/get_token',
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       }
//     }
//   )
//   const result = await res.json()
//   console.log(result)
//   return result

// }

async function getTokens() {
	const res = await fetch(process.env.REACT_APP_API_AUTH + '/token/ ',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				email: 'test@test.com',
				password: 'a1h2m3d4'
			})
		}
	)
	const result = await res.json()
	console.log(result)
	return result

}




export default App;
