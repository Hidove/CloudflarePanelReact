import React, { useState, useEffect, useMemo } from 'react'


import { Table, Tag, message } from 'antd';

import Mybreadcrumb from '@components/Mybreadcrumb';
import { getZonesApi } from '@service/zone';

import '@css/user/zone/List.scss';
import Operation from '@components/zone/Operation';

import FormattedMessage  from '@components/FormattedMessage';
const breadcrumb = [
    {
        title: 'Zones'
    }
]
const List = () => {
    const [zones, setZones] = useState([]);
    const [loading, setloading] = useState(true)

    useEffect(() => {
        getZonesApi()
            .then((res) => {
                setloading(false);
                if (res.code === 200) {
                    setZones(res.data);
                } else {
                    message.error(res.msg)
                }
            })
    }, [])
    const columns = useMemo(() => {
        return (
            [
                {
                    title: <FormattedMessage id='Zone' />,
                    dataIndex: 'name',
                    key: 'name',
                    render: text => text,
                },
                {
                    title: <FormattedMessage id='Status' />,
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => {
                        let color = 'green';
                        if (status !== 'active') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={status}>
                                {status.toUpperCase()}
                            </Tag>
                        );

                    },
                },
                {
                    title: <FormattedMessage id='Operation' />,
                    key: 'operation',
                    render: (text, zone, index) => (
                        <Operation zone_id={zone.id} index={index} zones={{ zones, setZones }} />
                    ),
                },
            ]
        )
    }, [zones])
    return (
        <div>
            <Mybreadcrumb path={breadcrumb} />
            <Table columns={columns} dataSource={zones} rowKey={record => record.id} loading={loading} />
        </div>
    );
}
export default List
