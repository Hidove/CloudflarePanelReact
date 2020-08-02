import React, { useState, useEffect } from 'react'
import { Select, Modal, Alert, Row, Col, Switch, message } from 'antd';

import { secondTransform } from '@utils/time'

import { changeZoneSetting } from '@service/zone';

import FormattedMessage from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

const { Option } = Select;

function Hsts(props) {

    const [[visible, setvisible], zone_id] = [props.visibleState, props.zone_id]
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalHSTS, setModalHSTS] = useState(props.modalHSTS)
    useEffect(() => {
        setvisible(visible)
    }, [visible, setvisible])
    const securityHeaderOnChange = (key, value) => {
        modalHSTS[key] = value
        setModalHSTS(Object.assign({}, modalHSTS))
    }
    const changeSecurityHeader = () => {
        setConfirmLoading(true)
        changeZoneSetting(zone_id, 'security_header', {
            'strict_transport_security': modalHSTS
        }).then((res) => {
            if (res.code === 200) {
                message.success(ImperativeFormatMessage('Switch successfully'))
            } else {
                message.info(ImperativeFormatMessage('Switching failed', { msg: res.msg }))
            }
        }).finally(() => {
            setConfirmLoading(false)
            setvisible(false)
        })
    }
    const HSTSActions = [
        {
            content: (
                <div>
                    <strong><FormattedMessage id='Enable HSTS (Strict-Transport-Security)' /></strong>
                    <p><FormattedMessage id='Provide HSTS headers for all HTTPS requests' /></p>
                </div>
            ),
            action: (
                <Switch checked={modalHSTS.enabled}
                    onChange={(e) => securityHeaderOnChange('enabled', e)} />
            )
        },
        {
            content: (
                <div>
                    <strong><FormattedMessage id='Maximum age header (max-age)' /></strong>
                    <p><FormattedMessage id='Specify the duration of HSTS header caching in the browser' /></p>
                </div>
            ),
            action: (
                <Select defaultValue={modalHSTS.max_age} style={{ width: '100%' }}>
                    {
                        [...Array(13)].map((v, k) => {
                            return 2592000 * k
                        }).map((v) => {
                            if (v === 0) {
                                return (<Option value={v} key={v}><FormattedMessage id='0 (disabled)' /></Option>)
                            }
                            return (
                                <Option value={v} key={v}>{secondTransform(v)}</Option>
                            )
                        })
                    }
                </Select>
            )
        },
        {
            content: (
                <div>

                    <strong><FormattedMessage id='Apply HSTS policy to subdomains (includeSubDomains)' /></strong>

                    <p>
                        <FormattedMessage id='Every domain under this domain will inherit the same HSTS header' />
                        <br />
                        <strong><FormattedMessage id='Warning' /></strong>
                        <FormattedMessage id='If any of your subdomains do not support HTTPS, these subdomains will become inaccessible.' />
                    </p>
                </div>
            ),
            action: (

                <Switch checked={modalHSTS.include_subdomains}
                    onChange={(e) => securityHeaderOnChange('include_subdomains', e)} />
            )
        },
        {
            content: (
                <div>
                    <strong>
                        <FormattedMessage id='Preloading' />
                    </strong>
                    <p>
                        <FormattedMessage id='Allow browser to automatically preload HSTS configuration' />
                        <br />
                        <strong><FormattedMessage id='Warning' /></strong>
                        <FormattedMessage id='Preloading may make websites that do not support HTTPS completely inaccessible.' />
                    </p>
                </div>
            ),
            action: (

                <Switch checked={modalHSTS.preload}
                    onChange={(e) => securityHeaderOnChange('preload', e)} />
            )
        },
        {
            content: (
                <div>
                    <strong>
                        <FormattedMessage id='Sniffless header' />
                    </strong>
                    <p>
                        <FormattedMessage id='Send the "X-Content-Type-Options: nosniff" header to prevent Internet Explorer and Google Chrome from sniffing around in the declared Content-Type via MIME.' />
                    </p>
                </div>
            ),
            action: (

                <Switch checked={modalHSTS.nosniff}
                    onChange={(e) => securityHeaderOnChange('nosniff', e)} />
            )
        },

    ]
    return (
        <div>

            <Modal
                title={<FormattedMessage id='HTTP Strict Transport Security (HSTS)' />}
                visible={visible}
                onOk={changeSecurityHeader}
                confirmLoading={confirmLoading}
                onCancel={() => setvisible(false)}
                key='modal'
            >
                <Alert
                    message={<FormattedMessage id='You will need to specify the full path of the file.' />}
                    description={
                        <FormattedMessage id='<p>HTTP Strict Transport Security (HSTS) can greatly improve the security of a website. However, when enabling HSTS, keep the following important considerations in mind:</p><strong>HTTPS (SSL) must be enabled to use HSTS. </strong><ul><li> If you turn on HSTS, but your website does not support HTTPS, the browser will not accept HSTS settings. </li><li>If you enable HSTS but leave Cloudflare, you need to continue to support HTTPS through a new service provider, otherwise, visitors will not be able to access your site until you support HTTPS. </li><li>If Cloudflare’s HTTPS is turned off after HSTS is enabled and there is no valid SSL certificate on the origin server, visitors will not be able to access your website. </li><li>Note: Cloudflare’s HTTP can be disabled in several ways: masking subdomains in DNS records, "suspending" Cloudflare services, or using a custom SSL certificate that is incorrectly configured on your Cloudflare dashboard (e.g. , Invalid SSL certificate, expired certificate, or mismatched hostname). </li></ul><p>If you need to disable HTTPS on your domain, you must first disable HSTS in your Cloudflare dashboard and wait until the maximum period has passed (to ensure that every browser is aware of this change) Before you can disable HTTPS. The average maximum period is six months (you can set the maximum period in the next step). If you delete HTTPS before disabling HSTS, visitors will not be able to access your site until the maximum period is reached or you support HTTPS again. Since disabling HTTPS on HSTS-enabled websites may cause these consequences, we strongly recommend that you deploy the HTTPS service before enabling this feature</p>' />
                    }
                    type="info"
                    closable
                />
                <br />
                <Alert
                    message={<FormattedMessage id='Warning' />}
                    description={
                        <FormattedMessage id='If not configured correctly, HTTP Strict Transport Security (HSTS) may make your website inaccessible for a long time.' />
                    }
                    type="warning"
                />
                <br />
                {
                    HSTSActions.map((v, index) => {
                        return (
                            <Row key={index}>
                                <Col span={18}>
                                    {v.content}
                                </Col>
                                <Col span={6} style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {v.action}
                                </Col>
                            </Row>
                        )
                    })
                }
            </Modal>
        </div>
    )
}

export default Hsts
