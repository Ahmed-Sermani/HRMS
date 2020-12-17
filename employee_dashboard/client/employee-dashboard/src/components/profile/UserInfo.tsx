import React from 'react'
import { Card, Image, Divider } from "antd";
import ContactInfo from './ContactInfo'
import PersonalInfos from './PersonalInfos'
import BasicInfo from './BasicInfo'
import ProfileCardActions from './ProfileCardActions'

const UserInfo: React.FC = () => {




    return (
        <Card
            title="User Info"
            type={'inner'}
            cover={
                <Image
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
        >

            <BasicInfo />
            <Divider />
            <PersonalInfos />
            <Divider />
            <ContactInfo />
            <Divider />
            <ProfileCardActions />
            
        </Card>
    )
}


export default UserInfo