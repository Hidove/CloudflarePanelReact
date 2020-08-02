
import moment from 'moment'
import { getCurrentLanguage } from '@/Lang'


moment.locale(getCurrentLanguage().toLowerCase());

const getLocalUnit = (v) => {

    const units = {
        'en-US': {
            'year': 'year',
            'month': 'month',
            'week': 'week',
            'day': 'day',
            'hour': 'hour',
            'minute': 'minute',
            'second': 'second',
            'millisecond': 'millisecond',
        },
        'zh-CN': {
            'year': '年',
            'month': '月',
            'week': '周',
            'day': '天',
            'hour': '小时',
            'minute': '分钟',
            'second': '秒',
            'millisecond': '毫秒',
        },
        'zh-HK': {
            'year': '年',
            'month': '月',
            'week': '周',
            'day': '天',
            'hour': '小時',
            'minute': '分鐘',
            'second': '秒',
            'millisecond': '毫秒',
        },
        'zh-TW': {
            'year': '年',
            'month': '月',
            'week': '周',
            'day': '天',
            'hour': '小時',
            'minute': '分鐘',
            'second': '秒',
            'millisecond': '毫秒',
        },
        'ja-JP': {
            'year': '年',
            'month': '月',
            'week': '週間',
            'day': '日',
            'hour': '時間',
            'minute': '分',
            'second': '二番目',
            'millisecond': 'ミリ秒',
        },
        'ko-KR': {
            'year': '년',
            'month': '달',
            'week': '주',
            'day': '일',
            'hour': '시',
            'minute': '분',
            'second': '둘째',
            'millisecond': '밀리 초',
        },
    }
    return units[getCurrentLanguage()][v] || 'Unknown'
}


//秒数转 年月日时分秒数
export const secondTransform = (v) => {
    let unit = 'second'
    switch (true) {
        // 秒数
        case v < 60:
            unit = 's'
            break;
        // 分钟数
        case v < 3600:
            unit = 'm'
            break;
        // 小时数
        case v < 86400:
            unit = 'h'
            break;
        // 天数
        case v < 604800:
            unit = 'd'
            break;
        // 周数
        case v < 2592000:
            unit = 'w'
            break;

        // 月数
        case v < 31536000:
            unit = 'M'
            break;
        default:
            // 年数
            unit = 'y'
            break;
    }
    const time = Math.round(moment.duration(v, 's').as(unit)) + ' ' + getLocalUnit(moment.normalizeUnits(unit))
    return time
}