import React from 'react'
import { Form, Input, Button, message } from 'antd';

import Mybreadcrumb from '@components/Mybreadcrumb';
import { zoneCreate } from '@service/zone';

import FormattedMessage  from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

const layout = {
    labelCol: {
        span: 3,
        sm: {
            span: 5,
        },
        lg: {
            span: 3,
        }
    },
    wrapperCol: {
        span: 12,
        sm: {
            span: 15,
        },
        lg: {
            span: 12,
        }
    },
};
const submitTailLayout = {
    wrapperCol: {
        offset: 3,
        span: 12,
        xs: {
            offset: 0,
            span: 15,
        },
        sm: {
            offset: 5,
            span: 15,
        },
        lg: {
            offset: 3,
            span: 12,
        }
    },
};
const breadcrumb = [
    {
        title: 'Zones',
        link: '/user/zones'
    },
    {
        title: 'Create'
    }
]

const Edit = (props) => {
    const onFinish = values => {
        message.loading({ content: 'loading...', key: 'loading', duration: 0 });
        zoneCreate(values.zone_name)
            .then((res) => {
                if (res.code === 200) {
                    message.success({content: ImperativeFormatMessage('Add domain name successfully'), key:'loading' });
                    props.history.push('/user/zones');
                } else {
                    message.error({ content: ImperativeFormatMessage('Failed to add domain',{ msg: res.msg }), key: 'loading' });
                }
            });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Mybreadcrumb path={breadcrumb} />
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label={<FormattedMessage id='Zone Name' />}
                    name="zone_name"
                    rules={[
                        {
                            required: true,
                            message: <FormattedMessage id='Please input your Zone Name' />,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item  {...submitTailLayout}>
                    <Button type="primary" htmlType="submit" block>
                        <FormattedMessage id='Submit' />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Edit;
