import React, { useState, useContext, useCallback } from 'react'
import { Radio, Tooltip, Modal, Space, Select, message, Button, Input, Alert, Popconfirm } from 'antd';
import SwitchCard from '@components/SwitchCard'
import DiyCard from '@components/DiyCard'

import Context from '@utils/context';

import { secondTransform } from '@utils/time'
import { changeZoneSetting, doCachePurge } from '@service/zone'


import FormattedMessage  from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

const { Option } = Select
const { TextArea } = Input

function Cache() {

    const { zone_settings, zone_id, exchangeStatus, loading } = useContext(Context)

    const [visible, setvisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState('')

    const changeCacheLevel = useCallback(
        (e) => {
            changeZoneSetting(zone_id, 'cache_level', e.target.value)
                .then((res) => {
                    if (res.code === 200) {
                        message.success(ImperativeFormatMessage('Switch successfully'))
                    } else {
                        message.info(ImperativeFormatMessage('Switching failed',{ msg: res.msg }))
						
                    }
                })
        },
        [zone_id],
    )

    const purgeEverything = useCallback(
        () => {
            const data = {
                'purge_everything': true,
            }
            doCachePurge(zone_id, data)
                .then((res) => {
                    if (res.code === 200) {
                        message.success(ImperativeFormatMessage('Switch successfully'))
                    } else {
                        message.info(ImperativeFormatMessage("Switching failed",{ msg: res.msg }))
                    }
                })
        },
        [zone_id],
    )
    const purgeFilesByUrl = useCallback(() => {
        setConfirmLoading(true)
        setModalText(modalText.trim())
        if (modalText.length === 0) {
            message.warning(ImperativeFormatMessage('URL must not be empty'))
            return
        }
        const data = {
            'files': modalText.split('\n')
        }
        doCachePurge(zone_id, data)
            .then((res) => {
                if (res.code === 200) {
                    message.success(ImperativeFormatMessage('Switch successfully'))
                } else {
                    message.info(ImperativeFormatMessage('Switching failed',{ msg: res.msg }))
                }
            }).finally(() => {
                setConfirmLoading(false)
            })
    },
        [zone_id, modalText],
    )
    const changeBrowserCacheTtl = useCallback(
        (e) => {
            console.log(e);
            changeZoneSetting(zone_id, 'browser_cache_ttl', e)
                .then((res) => {
                    if (res.code === 200) {
                        message.success(ImperativeFormatMessage('Switch successfully'))
                    } else {
                        message.info(ImperativeFormatMessage('Switching failed',{ msg: res.msg }))
                    }
                })
        },
        [zone_id],
    )

    const actions = [
        {
            'title': 'Always Online™',
            'setting': 'always_online',
            'handOnClick': exchangeStatus('always_online'),
            'content': <FormattedMessage id='If your server is shut down, Cloudflare will use our cache to serve the static pages of your website.' />

        },
        {
            'title': <FormattedMessage id='Development Mode™' />,
            'setting': 'development_mode',
            'handOnClick': exchangeStatus('development_mode'),
            'content':
                // 'content': <FormattedMessage id='Temporarily bypass our cache to see the changes made to your origin server in real time. <br />Note: Enabling this feature can significantly speed up the loading speed of the origin server. The development mode does not clear the cache, so you need to clear the files after the development mode expires.' />

                <FormattedMessage id="Temporarily bypass our cache to see the changes made to your origin server in real time. <br />Note: Enabling this feature can significantly speed up the loading speed of the origin server. The development mode does not clear the cache, so you need to clear the files after the development mode expires.">
                    {txt => <h1 dangerouslySetInnerHTML={{
                        __html: txt
                    }
                    }></h1>
                    }
                </FormattedMessage >
        },
    ]

    const divCards = [

        {
            'title': <FormattedMessage id='Clear cache' />,
            'setting': 'purge_cache',
            'actions': [
                <Tooltip title={<FormattedMessage id='Custom clear' />} color='cyan' key='purge_files_by_url'>
                    <Button onClick={() => setvisible(true)}><FormattedMessage id='Custom clear' /></Button>
                </Tooltip>,
                <Tooltip title={<FormattedMessage id='Clear all caches, use with caution' />} color='cyan' key='purge_everything'>
                    <Popconfirm
                        title={<FormattedMessage id='Are you sure you want to clear all caches' />}
                        onConfirm={purgeEverything}
                        okText={<FormattedMessage id='Yes' />}
                        cancelText={<FormattedMessage id='Cancel' />}
                    >
                        <Button><FormattedMessage id='Clean up all' /></Button>
                    </Popconfirm>
                </Tooltip>,
                <Modal
                    title={<FormattedMessage id='Custom clear' />}
                    visible={visible}
                    onOk={purgeFilesByUrl}
                    confirmLoading={confirmLoading}
                    onCancel={() => setvisible(false)}
                    key='modal'
                >
                    <Alert
                        message={<FormattedMessage id='You will need to specify the full path of the file.' />}
                        description={<div>
                            <FormattedMessage id='Assss' />
                            <FormattedMessage id='Assss' />
                            <FormattedMessage id='Assss' />
                            <p>
                                <FormattedMessage id='Currently, wildcards are not supported when clearing a single URL. You can clear up to 30 URLs at once. Separate URLs one per line.' />
                            </p>
                            <strong>
                                <FormattedMessage id='Example' />
                            </strong>
                            <ul>
                                <li>https://www.v8cdn.xyz</li>
                                <li>https://www.v8cdn.xyz/cat.jpg</li>
                            </ul>
                        </div>}
                        type="info"
                        closable
                    />
                    <br />
                    <TextArea rows={4} value={modalText} onChange={(e) => {
                        setModalText(e.target.value)
                    }} />
                </Modal>
            ],
            'content': <FormattedMessage id='Clear the cache files to force Cloudflare to extract the latest versions of these files from your web server. You can erase files selectively, or you can erase all files at the same time. <br /><strong>Note:</strong> Clearing the cache may temporarily degrade the performance of your website and increase the time it takes to load files on your origin server.' />
        },
        {
            'title': <FormattedMessage id='Cache level' />,
            'setting': 'cache_level',
            'actions':
                [
                    <Radio.Group defaultValue={zone_settings.cache_level.value} key='cache_level' onChange={changeCacheLevel}>
                        <Tooltip title={
                            <FormattedMessage id='No query string' />
                        } color='cyan'>
                            <Radio.Button value="basic">
                                <FormattedMessage id='No query string' />
                            </Radio.Button>
                        </Tooltip>
                        <Tooltip title={
                            <FormattedMessage id='Ignore query string' />
                        } color='cyan'>
                            <Radio.Button value="simplified">
                                <FormattedMessage id='Ignore query string' />
                            </Radio.Button>
                        </Tooltip>
                        <Tooltip title={
                            <FormattedMessage id='Standard' />

                        } color='cyan'>
                            <Radio.Button value="aggressive">
                                <FormattedMessage id='Standard' />
                            </Radio.Button>
                        </Tooltip>
                    </Radio.Group>
                ],
            'content': <FormattedMessage id='Determine the amount of static content you want Cloudflare to cache your website. Increasing the cache can shorten the page load time.' />
        },
        {
            'title': <FormattedMessage id='Browser cache TTL' />,

            'setting': 'browser_cache_ttl',
            'actions':
                [
                    <Select
                        defaultValue={zone_settings.browser_cache_ttl.value}
                        style={{ width: '20rem', maxWidth: '80%' }} key='browser_cache_ttl'
                        onChange={changeBrowserCacheTtl}
                    >

                        {
                            [0, 30, 60, 300, 1200, 1800, 3600, 7200, 10800, 14400, 18000, 28800, 43200, 57600, 72000, 86400, 172800, 259200, 345600, 432000, 691200, 1382400, 2073600, 2678400, 5356800, 16070400, 31536000]
                                .map((v) => {
                                    if (v === 0) {
                                        return (
                                            <Option value={v} key={v}>
                                                <FormattedMessage id='Follow existing headers' />
                                            </Option>
                                        )
                                    }
                                    return (
                                        <Option value={v} key={v}>{secondTransform(v)}</Option>
                                    )

                                })
                        }
                    </Select >
                ],
            'content':
                <FormattedMessage id='Determine how long Cloudflare instructs visitors’ browsers to cache files. During this period, the browser will load files from its local cache, thereby improving page loading speed.' />
        },

    ]

    return (
        <Space direction="vertical"
            style={{ width: '100%' }}>
            {
                divCards.map((v, index) => {
                    return (
                        <DiyCard
                            loading={loading} title={v.title}
                            setting={zone_settings[v.setting]}
                            key={v.setting}
                            actions={v.actions}
                        >
                            {v.content}
                        </DiyCard>
                    )
                })
            }
            {
                actions.map((v, index) => {
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
        </Space >
    )
}

export default Cache
