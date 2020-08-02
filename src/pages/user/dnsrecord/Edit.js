import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Form, Input, Button, Select, Switch, message, Spin } from 'antd';

import Mybreadcrumb from '@components/Mybreadcrumb';
import { getDnsRecordInfoApi, dnsRecordUpdate, dnsRecordCreate } from '@service/zone';

import FormattedMessage from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

const { Option } = Select;

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

const initialValues = {
  type: 'CNAME',
  ttl: 1,
  proxied: true
}

const Edit = (props) => {

  const params = props.match.params
  const [loading, setLoading] = useState(true)

  const isCreate = useCallback(
    () => {
      return params.dns_record_id === undefined
    },
    [params],
  )
  const formRef = useMemo(() => React.createRef(), []);

  useEffect(() => {
    if (!isCreate()) {
      message.loading('loading...', 0);
      getDnsRecordInfoApi(params.zone_id, params.dns_record_id)
        .then((res) => {
          if (res.code === 200) {
            const data = res.data;
            formRef.current.setFieldsValue(data)
          } else {
            message.error(ImperativeFormatMessage('Failed to load dns record', { msg: res.msg }));
          }
        }).finally(() => {
          message.destroy()
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [params, formRef, isCreate])
  const onFinish = values => {
    message.loading({ content: 'loading...', key: 'loading', duration: 0 });

    setLoading(true)
    if (isCreate()) {
      //新增
      dnsRecordCreate(params.zone_id, values)
        .then((res) => {
          message.destroy()
          if (res.code === 200) {
            message.success({ content: ImperativeFormatMessage('Added record successfully'), key: 'loading' });
            props.history.push('/user/zone/' + params.zone_id + '/dnsrecord');
          } else {
            message.warning({ content: res.msg, key: 'loading' });
          }
        }).finally(() => {
          setLoading(false)
        })

    } else {
      // 更新
      dnsRecordUpdate(params.zone_id, params.dns_record_id, values)
        .then((res) => {
          if (res.code === 200) {
            message.success({ content: ImperativeFormatMessage('Update record successfully'), key: 'loading' });
            props.history.push('/user/zone/' + params.zone_id + '/dnsrecord');
          } else {
            message.warning({ content: res.msg, key: 'loading' });
          }
        }).finally(() => {
          setLoading(false)
        })
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const breadcrumb = [
    {
      title: 'Zones',
      link: '/user/zones'
    },
    {
      title: 'DNSRecord',
      link: '/user/zone/' + params.zone_id + '/dnsrecord'
    },
    {
      title: isCreate() ? 'Create' : 'Edit'
    }
  ]
  return (
    <div>
      <Mybreadcrumb path={breadcrumb} />
      <Spin delay={100} spinning={loading} tip="Loading...">
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={initialValues}
          ref={formRef}
        >

          <Form.Item
            label={<FormattedMessage id='Record Name' />}
            name="name"
            rules={[
              {
                required: true,
                message: <FormattedMessage id='Please input your Record Name' />
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id='Record Type' />}
            name="type"
            rules={[
              {
                required: true,
                message: <FormattedMessage id='Please input your Record Type' />
              },
            ]}
          >
            <Select style={{ width: 170 }}>
              <Option value="A">A</Option>
              <Option value="AAAA">AAAA</Option>
              <Option value="CNAME">CNAME</Option>
              <Option value="TXT">TXT</Option>
              <Option value="SRV">SRV</Option>
              <Option value="LOC">LOC</Option>
              <Option value="MX">MX</Option>
              <Option value="NS">NS</Option>
              <Option value="SPF">SPF</Option>
              <Option value="CERT">CERT</Option>
              <Option value="DNSKEY">DNSKEY</Option>
              <Option value="DS">DS</Option>
              <Option value="NAPTR">NAPTR</Option>
              <Option value="SMIMEA">SMIMEA</Option>
              <Option value="SSHFP">SSHFP</Option>
              <Option value="TLSA">TLSA</Option>
              <Option value="URI">URI</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id='Record Content' />}
            name="content"
            rules={[
              {
                required: true,
                message: <FormattedMessage id='Please input your Record Content' />
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id='TTL' />}
            name="ttl"
            rules={[
              {
                required: true,
                message: <FormattedMessage id='Please input your TTL' />
              },
            ]}
            valuePropName='value'
          >
            <Select style={{ width: 170 }}>
              <Option value={1}>Automatic</Option>
              <Option value={120}>2 mins</Option>
              <Option value={300}>5 mins</Option>
              <Option value={600}>10 mins</Option>
              <Option value={900}>15 mins</Option>
              <Option value={1800}>30 mins</Option>
              <Option value={3600}>1 hour</Option>
              <Option value={7200}>2 hours</Option>
              <Option value={18000}>5 hours</Option>
              <Option value={43200}>12 hours</Option>
              <Option value={86400}>1 day</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id='CDN' />}
            name="proxied"
            rules={[
              {
                required: true,
                message: <FormattedMessage id='Please input your CDN' />
              },
            ]}
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>

          <Form.Item  {...submitTailLayout}>
            <Button type="primary" htmlType="submit" block>
              <FormattedMessage id='Submit' />
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
export default Edit;
