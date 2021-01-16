import React, { useContext, useEffect, useState } from "react";
import { 
    Row,
    Col, 
    Card, 
    Image, 
    Input, 
    Button, 
    Tooltip, 
    Space, 
    Typography, 
    Modal, 
    Form,
    Select,
    DatePicker,
    notification
} from "antd";

import { EditOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { tokenContext } from "../../context";
const { Option } = Select
const { Search } = Input;
const { Text } = Typography
const { Meta } = Card;

const EmployeeList: React.FC = () => {
    const tokens = useContext(tokenContext)
    const [components, setComponents] = useState<any>([])
    const [pagination, setPagination] = useState({ next: null, previous: null })
    useEffect(() => {
        (async () => {
            const result = await getListEmployee(process.env.REACT_APP_API + '/employees_list')


            if (result.hasOwnProperty('results') && Array.isArray(result.results)) {
                let temp = [...result.results]
                let arrays = [], size = 5;

                while (temp.length > 0)
                    arrays.push(temp.splice(0, size));
                let Rows = arrays.map((arr: Array<any>) => {
                    const Cols = arr.map((value: any, index: any) => {
                        return (
                            <Col><EmployeeCard id={value.id} name={value.full_name} title={value.job_title} img={value.img} key={index} /></Col>
                        )
                    })


                    return (
                        <Row gutter={[50, 20]}>{Cols}</Row>
                    )
                })

                setComponents(Rows)
                setPagination({ next: result.next, previous: result.previous })
            }

        })()

    }, [])


    const getListEmployee = async (path: string, body?: object) => {
        const res = await fetch(path, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + tokens?.access,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body),

        })
        return await res.json()

    }

    const nextOrPerviousPageHandler = async (link: any) => {
        const result = await getListEmployee(link)
        if (result.hasOwnProperty('results') && Array.isArray(result.results)) {
            let temp = [...result.results]
            let arrays = [], size = 5;

            while (temp.length > 0)
                arrays.push(temp.splice(0, size));
            let Rows = arrays.map((arr: Array<any>) => {
                const Cols = arr.map((value: any, index: any) => {
                    return (
                        <Col><EmployeeCard name={value.full_name} title={value.job_title} img={value.img} id={value.id} key={index} /></Col>
                    )
                })


                return (
                    <Row gutter={[50, 20]}>{Cols}</Row>
                )
            })

            setComponents(Rows)
            setPagination({ next: result.next, previous: result.previous })


        }
    }

    const onSearchByID = async (value: any) => {
        const result = await getListEmployee(process.env.REACT_APP_API + '/employees_list', { id: Number(value) })
        if (result.hasOwnProperty('results') && Array.isArray(result.results)) {
            let temp = [...result.results]
            let arrays = [], size = 5;

            while (temp.length > 0)
                arrays.push(temp.splice(0, size));
            let Rows = arrays.map((arr: Array<any>) => {
                const Cols = arr.map((value: any, index: any) => {
                    return (
                        <Col><EmployeeCard name={value.full_name} title={value.job_title} img={value.img} id={value.id} key={index} /></Col>
                    )
                })


                return (
                    <Row gutter={[50, 20]}>{Cols}</Row>
                )
            })

            setComponents(Rows)
            setPagination({ next: result.next, previous: result.previous })
        }
    }

    const onSearchByName = async (value: any) => {
        const result = await getListEmployee(process.env.REACT_APP_API + '/employees_list', { search_name: value })
        if (result.hasOwnProperty('results') && Array.isArray(result.results)) {
            let temp = [...result.results]
            let arrays = [], size = 5;

            while (temp.length > 0)
                arrays.push(temp.splice(0, size));
            let Rows = arrays.map((arr: Array<any>) => {
                const Cols = arr.map((value: any, index: any) => {
                    return (
                        <Col><EmployeeCard name={value.full_name} title={value.job_title} img={value.img} id={value.id} key={index} /></Col>
                    )
                })


                return (
                    <Row gutter={[50, 20]}>{Cols}</Row>
                )
            })

            setComponents(Rows)
            setPagination({ next: result.next, previous: result.previous })
        }
    }



    return (
        <>
            <Space>
                <Search placeholder="Search By ID" width={100} enterButton style={{ marginBlock: 20 }} onSearch={onSearchByID} />
                <Search placeholder="Search by First Name" width={100} enterButton style={{ marginBlock: 20 }} onSearch={onSearchByName} />
            </Space>

            {components}
            <Space style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Tooltip title="pervious">
                    <Button disabled={!Boolean(pagination.previous)} type="primary" shape="circle" icon={<LeftOutlined />} onClick={nextOrPerviousPageHandler.bind(null, pagination.previous)} />
                </Tooltip>

                <Tooltip title="next"  >
                    <Button disabled={!Boolean(pagination.next)} type="primary" shape="circle" icon={<RightOutlined />} onClick={nextOrPerviousPageHandler.bind(null, pagination.next)} />
                </Tooltip>
            </Space>

        </>
    )
}

