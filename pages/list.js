import React,{ useState, useEffect } from 'react'
import { Row, Col, List, Breadcrumb } from "antd";
import { CalendarOutlined, FileOutlined } from '@ant-design/icons'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import marked from 'marked'
import hiLight from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import changeTime from '../components/changeTime'

const MyList = (list) => {

  const [myList, setMyList] = useState(list.data)
  useEffect(() => {
    setMyList(list.data)
   })

   const renderer = new marked.Renderer();

   marked.setOptions({
     renderer: renderer, 
     gfm: true,            //启动类似Github样式的Markdown
     pedantic: false,      //只解析符合Markdown定义的，不修正Markdown的错误
     sanitize: false,      //原始输出，忽略HTML标签--开发人员必填false
     tables: true,         // 支持Github形式的表格，前提必须打开gfm选项
     breaks: false,        // 支持Github换行符，必须打开gfm选项      
     smartLists: true,     //优化列表输出
     smartypants: false,   //
     highlight: function (code) {
             return hiLight.highlightAuto(code).value; //高亮显示规则
     }
   }); 
  return (
    <div>
      <Head>
        <title>MyList</title>
      </Head>
      <Header/>  {/* 头部 */}
     
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
           {/*Breadcrumb 面包屑导航，显示当前页面在系统层级结构中的位置，并能向上返回 */}
          <div className="bread-div">
            <Breadcrumb>  
              <Breadcrumb.Item><a href ='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>文章</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List 
            itemLayout="vertical"          //实现竖排列表样
            dataSource={myList}            //列表数据源
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed', query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined /> {changeTime(item.addTime)} </span>
                  <span><FileOutlined /> {item.typeName} </span>
                </div>
                <div className="list-context"
                     dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                </div>  
              </List.Item>
            )}
          />
        </Col>
        {/* 右侧在小屏幕不显示 */}
        <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author /> {/* 博主个人信息 */}
        </Col>
        <Footer /> {/* 底部 */}
      </Row>
    </div>
  )
}


MyList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res)=>{
        resolve(res.data)  //远程获取数据结果
      }
    ).catch((err)=>{
      console.log(err);
    })
  })
  return await promise
}


export default MyList