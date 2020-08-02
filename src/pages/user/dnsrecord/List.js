import React, { useState, useEffect, useMemo } from 'react'
import { Table, Button, message, Divider } from 'antd';
import Mybreadcrumb from '@components/Mybreadcrumb';
import { getZoneDnsrecordsApi } from '@service/zone';
import '@css/user/dnsrecord/List.scss';
import Operation from '@components/dnsrecord/Operation';

import FormattedMessage  from '@components/FormattedMessage';

const breadcrumb = [
    {
        title: 'Zones',
        link: '/user/zones'
    },
    {
        title: 'DNSRecords'
    }
]
const List = (props) => {
    const [dnsrecords, setDnsrecords] = useState([]);
    const params = props.match.params
    const [loading, setloading] = useState(true)
    const columns = useMemo(() => {
        return [
            {
                title: <FormattedMessage id='Record Type' />,
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: <FormattedMessage id='Host Name' />,
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: <FormattedMessage id='Content' />,
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: <FormattedMessage id='TTL' />,
                dataIndex: 'ttl',
                key: 'ttl',
            },
            {
                title: <FormattedMessage id='Operation' />,
                key: 'operation',
                render: (text, record, index) => {
                    return (
                        <Operation
                            zone_id={params.zone_id}
                            record={record}
                            dnsrecords={{ dnsrecords, setDnsrecords }}
                            index={index}
                        />
                    )
                },
            },
        ];
    }, [dnsrecords, params.zone_id])
    useEffect(() => {
        getZoneDnsrecordsApi(params.zone_id)
            .then((res) => {
                setloading(false);
                if (res.code === 200) {
                    setDnsrecords(res.data);
                } else {
                    message.error(res.msg)
                }
            })
    }, [params.zone_id])

    return (
        <div>
            <Mybreadcrumb path={breadcrumb} />
            <Button
                onClick={() => {
                    props.history.push('/user/zone/' + params.zone_id + '/dnsrecord/create')
                }}
                type="primary"
            >
                <FormattedMessage id='Add a Dnsrecord' />
            </Button>
            <Divider />
            <Table
                columns={columns}
                dataSource={dnsrecords}
                loading={loading}
                rowKey={record => record.id} />
        </div>
    );
}
export default List;
