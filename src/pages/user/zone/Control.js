import React, { useState, useEffect, useCallback } from 'react'
import { Tabs, message, Spin } from 'antd';

import Context from '@utils/context'

import Mybreadcrumb from '@components/Mybreadcrumb';
import { getAllZoneSettings, changeZoneSetting } from '@service/zone'

import Overview from '@components/zone/Overview'
import SslTls from '@components/zone/SslTls'
import Firewall from '@components/zone/Firewall'
import Cache from '@components/zone/Cache'
import Pagerules from '@components/zone/Pagerules'
import Network from '@components/zone/Network'
import ScrapeShield from '@components/zone/ScrapeShield'

import FormattedMessage from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

const { TabPane } = Tabs;

const breadcrumb = [
    {
        title: 'Zones',
        link: '/user/zones'
    },
    {
        title: 'Control'
    }
]

const Control = (props) => {
    const components = [
        {
            'title': <FormattedMessage id='Overview'
                defaultMessage='Overview'
                description='概览'
            />,

            'key': 'Overview',
            'content': <Overview />
        },
        {
            'title': <FormattedMessage id='SSL-TLS'
                defaultMessage='SSL-TLS'
                description='SSL-TLS'
            />,
            'key': 'SslTls',
            'content': <SslTls />
        },
        {
            'title': <FormattedMessage id='Firewall'
                defaultMessage='Firewall'
                description='防火墙'
            />,
            'key': 'firewall',
            'content': <Firewall />
        },
        {
            'title': <FormattedMessage id='Cache'
                defaultMessage='Cache'
                description='缓存'
            />,
            'key': 'Cache',
            'content': <Cache />
        },
        {
            'title': <FormattedMessage id='Page Rules'
                defaultMessage='Page Rules'
                description='页面规则'
            />,
            'key': 'Pagerules',
            'content': <Pagerules />
        },
        {
            'title': <FormattedMessage id='Network'
                defaultMessage='Network'
                description='网络'
            />,
            'key': 'Network',
            'content': <Network />
        },
        {
            'title': <FormattedMessage id='Scrape Shield'
                defaultMessage='Scrape Shield'
                description='内容保护'
            />,
            'key': 'ScrapeShield',
            'content': <ScrapeShield />
        },
    ]

    const [zone_settings, setZone_settings] = useState({})
    const [loading, setloading] = useState(true)

    const zone_id = props.match.params.zone_id;


    useEffect(() => {
        getAllZoneSettings(zone_id)
            .then((res) => {
                if (res.code === 200) {
                    let tmp = {}
                    res.data.map((v) => {
                        return tmp[v.id] = v
                    })
                    setZone_settings(tmp)
                    setloading(false)

                } else {
                    message.error(res.msg)
                }
            })
    }, [zone_id])


    const exchangeStatus = useCallback(
        (id) => {
            return async () => {
                let value = (zone_settings[id].value === 'on') ? 'off' : 'on';
                await changeZoneSetting(zone_id, id, value)
                    .then((res) => {
                        if (res.code === 200) {
                            message.success(ImperativeFormatMessage('Switch successfully'))
                            zone_settings[id].value = value
                            setZone_settings(Object.assign({}, zone_settings))
                        } else {
                            message.info(res.msg)
                        }
                    })
            }
        },
        [zone_settings, zone_id],
    )
    const contextValue = {
        'zone_id': zone_id,
        'zone_settings': zone_settings,
        exchangeStatus,
        loading
    }
    console.log(loading);
    return (
        <Context.Provider value={contextValue}>
            <Spin tip="Loading..." spinning={loading} delay={100}>

                <Mybreadcrumb path={breadcrumb} />
                <Tabs defaultActiveKey="Overview" centered>
                    {components.map((v) => {
                        return <TabPane tab={v.title} key={v.key}>
                            <div style={{ paddingBottom: '2rem' }}>
                                {v.content}
                            </div>
                        </TabPane>
                    })}
                </Tabs>
            </Spin>

        </Context.Provider>
    );
};
export default Control;
