import React, { useState } from 'react'
import { Card, Image, Divider } from "antd";
import ContactInfo from './ContactInfo'
import PersonalInfos from './PersonalInfos'
import BasicInfo from './BasicInfo'
import ProfileCardActions from './ProfileCardActions'
export interface Props {
    img: string,
    name: string,
    employeeId: string,
    gender: string,
    birthDay: string,
    maritalStatus: string,
    nationality: string,
    age: number,
    nationalId: string,
    email: string,
    mobile: string,
    phone: string
}
const UserInfo: React.FC<Props> = (props: Props) => {

    
    return (
        <Card
            title="User Info"
            type={'inner'}
            cover={
                <Image
                    alt="profile_img"
                    style={{
                        borderRadius: '20px'
                    }}
                    src={props.img}
                />
            }
        >

            <BasicInfo
                employeeId = {props.employeeId}
                name = {props.name}
            />

            <Divider />
            <PersonalInfos
                age = {props.age}
                birthDay = {props.birthDay}
                gender = {props.gender}
                maritalStatus = {props.maritalStatus}
                nationalId = {props.nationalId}
                nationality = {props.nationality}
            />
            <Divider />

            <ContactInfo
                email = {props.email}
                mobile = {props.mobile}
                phone = {props.phone}
            
            />

            <Divider />
            <ProfileCardActions />
            
        </Card>
    )
}


export default UserInfo