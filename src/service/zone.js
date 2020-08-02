
import requests from '@utils/requests'

/**
 * 获取域名列表
 */
export const getZonesApi = () => {
    return requests.get('/zone_list')
}

/**
 * 添加域名
 * @param {string} zone_name 
 */
export const zoneCreate = (zone_name) => {
    return requests.post('/do_zone_create', {
        'zone_name': zone_name,
    })
}
/**
 * 删除域名
 * @param {string} zone_id 
 */
export const zoneDelete = (zone_id) => {
    return requests.del('/do_zone_delete', {
        'zone_id': zone_id,
    })
}


/**
 * 获取目标域名的dns记录
 * @param {string} zone_id 
 */
export const getZoneDnsrecordsApi = (zone_id) => {
    return requests.get('/get_dns_records', {
        'zone_id': zone_id
    })
}
/**
 * 获取目标域名目标dns记录的详细信息
 * @param {string} zone_id 
 * @param {string} dns_record_id 
 */
export const getDnsRecordInfoApi = (zone_id, dns_record_id) => {
    return requests.get('/get_dns_record_info', {
        'zone_id': zone_id,
        'dns_record_id': dns_record_id,
    })
}
/**
 * 更新目标域名的目标dns记录
 * @param {string} zone_id 
 * @param {string} dns_record_id 
 * @param {object} body 
 */
export const dnsRecordUpdate = (zone_id, dns_record_id, body) => {
    return requests.put('/do_dns_record_update', {
        'name': body.name,
        'type': body.type,
        'content': body.content,
        'proxied': body.proxied,
        'ttl': body.ttl,
    }, {
        'zone_id': zone_id,
        'dns_record_id': dns_record_id,
    })
}

/**
 * 删除目标域名的目标dns记录
 * @param {string} zone_id 
 * @param {string} dns_record_id 
 */
export const dnsRecordDelete = (zone_id, dns_record_id) => {
    return requests.del('/do_dns_record_delete', {
        'zone_id': zone_id,
        'dns_record_id': dns_record_id,
    })
}
/**
 * 添加dns记录至目标域名
 * @param {string} zone_id 
 * @param {object} body 
 */
export const dnsRecordCreate = (zone_id, body) => {
    return requests.post('/do_dns_record_create', {
        'name': body.name,
        'type': body.type,
        'content': body.content,
        'proxied': body.proxied,
        'ttl': body.ttl,
    }, {
        'zone_id': zone_id,
    })
}
/**
 * 获取域名全部设置
 * @param {string} zone_id 
 */
export const getAllZoneSettings = (zone_id) => {
    return requests.get('/get_all_zone_settings', {
        'zone_id': zone_id
    })
}
/**
 * 更新域名设置
 * @param {string} zone_id 
 * @param {string} type 
 * @param {object} body 
 */
export const changeZoneSetting = (zone_id, type, body) => {
    return requests.patch('/do_zone_setting_update', {
        'value': body
    }, {
        'zone_id': zone_id,
        'type': type,
    })
}
/**
 * 清理缓存
 * @param {string} zone_id 
 * @param {object} body 
 */
export const doCachePurge = (zone_id, body) => {
    return requests.post('/do_cache_purge', {
        'purge_everything': body.purge_everything || false,
        'files': body.files || [],
    }, {
        'zone_id': zone_id,
    })
}

/**
 * 获取域名全部页面规则
 * @param {string} zone_id 
 */
export const getZonePagerules = (zone_id) => {
    return requests.get('/get_zone_pagerules', {
        'zone_id': zone_id
    })
}

/**
 * 删除域名页面规则
 * @param {string} zone_id 
 * @param {string} pagerule_id 
 */
export const doZonePageruleDelete = (zone_id, pagerule_id) => {
    return requests.del('/do_zone_pagerule_delete', {
        'zone_id': zone_id,
        'pagerule_id': pagerule_id,
    })
}

/**
 * 获取域名指定页面规则详细信息
 * @param {string} zone_id 
 * @param {string} pagerule_id 
 */
export const getZonePageruleDetails = (zone_id, pagerule_id) => {
    return requests.get('/get_zone_pagerule_details', {
        'zone_id': zone_id,
        'pagerule_id': pagerule_id,
    })
}

/**
 * 创建页面规则
 * @param {string} zone_id 
 * @param {object} body 
 */
export const doZonePageruleCreate = (zone_id, body) => {
    return requests.post('/do_zone_pagerule_create', {
        'targets': body.targets || [],
        'actions': body.actions || [],
        'priority': body.priority || 1,
        'status': body.status || 'active',
    }, {
        'zone_id': zone_id,
    })
}

/**
 * 更新页面规则
 * @param {string} zone_id 
 * @param {object} body 
 */
export const doZonePageruleUpdate = (zone_id, pagerule_id, body) => {
    return requests.put('/do_zone_pagerule_update', {
        'targets': body.targets || [],
        'actions': body.actions || [],
        'priority': body.priority || 1,
        'status': body.status || 'active',
    }, {
        'zone_id': zone_id,
        'pagerule_id': pagerule_id,
    })
}