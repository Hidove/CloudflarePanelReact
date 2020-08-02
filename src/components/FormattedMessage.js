import React from 'react'
import { FormattedMessage as Formatted } from 'react-intl'


const FormattedMessage = (props) => {
    return (
        <Formatted id={props.id} values={props.values}>
            {txt => <span dangerouslySetInnerHTML={{
                __html: txt
            }
            }></span>
            }
        </Formatted >
    )
}

export default FormattedMessage



