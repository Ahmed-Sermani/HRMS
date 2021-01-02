import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from "antd";
import UserInfo from './UserInfo'
import  MainInfo  from "./MainInfo";
import { Props as UserInfoProps } from "./UserInfo";
import { Props as MainInfoProps } from "./MainInfo";
import { tokenContext } from "../../context";

interface State extends UserInfoProps, MainInfoProps {}

const defaultState: State = {
    'img': '',
    'name': '',
    'employeeId': '',
    'gender': '',
    'birthDay': '',
    'maritalStatus': '',
    'nationality': '',
    'age': 0,
    'nationalId': '',
    'email': '',
    'mobile': '',
    'phone': '',
    'jobTitle': '',
    'workType': '',
    'directManager': '',
    'workLocation': '',
    'branch': '',
    'department': '',
    'section': '',
    'hiringDate': '',
    'periodOfEmployment': '',
    'endOfProbation': '',
    'basicSalary': '',
    'GOSISalary': '',
    'totalSalary': '',
    'availableAnnualBalance': 0,
    'upToEndOfTheYearBalance': 0,
    'sickDayBalance': 0,
    'upToEndOfYearSickDayBalance': 0,
}

const ProfileTab: React.FC = () => {
    const tokens = useContext(tokenContext)
    const [profileInfo , setProfileInfo] = useState<State>(defaultState)
    useEffect(() => {
        (async () => {
            const result = await fetchData(tokens)
            setProfileInfo(result)
        })()
    }, [tokens])
    return(
        <Row gutter={22}>
            <Col span={7}>
                <UserInfo 
                    age ={profileInfo?.age}
                    birthDay ={profileInfo?.birthDay}
                    email ={profileInfo?.email}
                    employeeId ={profileInfo?.employeeId}
                    gender ={profileInfo?.gender}
                    img ={profileInfo?.img}
                    maritalStatus ={profileInfo?.maritalStatus}
                    mobile ={profileInfo?.mobile}
                    name ={profileInfo?.name}
                    nationalId ={profileInfo?.nationalId}
                    nationality ={profileInfo?.nationality}
                    phone ={profileInfo?.phone}
                
                />
            </Col>
            <Col span={17}>
                <MainInfo 
                    GOSISalary = {profileInfo?.GOSISalary}
                    availableAnnualBalance = {profileInfo?.availableAnnualBalance}
                    basicSalary = {profileInfo?.basicSalary}
                    branch = {profileInfo?.branch}
                    department = {profileInfo?.department}
                    directManager = {profileInfo?.directManager}
                    endOfProbation = {profileInfo?.endOfProbation}
                    hiringDate = {profileInfo?.hiringDate}
                    jobTitle = {profileInfo?.jobTitle}
                    periodOfEmployment = {profileInfo?.periodOfEmployment}
                    section = {profileInfo?.section}
                    sickDayBalance = {profileInfo?.sickDayBalance}
                    totalSalary = {profileInfo?.totalSalary}
                    upToEndOfTheYearBalance = {profileInfo?.upToEndOfTheYearBalance}
                    upToEndOfYearSickDayBalance = {profileInfo?.upToEndOfYearSickDayBalance}
                    workLocation = {profileInfo?.workLocation}
                    workType = {profileInfo?.workType}
                />
            </Col>

            </Row>
    )
}


async function fetchData(tokens: any) {
    const res = await fetch(process.env.REACT_APP_API + '/get_profile_info',
    {
        method: 'GET',
        headers:{
          Authorization: 'Bearer '+tokens.access_token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    const result = await res.json()
    result.img = process.env.REACT_APP_SERVER_URL +  result.img  
    return result

    
}


export default ProfileTab