interface CardProps {
    name: string,
    title: string,
    id: number,
    img?: string
}
const EmployeeCard: React.FC<CardProps> = ({ name, title, img, id }: CardProps) => {

    return (
        <Card
            hoverable
            style={{ width: 300 }}
            cover={
                <Image
                    alt="profile_img"
                    style={{
                        borderRadius: '20px'
                    }}
                    src={img || "data:image/png;base64,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"}
                />
            }
            actions={[
                <CardModalForm id={id} />,
            ]}

        >
            <Meta title={name} description={title} />
            <Space><Text strong>ID : {id}</Text></Space>

        </Card>
    )
}

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
    id: number
}


const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
    id
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false)
    const tokens = useContext(tokenContext)
    const [currentData, setCurrentData] = useState<any>()

    useEffect(() => {
        (async() => {
            const res = await fetch(process.env.REACT_APP_API + `/employee_viewset/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + tokens?.access,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
    
            })

            setCurrentData(await res.json())
             
        })()
    }, [id])
    

    return (
        <Modal
            visible={visible}
            title="Edit Employee Info"
            okText="Edit"
            cancelText="Cancel"
            onCancel={onCancel}
            confirmLoading={loading}
            onOk={() => {
                setLoading(true)
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        values.setLoading = setLoading
                        onCreate(values);
                    })
                    .catch(info => {
                        setLoading(false)
                    });
            }}
        >
            {currentData && 
            <Form
                form={form}
                layout="vertical"
                name="employee"
                initialValues={{ 
                    job_title: currentData.job_title,
                    work_type: currentData.work_type,
                    marital_status: currentData.marital_status,
                    work_location: currentData.work_location,
                    branch: currentData.branch,
                    base_salary: currentData.base_salary,
                    GOSI_salary: currentData.GOSI_salary,
                    
                 }}
            >


            <Form.Item
                name="job_title"
                label="Job Title"
                rules={[
                    { required: true, message: 'Please Input The Job Title' },
                ]}
               
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="work_type"
                label="Work Type"
                rules={[
                    { required: true, message: 'Please Input The Work Type' },
                ]}
            >
                <Select>
                    <Select.Option value="Full Time">Full Time</Select.Option>
                    <Select.Option value="Part Time">Part Time</Select.Option>
                    <Select.Option value="Remotely">Remotely</Select.Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="marital_status"
                label="Marital Status"
                rules={[
                    { required: true, message: 'Please Input The Marital Status' },
                ]}
            >
                <Select>
                    <Select.Option value="Single">Single</Select.Option>
                    <Select.Option value="Married">Married</Select.Option>
                </Select>
            </Form.Item>


            <Form.Item
                name="work_location"
                label="Work location"
                rules={[
                    { required: true, message: 'Please Input The Work location' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="branch"
                label="Branch"
                rules={[
                    { required: true, message: 'Please Input The Branch' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="base_salary"
                label="Base Salary"
                rules={[
                    {
                        required: true,
                        message: 'Please input the Base Salary',
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="GOSI_salary"
                label="GOSI Salary"
                rules={[
                    {
                        required: true,
                        message: 'Please input the GOSI Salary',
                    }
                ]}
            >
                <Input />
            </Form.Item>
            </Form>}
        </Modal>
    );
};

const CardModalForm: React.FC<{ id: number }> = ({ id }) => {

    const [visible, setVisible] = useState(false);
    const tokens = useContext(tokenContext)

    const onCreate =  async(values: any) => {
        try{
             const res = await fetch(process.env.REACT_APP_API + `/employee_viewset/${id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + tokens?.access,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values)
    
            })
            const result = await res.json()
            if(result.hasOwnProperty('success') && !result.result){
                notification.error({message: result.message})
            }
            notification.success({message:'Successfully Updated'})

        }catch(e){
            notification.error({message: 'Error Encountered While Updating'})
        }
        console.log(values);
        
        values.setLoading(false)
        setVisible(false);
    };


    return (
        <>
            <Button
                type="text"
                onClick={() => {
                    setVisible(true);
                }}
            >
                <EditOutlined key="edit" />
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                id={id}
            />
        </>
    );
}


export default EmployeeList