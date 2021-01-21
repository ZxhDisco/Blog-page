import React,{ useEffect, useState} from 'react'
import  '../static/style/components/header.css'
import {Row, Col, Menu} from 'antd'
import {createFromIconfontCN } from '@ant-design/icons'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath   from '../config/apiUrl'

const Header = () => {

    const IconFont = createFromIconfontCN({
        scriptUrl: [
           ' //at.alicdn.com/t/font_2229618_bfyhsw8p18u.js'
        ]
    })
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                res => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    },[])

    //跳转到列表页
    const handleClick = (e) => {
        if(e.key == 0) {
            Router.push('/')
        }else {
            Router.push('/list?id='+e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">Zhuo De Blog</span>
                </Col>
        
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu  mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <IconFont type="icon-shouye3" /> 
                                首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        <IconFont type={item.icon} /> 
                                            {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                        
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header