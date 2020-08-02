import React, { useContext } from 'react'
import { Space } from 'antd'
import SwitchCard from '@components/SwitchCard'
import Context from '@utils/context';

import FormattedMessage  from '@components/FormattedMessage';

function Network() {

    const { zone_settings, exchangeStatus, loading } = useContext(Context)

    // <FormattedMessage id='aaa'/>
    const actions = [
        {
            'title': 'HTTP/2',
            'setting': 'http2',
            'handOnClick': exchangeStatus('http2'),
            'content': <FormattedMessage id='Speed up your website with HTTP/2'/>
        },
        {
            'title':  <FormattedMessage id='HTTP/3 (using QUIC)'/>,
            'setting': 'http3',
            'handOnClick': exchangeStatus('http3'),
            'content': <FormattedMessage id='Use QUIC to accelerate HTTP requests. QUIC provides higher encryption and performance than TCP and TLS.'/>
        },
        {
            'title':  <FormattedMessage id='0-RTT connection recovery'/>,
            'setting': '0rtt',
            'handOnClick': exchangeStatus('0rtt'),
            'content': <FormattedMessage id='Improve the performance of clients that have previously connected to your website.'/>
        },
        {
            'title': 'WebSocket',
            'setting': 'websockets',
            'handOnClick': exchangeStatus('websockets'),
            'content': <FormattedMessage id='Allow a WebSocket connection with your origin server. <br />Concurrent connection criteria applicable to your plan: low'/>
        },
        {
            'title':  <FormattedMessage id='Onion routing'/>,
            'setting': 'opportunistic_onion',
            'handOnClick': exchangeStatus('opportunistic_onion'),
            'content': <FormattedMessage id="Onion routing allows traffic from legitimate users on the Tor network to be routed through Cloudflare's onion service instead of exit nodes, thereby improving user privacy and achieving more detailed protection."/>
        },
        {
            'title':  <FormattedMessage id='IP geolocation'/>,
            'setting': 'ip_geolocation',
            'handOnClick': exchangeStatus('ip_geolocation'),
            'content': <FormattedMessage id='Contains the country code of the visitor’s location and all requests sent to your website. <br /><strong>Note:</strong> You must retrieve the IP geolocation information from the CF-IPCountry HTTP header.'/>

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

export default Network
