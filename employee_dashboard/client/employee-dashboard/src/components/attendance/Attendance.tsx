import React, { useContext, useEffect, useState } from 'react'
import { Layout, Tabs } from 'antd'
import CheckInOut from './CheckInOut'
import History from './History'
import { Tokens, tokenContext, ShiftSub, shiftSubContext } from '../../context'
const { TabPane }= Tabs
const { Content } = Layout
const Attendance: React.FC = () => {

    const tokens = useContext(tokenContext)
    const [shiftSub, setShiftSub] = useState<ShiftSub>()
    useEffect(() => {
        (async() => {
            const shiftSubResult = await getShiftInfo(tokens)
            setShiftSub(shiftSubResult)
        })()
    },[])

    return(
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <Tabs type="card">
                <TabPane tab="Check in/out" key="1">
                    <shiftSubContext.Provider value={shiftSub}>
                        {shiftSub && <CheckInOut/>}
                    </shiftSubContext.Provider>
                </TabPane>
                <TabPane tab="Attendance History" key="2">
                    <History />
            </TabPane>
            </Tabs>
        </Content>
    )
}

async function getShiftInfo(tokens: Tokens | undefined) {
    const res = await fetch(process.env.REACT_APP_API + '/shift', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + tokens?.access,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const result = await res.json()
    //@ts-ignore
    result.shift.polygon = JSON.parse(result.shift.polygon)

    return result
}

export default Attendance