import React from 'react'
import { Skeleton, Card } from 'antd'


const DiyCard = (props) => {

    return (
        <Skeleton loading={props.loading} active>
            <Card
                title={props.title}
                hoverable
                actions={[
                    props.actions
                ]}
            >
                <div style={{ maxWidth: '600px', margin: 'auto' }}>
                    {props.children}
                </div>
            </Card>
        </Skeleton>
    )
}

export default DiyCard
