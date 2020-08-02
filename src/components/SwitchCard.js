import React, { useState } from 'react'
import { Skeleton, Card, Button, Tooltip } from 'antd'

import FormattedMessage  from '@components/FormattedMessage';

const SwitchCard = (props) => {
    const tipsTitle = () => {
        if (props.setting !== undefined && props.setting.editable === true)
            return props.setting.value === 'on' ? <FormattedMessage id='Click close' /> : <FormattedMessage id='Click to open' />
        return <FormattedMessage id='No right to operate' />
    }
    const btn = () => {
        if (props.setting !== undefined && props.setting.editable === true) {
            return props.setting.value === 'on' ? 'ACTIVE' : 'DISABLED'
        }
        return <FormattedMessage id='No right to operate' />
    };
    const isActive = () => {
        if (props.setting === undefined || props.setting.editable === false || props.setting.value !== 'on') {
            return {}
        }
        return {
            color: '#52c41a',
            background: '#f6ffed',
            borderColor: '#b7eb8f'
        }
    }
    const [btnStatus, setBtnStatus] = useState(false)

    const handOnClick = () => {
        setBtnStatus(true)
        props.handOnClick()
            .finally(() => setBtnStatus(false))
    }

    return (
        <Skeleton loading={props.loading} active>
            <Card
                title={props.title}
                hoverable
                actions={[
                    <Tooltip title={tipsTitle} color='cyan'>
                        <Button onClick={handOnClick} size='large'
                            loading={btnStatus}
                            style={isActive()}>{btn()}</Button>
                    </Tooltip>
                ]}
            >
                <div style={{ maxWidth: '600px', margin: 'auto' }}>
                    {props.children}
                </div>
            </Card>
        </Skeleton>
    )
}

export default SwitchCard
