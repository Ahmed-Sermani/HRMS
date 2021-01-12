import React, { useContext, useEffect, useState } from 'react'
import { Table } from "antd";
import { Tokens, tokenContext } from "../../context";

interface BankAccountsRes {
    bank: string,
    card_number: string
}


const BankAccounts: React.FC = () => {
    const tokens = useContext(tokenContext)
    const [data , setData] = useState<BankAccountsRes[] | undefined>()
    const columns = [
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
        },
        {
          title: 'Card Number',
          dataIndex: 'card_number',
          key: 'card_number',
        },
    ]

    useEffect(() => {
        (async () => {
            const result = await getBankAccounts(tokens)
            setData(result)

        })()
    },[])


    return (
        <Table bordered columns={columns} dataSource={data}></Table>
    )
}

const getBankAccounts = async (tokens: Tokens| undefined) => {
    const res = await fetch(process.env.REACT_APP_API + '/bank_accounts', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + tokens?.access,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const result: any = await res.json()
    return result

}


export default BankAccounts