import React, { useContext, useEffect, useState } from 'react'
import { Space, message, Table, Tag } from 'antd'

import SwitchCard from '@components/SwitchCard'

import Context from '@utils/context';
import { getZonePagerules } from '@service/zone'
import Actions from '@components/zone/Pagerules/Actions';

import FormattedMessage  from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

const Pagerules = (props) => {


    const { zone_id } = useContext(Context)
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true)

    const columns = [
        {
            title: <FormattedMessage id='URL/description' />,
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => {
                return (
                    <div>
                        <h4>
                            {
                                record.targets.map((v, index) => <span key={index} color="cyan">{v.constraint.value}</span>)
                            }
                        </h4>
                        <br />
                        <p>{
                            record.actions.map((v, index) => {
                                if (typeof v.value === 'string') {
                                    return <Tag key={index} color="cyan">{v.id}:{v.value}</Tag>
                                } else {
                                    return <Tag key={index} color="cyan">{v.id}:{JSON.stringify(v.value)}</Tag>
                                }
                            })
                        }</p>
                    </div>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <Actions record={record} zone_id={zone_id} pageRules={{ pageRules: dataSource, setPageRules: setDataSource }} index={index} />
                )
            },
        },
    ];

    useEffect(() => {
        getZonePagerules(zone_id)
            .then((res) => {
                if (res.code === 200) {
                    setDataSource(res.data)
                } else {
                    message.error(ImperativeFormatMessage('Failed to get page rules'))
                }
            }).finally(() => setLoading(false))
    }, [zone_id])

    return (

        <Space direction="vertical"
            style={{ width: '100%' }}>

            <SwitchCard loading={loading} title={<FormattedMessage id='Page rules' />}>
                <FormattedMessage id='<div>Page rules are used to control which Cloudflare settings are triggered for a given URL. Only one page rule is triggered for each URL, so if you sort the page rules in order of priority, this is very useful. Please set the URL mode as specific as possible.<br />You have {number} page rules left.</div>' values={{ number: 99999 }} />
            </SwitchCard>
            <Table
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                rowKey={record => record.id}
            />
        </Space>

    )
}
export default Pagerules
