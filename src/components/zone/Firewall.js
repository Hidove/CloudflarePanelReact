import React, { useContext } from 'react'
import SwitchCard from '@components/SwitchCard'
import { notification } from 'antd'
import Context from '@utils/context';

function Firewall() {

    const { loading } = useContext(Context)

    return (
        <div>
            <SwitchCard title="防火墙规则" loading={loading} handOnClick={

                () => {
                    return new Promise((resolve, reject) => {
                        notification.open({
                            message: '尚未开发',
                            description:
                                '你在叫我做事？',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        resolve()
                    })
                }
            }>
                <h1>暂时不可用</h1>
                通过基于位置、IP 地址、用户代理和 URI 等筛选请求，来控制传入到您的区域的流量。
                您已使用 0 个活动的防火墙规则（总计 5 个）。
            </SwitchCard>

        </div>
    )
}

export default Firewall
