import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';

const Mybreadcrumb = (props) => {
    let items = props.path;
    return (
        <Breadcrumb style={{ marginBottom: '2em' }}>
            <Breadcrumb.Item key='home'>
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {
                items.map((item, k) => {
                    if (item.link !== undefined && item.link !== '') {
                        return <Breadcrumb.Item key={k}>
                            <Link to={item.link}>{item.title}</Link>
                        </Breadcrumb.Item>
                    }
                    return <Breadcrumb.Item key={k}>
                        {item.title}
                    </Breadcrumb.Item>
                })
            }
        </Breadcrumb>
    )
}

export default Mybreadcrumb
