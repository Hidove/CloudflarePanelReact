import React, { useContext, useCallback } from 'react'
import { Space, Select, message } from 'antd'
import SwitchCard from '@components/SwitchCard'
import Context from '@utils/context';
import DiyCard from '@components/DiyCard'

import { changeZoneSetting } from '@service/zone'

import FormattedMessage from '@components/FormattedMessage';
import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'
const { Option } = Select

function Overview() {


    const { zone_settings, zone_id, exchangeStatus, loading } = useContext(Context)


    const changeSecurityLevel = useCallback(
        (e) => {
            changeZoneSetting(zone_id, 'security_level', e)
                .then((res) => {
                    if (res.code === 200) {
                        message.success(ImperativeFormatMessage('Switch successfully'))
                    } else {
                        message.info(ImperativeFormatMessage('Switching failed', { msg: res.msg }))
                    }
                })
        },
        [zone_id],
    )

    const actions = [
        {
            'title': <FormattedMessage id='Development model' />,
            'setting': 'development_mode',
            'handOnClick': exchangeStatus('development_mode'),
            'content': <FormattedMessage id='Temporarily bypass our cache. View changes made to your source server in real time.' />
        },
    ]
    return (
        <div>
            <h3><FormattedMessage id='Quick operation' /></h3>
            <Space direction="vertical"
                style={{ width: '100%' }}>

                <DiyCard loading={loading} title={<FormattedMessage id='Under Attack Mode' />}
                    setting={zone_settings.security_level}
                    actions={[
                        <Select key='security_level'
                            defaultValue={() => {
                                return zone_settings.security_level.value
                            }}
                            style={{ width: '20rem', maxWidth: '80%' }} onChange={changeSecurityLevel}>
                            <Option value="off"><FormattedMessage id='Close (Enterprise)' /></Option>
                            <Option value="essentially_off"><FormattedMessage id='Basic (essentially off)' /></Option>
                            <Option value="low"><FormattedMessage id='low' /></Option>
                            <Option value="medium"><FormattedMessage id='medium' /></Option>
                            <Option value="high"><FormattedMessage id='high' /></Option>
                            <Option value="under_attack"><FormattedMessage id='under_attack' /></Option>
                        </Select>
                    ]}
                >
                    <FormattedMessage id='Display JavaScript challenges when visitors visit your site.' />
                </DiyCard>
                {
                    actions.map((v) => {
                        return (
                            <SwitchCard loading={loading} title={v.title}
                                setting={zone_settings[v.setting]}
                                handOnClick={v.handOnClick}
                                key={v.setting}
                            >
                                {v.content}
                            </SwitchCard>
                        )
                    })
                }
            </Space>
        </div>
    )
}

export default Overview
