import React from 'react'
import ProfessionalInfos from "./ProfessionalInfos";
import SalaryPackage from './SalaryPackage'
import TimeoffBalances from "./TimeoffBalances";
const MainInfo: React.FC = () => {
    return(
        <>
        <ProfessionalInfos />
        <SalaryPackage />
        <TimeoffBalances />
        </>
    )   
}

export default MainInfo