import React from 'react'
import Head from 'next/head'
import {Row, Col , Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, FileOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hiLight from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import changeTime from '../components/changeTime'
import servicePath from '../config/apiUrl'



const Detailed = (props) => {

  const tocify = new Tocify()
  const renderer = new marked.Renderer();

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix">
                <h${level}>
                  ${text}
                </h${level}>
            </a>\n`;
  }

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

    let html = marked(props.article_content) 
  
  
  return (
    <div>
    <Head>
      <title>详细内容</title>
    </Head>
    <Header/>
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        <div>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item >{props.typeName}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
{/* <a href=""></a> */}
          <div>
            <div className="detailed-title">
              react实战视频教程
            </div>

            <div className="list-icon center">
              <span><CalendarOutlined />{changeTime(props.addTime)}</span>
              <span><FileOutlined />{props.typeName}</span>
            </div>
            {/* 文章详细内容 */}
            <div className="detailed-content"
              dangerouslySetInnerHTML={{__html:html}}
            > 
              
            </div>
          </div>
        </div>
      </Col>

      {/* 右侧在小屏幕不显示 */}
      <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        {/*固定， 距离顶部的高度 */}
        <Affix offsetTop={10}>    
          <div className="detailed-nav comm-box">
            <div className="nav-title">文章目录</div>
              <div className='toc-list'>
                {tocify && tocify.render()}
              </div>
          </div>
        </Affix>
      </Col>
    </Row>

    <Footer/>
    </div>
  )
}

Detailed.getInitialProps = async(context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then(
      res => {
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}


export default Detailed