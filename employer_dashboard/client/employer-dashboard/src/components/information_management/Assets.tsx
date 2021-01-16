import React, { useContext, useEffect, useState } from "react";
import { Table, Popconfirm, notification, Modal, Form, Input, Button } from 'antd';
import { tokenContext } from "../../context";



const Assets: React.FC = () => {
    const tokens  = useContext(tokenContext)
    const [dataSource, setDataSource] = useState<any>([])
    useEffect(() => {
        (async() => {

            const res = await fetch(process.env.REACT_APP_API + '/assert_viewset', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + tokens?.access,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })

            setDataSource(await res.json())
            

        })()
        
    }, [])

    const handleDelete = async (id: number) => {
        try{
            await fetch(process.env.REACT_APP_API + `/assert_viewset/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + tokens?.access,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            notification.success({message:'Deleted Successfully'})
        }
        catch(e){
            notification.error({message:'Error While Deleting'})
        }
       

    }


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
        },
        {
            title: 'Assigned To',
            dataIndex: 'assigned',
            key: 'assigned',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: any) =>
              dataSource.length >= 1 ? 
              (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)} >
                  <a>Delete</a>
                </Popconfirm>
              ): null,
          },
      ];
    
    return(
        <>
        <CollectionsPage />
        <Table
            columns={columns}
            dataSource={dataSource}
            bordered
            size="large"
        />
        </>
    )
}

interface Values {
    title: string;
    description: string;
    asset: string;
    assigned: string;
  }
  
  interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
  }
  
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="asset"
            label="Asset"
            rules={[{ required: true, message: 'Please input the asset name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="assigned"
            label="Assigned"
            rules={[{ required: true, message: 'Please input the assigned person email' }, {type: 'email'}]}
          >
            <Input />
          </Form.Item>

          
          
          
        </Form>
      </Modal>
    );
  };
  
  const CollectionsPage = () => {
    const [visible, setVisible] = useState(false);
    const tokens  = useContext(tokenContext)

    const onCreate = async (values: any) => {
        try{
            const res = await fetch(process.env.REACT_APP_API + `/assert_viewset/`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + tokens?.access,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const result = await res.json()

            if(result.hasOwnProperty('success') && !result.success){
                notification.error({message: result.message})
            }
            else{
                notification.success({message: 'Added Successfully'})
            }
        }
        catch(e){
            notification.error({message:'Error While Adding'})

        }
      setVisible(false);
    };
  
    return (
      <div style={{marginBlock: 20}}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          New Asset
        </Button>
        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    );
  };
  



export default Assets