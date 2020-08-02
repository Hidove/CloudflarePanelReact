import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Space, Button, message } from 'antd'
import {
    SafetyCertificateOutlined
} from '@ant-design/icons';

import { dnsRecordUpdate, dnsRecordDelete } from '@service/zone';

import FormattedMessage  from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

function Operation(props) {

    const [btnState, setBtnState] = useState(false)

    const [
        zone_id, record, index, [
            dnsrecords, setDnsrecords
        ]
    ] = [props.zone_id, props.record, props.index, [props.dnsrecords.dnsrecords, props.dnsrecords.setDnsrecords]]

    return (
        <Space size="middle">
            <Button type="dashed" className={'cdn ' + (record.proxied === true ? 'active' : '')} icon={<SafetyCertificateOutlined />} onClick={
                () => {
                    record.proxied = !record.proxied;
                    message.loading({ content: 'Loading...', key: 'loading', duration: 0 });
                    dnsRecordUpdate(zone_id, record.id, record)
                        .then((res) => {
                            if (res.code === 200) {

                                setDnsrecords([...dnsrecords])

                                message.success({ content: ImperativeFormatMessage('Update completed'), key: 'loading' });
                            } else {
                                message.error({ content: res.msg, key: 'loading' });
                            }
                        })
                }
            }></Button>
            <Link to={'/user/zone/' + record.zone_id + '/dnsrecord/' + record.id + '/edit'}><Button><FormattedMessage id='Manage'/></Button></Link>
            <Button type="dashed" danger
                loading={btnState}
                onClick={
                    () => {
                        setBtnState(true)
                        message.loading({ content: 'Loading...', key: 'loading', duration: 0 });
                        dnsRecordDelete(zone_id, record.id)
                            .then((res) => {
                                setBtnState(false)
                                if (res.code === 200) {
                                    dnsrecords.splice(index, 1);
                                    setDnsrecords([...dnsrecords])
                                    message.success({ content: ImperativeFormatMessage('Successfully deleted'), key: 'loading' });
                                } else {
                                    message.error({ content: res.msg, key: 'loading' });
                                }
                            })
                    }
                }>Delete</Button>
        </Space>

    )
}

export default Operation
