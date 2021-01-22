import React from 'react'
import { Layout } from 'antd';
import { HeaderColor } from '../Constants'

const { Header } = Layout
const AppHeader: React.FC =  () => {
   

  
    
    return (
        <Header hasSider={true} style={{
            background: HeaderColor,
            lineHeight: '63px'
        }}>
        </Header>
    )
}



export default AppHeader