import React, { useState, useCallback, useContext } from 'react'
import { Radio, Tooltip, Space, message, Select, Button } from 'antd';
import Img from '@components/Img'
import Img_SSLTLS from '@/assets/images/ssl-tls.jpg'
import SwitchCard from '@components/SwitchCard'
import DiyCard from '@components/DiyCard'
import Context from '@utils/context';
import { changeZoneSetting } from '@service/zone';
import Hsts from '@components/zone/SslTls/Hsts'

import FormattedMessage from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

const { Option } = Select;

function SslTls() {

    const { zone_settings, zone_id, exchangeStatus, loading } = useContext(Context)


    const [visible, setvisible] = useState(false)

    const changeSSL = useCallback(
        (e) => {
            changeZoneSetting(zone_id, 'ssl', e.target.value)
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
    const handleMinTlsVersionChange = (e) => {
        changeZoneSetting(zone_id, 'min_tls_version', e)
            .then((res) => {
                if (res.code === 200) {
                    message.success(ImperativeFormatMessage('Switch successfully'))
                } else {
                    message.info(ImperativeFormatMessage('Switching failed', { msg: res.msg }))
                }
            })
    }

    const actions = [
        {
            'title': <FormattedMessage id='Always use HTTPS' />,
            'setting': 'always_use_https',
            'handOnClick': exchangeStatus('always_use_https'),
            'content': <FormattedMessage id='Redirect all requests using the "http" scheme to "https". This will apply to all http requests in the area.' />,
        },
        {
            'title': <FormattedMessage id='Random encryption' />,
            'setting': 'opportunistic_encryption',
            'handOnClick': exchangeStatus('opportunistic_encryption'),
            'content': <FormattedMessage id='Random encryption allows browsers to know that your site is provided through an encrypted connection, allowing them to benefit from the performance improvements of HTTP/2. The browser will continue to display "http" in the address bar instead of "https".' />,
        },
        {
            'title': <FormattedMessage id='Automatic HTTPS rewrite' />,
            'setting': 'automatic_https_rewrites',
            'handOnClick': exchangeStatus('automatic_https_rewrites'),
            'content': <FormattedMessage id='Automatic HTTPS rewriting helps correct mixed content by changing "http" to "https" for all resources or links on websites that can be served by HTTPS.' />,
        },
    ]
    return (
        <Space direction="vertical"
            style={{ width: '100%' }}>
            <DiyCard loading={loading} title={<FormattedMessage id='Your SSL/TLS encryption mode is {mode}' values={{ mode: zone_settings.ssl.value }} />}
                setting={zone_settings.min_tls_version}
                actions={
                    <Radio.Group defaultValue={zone_settings.ssl.value} onChange={changeSSL} key='ssl'>
                        <Tooltip title={<FormattedMessage id='No encryption applied' />} color='cyan'>
                            <Radio.Button value="off"><FormattedMessage id='Close (unsafe)' /></Radio.Button>
                        </Tooltip>
                        <Tooltip title={<FormattedMessage id='Encrypt the traffic between the browser and Cloudflare' />} color='cyan'>
                            <Radio.Button value="flexible"><FormattedMessage id='Flexible' /></Radio.Button>
                        </Tooltip>
                        <Tooltip title={<FormattedMessage id='End-to-end encryption, using self-signed certificate on the server' />} color='cyan'>
                            <Radio.Button value="full"><FormattedMessage id='Full' /></Radio.Button>
                        </Tooltip>
                        <Tooltip title={<FormattedMessage id='End-to-end encryption, but a trusted CA certificate or Cloudflare Origin CA certificate is required on the server' />} color='cyan'>
                            <Radio.Button value="strict"><FormattedMessage id='Complete (strict)' /></Radio.Button>
                        </Tooltip>

                    </Radio.Group>
                }
            ><Img src={Img_SSLTLS} />
                <div style={{ padding: '1em 0' }}>
                    <strong><FormattedMessage id='This setting was last changed' />&nbsp;{zone_settings.ssl.modified_on}</strong>
                </div>
            </DiyCard>

            <DiyCard loading={loading} title={<FormattedMessage id='Minimum TLS version' />}
                setting={zone_settings.min_tls_version}
                actions={[
                    <Select key='min_tls_version' defaultValue={zone_settings.min_tls_version.value} style={{ width: '20rem', maxWidth: '80%' }} onChange={handleMinTlsVersionChange}>
                        <Option value="1.0">1.0</Option>
                        <Option value="1.1">1.1</Option>
                        <Option value="1.2">1.2</Option>
                        <Option value="1.3">1.3</Option>
                    </Select>
                ]}
            >
                <FormattedMessage id='Only allow HTTPS connections from visitors who support the selected TLS protocol version or higher.' />
            </DiyCard>

            <DiyCard loading={loading} title={<FormattedMessage id='HTTP Strict Transport Security (HSTS)' />}
                setting={zone_settings.security_header}
                actions={[

                    <Tooltip title={<FormattedMessage id='Click to switch' />} color='cyan' key='security_header'>
                        <Button onClick={() => setvisible(true)}>{
                            (() => {
                                if (zone_settings.security_header.enabled === true) {

                                    return <FormattedMessage id='Turn off HTTP Strict Transport Security (HSTS)' />
                                } else {

                                    return <FormattedMessage id='Enable HTTP Strict Transport Security (HSTS)' />
                                }
                            })()
                        }
                        </Button>
                    </Tooltip>,
                    <Hsts key='Hsts' visibleState={[visible, setvisible]} zone_id={zone_id} modalHSTS={zone_settings.security_header.value.strict_transport_security} />

                ]}
            >
                <FormattedMessage id='Enforce web security policies on your website.' />
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
    )
}

export default SslTls
