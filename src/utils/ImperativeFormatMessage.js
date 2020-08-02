
import { createIntl } from 'react-intl'

import { chooseLocale, getCurrentLanguage } from '@/Lang'

const ImperativeFormatMessage = (id, values = {}) => {
    const intl = createIntl({
        locale: getCurrentLanguage(),
        messages: chooseLocale()
    })
    return intl.formatMessage({ id, values })
}

export default ImperativeFormatMessage