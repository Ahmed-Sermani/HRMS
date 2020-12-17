import React, { useState } from 'react'
import { Row, Col, Modal, Button, Upload, Input } from "antd"
import { UploadOutlined } from '@ant-design/icons'


const ProfileCardActions: React.FC = () => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);

    const showChangePasswordModal = () => {
        setVisible(true)
    }

    const handleSubmit = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <>
            <Row justify={'space-between'}>
                <Col>
                    <Upload>
                        <Button type="primary" shape="round"  >
                            <UploadOutlined /> Change Image
                        </Button>
                    </Upload>
                </Col>

                <Col>
                    <Button type="primary" shape="round" onClick={showChangePasswordModal}>
                        Change Password
                    </Button>
                </Col>
            </Row>
            <Modal
                title="Password Reset"
                visible={visible}
                onOk={handleSubmit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText='Confirm'
                
            >
                <Row justify={'space-between'}>
                    <Input.Password 
                        placeholder="current password"
                        />
                    
                    
                    <Input.Password 
                        placeholder="old password"
                        />
                    

                
            
                    <Input.Password
                        placeholder="confirm password"
                    />
                
                    
                </Row>
            </Modal>
        </>
    )
}

export default ProfileCardActions