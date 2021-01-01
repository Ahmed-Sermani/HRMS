import React from 'react'
import ProfessionalInfos from "./ProfessionalInfos";
import SalaryPackage from './SalaryPackage'
import TimeoffBalances from "./TimeoffBalances";

export interface Props {
    jobTitle: string,
    workType: string,
    directManager: string,
    branch: string,
    workLocation: string,
    department: string,
    section: string,
    hiringDate: string,
    periodOfEmployment: string,
    endOfProbation: string,
    basicSalary: string,
    GOSISalary: string,
    totalSalary: string,
    availableAnnualBalance: number,
    upToEndOfTheYearBalance: number,
    sickDayBalance: number,
    upToEndOfYearSickDayBalance: number

}

const MainInfo: React.FC<Props> = (props: Props) => {
    return(
        <>
        <ProfessionalInfos 
            branch = {props.branch}
            department = {props.department}
            directManager = {props.directManager}
            endOfProbation = {props.endOfProbation}
            hiringDate = {props.hiringDate}
            jobTitle = {props.jobTitle}
            periodOfEmployment = {props.periodOfEmployment}
            section = {props.section}
            workLocation = {props.workLocation}
            workType = {props.workType}

        />

        <SalaryPackage 
            GOSISalary = {props.GOSISalary}
            basicSalary = {props.basicSalary}
            totalSalary = {props.totalSalary}
        />

        <TimeoffBalances
            availableAnnualBalance = {props.availableAnnualBalance}
            sickDayBalance = {props.sickDayBalance}
            upToEndOfTheYearBalance = {props.upToEndOfTheYearBalance}
            upToEndOfYearSickDayBalance = {props.upToEndOfYearSickDayBalance}
        />

        </>
    )   
}

export default React.memo(MainInfo)