// 个人信息组件
import '../static/style/components/author.css'
import {Avatar, Divider} from 'antd'



const Author = () => {


    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="../static/images/head.jpg"  /></div>
            <div className="author-introduction">
               保安
                <Divider>随便聊聊</Divider>  {/* Divider是分割线组件 */}
                <Avatar size={30} src="../static/images/github.png" className="account" />
                <Avatar size={30} src="../static/images/qq.png" className="account" />
                <Avatar size={30} src="../static/images/wechat.png" className="account" />

                
            </div>
        </div>

    )
}
export default Author