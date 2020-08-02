import React, { useState, useCallback } from 'react'

import { Link } from 'react-router-dom'

import { Space, Button, message } from 'antd';

import { zoneDelete } from '@service/zone';

import FormattedMessage  from '@components/FormattedMessage';

function Operation(props) {
    const [btnStatus, setBtnState] = useState(false)
    const [zone_id, [zones, setZones], index] = [props.zone_id, [props.zones.zones, props.zones.setZones], props.index]
    const deleteZone = useCallback(
        () => {
            setBtnState(true)
            zoneDelete(zone_id)
                .then((res) => {
                    setBtnState(false)
                    if (res.code === 200) {
                        zones.splice(index, 1);
                        setZones([...zones])
                        message.success({ content: '删除成功', key: 'loading' });
                    } else {
                        message.error({ content: res.msg, key: 'loading' });
                    }
                })
        },
        [zone_id, zones, setZones, index],
    );

    return (
        < Space size="middle" >
            <Link to={'/user/zone/control/' + zone_id}><Button type="primary"><FormattedMessage id='Manage'/></Button></Link>
            <Link to={'/user/zone/' + zone_id + '/dnsrecord'}><Button><FormattedMessage id='Manage DNS'/></Button></Link>
            <Button type="dashed" loading={btnStatus} onClick={deleteZone} danger><FormattedMessage id='Delete'/></Button>
        </Space >
    )
}

export default Operation
