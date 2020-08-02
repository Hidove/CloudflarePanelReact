
import React, { useState, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl';

import antd_zh_CN from 'antd/es/locale/zh_CN';
import antd_zh_HK from 'antd/es/locale/zh_HK';
import antd_zh_TW from 'antd/es/locale/zh_TW';
import antd_en_US from 'antd/es/locale/en_US';
import antd_ja_JP from 'antd/es/locale/ja_JP';
import antd_ko_KR from 'antd/es/locale/ko_KR';

import zh_CN from '@/lang/zh_CN'
import zh_HK from '@/lang/zh_HK'
import zh_TW from '@/lang/zh_TW'
import en_US from '@/lang/en_US'
import ja_JP from '@/lang/ja_JP'
import ko_KR from '@/lang/ko_KR'


export const langs = {
    'zh-CN': {
        'local': zh_CN,
        'antd': antd_zh_CN,
    },
    'zh-HK': {
        'local': zh_HK,
        'antd': antd_zh_HK,
    },
    'zh-TW': {
        'local': zh_TW,
        'antd': antd_zh_TW,
    },
    'en-US': {
        'local': en_US,
        'antd': antd_en_US,
    },
    'ja-JP': {
        'local': ja_JP,
        'antd': antd_ja_JP,
    },
    'ko-KR': {
        'local': ko_KR,
        'antd': antd_ko_KR,
    },
}
export const getCurrentLanguage = () => {
    const currentLanguage = localStorage.getItem('language')
    if (currentLanguage) {
        return currentLanguage
    }

    return navigator.language
}

export const setCurrentLanguage = (language) => {
    localStorage.setItem('language', language)
}

export const chooseLocale = (currentLanguage = getCurrentLanguage()) => {
    for (let k in langs) {
        if (currentLanguage === k) {
            return langs[k]['local']
        }
    }
    return en_US;
}

export const chooseAntdLocale = (currentLanguage = getCurrentLanguage()) => {
    for (let k in langs) {
        if (currentLanguage === k) {
            return langs[k]['antd']
        }
    }
    return antd_en_US;
}

export const LangContext = React.createContext();

const Lang = (props) => {
    const [language, setLanguage] = useState(getCurrentLanguage())
    // 本地语言包
    const [locale, setLocale] = useState(chooseLocale(language))
    // antd 语言包
    const [antdLocale, setAntdLocale] = useState(chooseAntdLocale(language))

    useEffect(() => {
        setCurrentLanguage(language)
        setLocale(chooseLocale(language))
        setAntdLocale(chooseAntdLocale(language))
    }, [language])

    return (
        <LangContext.Provider value={{
            currentLanguage: language, setCurrentLanguage: setLanguage
        }}>
            <ConfigProvider locale={antdLocale}>
                <IntlProvider
                    locale={language}
                    messages={locale}
                >
                    {props.children}
                </IntlProvider>
            </ConfigProvider>
        </LangContext.Provider>
    )
}

export default Lang
