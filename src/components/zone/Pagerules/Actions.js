
import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { DeleteFilled } from '@ant-design/icons'
import { Space, Switch, Button, message, Popconfirm, notification } from 'antd'
import { doZonePageruleUpdate, doZonePageruleDelete } from '@service/zone'

import FormattedMessage from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

function Actions(props) {
    const [loading, setLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const changeStatus = (v) => {
        setLoading(true)
        let pageRules = JSON.parse(JSON.stringify(props.pageRules.pageRules))
        pageRules[props.index].status = (v === true ? 'active' : 'disabled')
        doZonePageruleUpdate(props.zone_id, pageRules[props.index].id, pageRules[props.index])
            .then((res) => {
                if (res.code === 200) {
                    props.pageRules.setPageRules(pageRules)
                    message.success(ImperativeFormatMessage('Switch successfully'))
                } else {
                    message.info(ImperativeFormatMessage('Switching failed', { msg: res.msg }))
                }
            })
            .finally(() => setLoading(false))

    }
    const deleteRecord = (v) => {
        setBtnLoading(true)
        let pageRules = [...props.pageRules.pageRules]
        doZonePageruleDelete(props.zone_id, pageRules[props.index].id)
            .then((res) => {
                if (res.code === 200) {
                    pageRules.splice(props.index, 1)
                    props.pageRules.setPageRules(pageRules)
                    message.success(ImperativeFormatMessage('Successfully deleted'))
                } else {
                    message.info(res.msg)
                }
            })
            .finally(() => setBtnLoading(false))

    }
    return (
        <Space>
            <Switch loading={loading} checked={props.record.status === 'active'} onChange={changeStatus} />
            {/* <Link to={'/user/zone/control/' + props.zone_id + '/pagerule/' + props.record.id}>
                <Button type='dashed'><FormattedMessage id='Manage' /></Button>
            </Link> */}
            <Button type='dashed' onClick={
                () => {
                    notification.open({
                        message: '尚未开发',
                        description:
                            '没写',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }
            }><FormattedMessage id='Manage' /></Button>

            <Popconfirm
                title={<FormattedMessage id='You sure you want to delete it' />}
                onConfirm={deleteRecord}
                okText={<FormattedMessage id='Yes' />}
                cancelText={<FormattedMessage id='Cancel' />}
            >
                <Button loading={btnLoading} type='dashed' shape="circle" icon={<DeleteFilled />} danger></Button>
            </Popconfirm>
        </Space>
    )
}

export default Actions
