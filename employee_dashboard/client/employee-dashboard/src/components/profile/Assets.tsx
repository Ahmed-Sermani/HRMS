import React, { useContext, useEffect, useState } from 'react'
import { Tokens, tokenContext } from '../../context'
import { Table } from 'antd'

const Assets: React.FC = () => {
    const [data , setData] = useState()
    const tokens = useContext(tokenContext)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Asset',
            dataIndex: 'asset',
            key: 'asset',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        }
    ]

    useEffect(() => {
        (async () => {
            const result = await getEmployeeAssets(tokens)
            setData(result)
        })()
    }, [])



    return (
        <Table bordered columns={columns} dataSource={data}></Table>
    )
}

const getEmployeeAssets = async(tokens: Tokens | undefined) => {
    const res = await fetch(process.env.REACT_APP_API + '/assets', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + tokens?.access,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const result = await res.json()
    console.log(result);
    
    return result
}

export default Assets
