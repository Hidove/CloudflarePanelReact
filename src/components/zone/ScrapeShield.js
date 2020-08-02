import React, { useContext } from 'react'
import { Space } from 'antd'
import SwitchCard from '@components/SwitchCard'

import Context from '@utils/context';

import FormattedMessage  from '@components/FormattedMessage';

function ScrapeShield() {

    const { zone_settings, exchangeStatus, loading } = useContext(Context)


    const actions = [
        {
            'title': <FormattedMessage id='Email address obfuscation technique'/>,
            'setting': 'email_obfuscation',
            'handOnClick': exchangeStatus('email_obfuscation'),
            'content': <FormattedMessage id='Display an obfuscated email address on your website to prevent automated programs and spammers from obtaining it, while for human visitors, no visible changes will be made to the address.'/>,
        },
        {
            'title': <FormattedMessage id='Server side exclusion'/>,
            'setting': 'server_side_exclude',
            'handOnClick': exchangeStatus('server_side_exclude'),
            'content': <FormattedMessage id='Automatically hide specific content to prevent visitors with a bad reputation from viewing'/>,
        },
        {
            'title': <FormattedMessage id='Hotlink protection'/>,
            'setting': 'hotlink_protection',
            'handOnClick': exchangeStatus('hotlink_protection'),
            'content': <FormattedMessage id='Prevent offsite links pointing to your images.'/>,
        },
    ]
    return (
        <Space direction="vertical"
            style={{ width: '100%' }}>

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
    )
}

export default ScrapeShield
