import React, { Component } from 'react';
import axios from 'axios';
import { Table, Input, Form, Button } from "antd";
import ExifOrientationImg from 'react-exif-orientation-img'

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            articleData: {}
        }
    }

    componentDidMount() {
        // 获取用户列表
        axios.get('api/v1/article/query')
            .then(res => {
                console.log(res);
                this.setState({list: res.data.data});
            })
            .catch(err => {
                console.log(err);
            })

        // 获取用户列表
        axios.get('api/v1/article/1')
            .then(res => {
                console.log(res.data.data);
                this.setState({articleData: res.data.data})
            })
            .catch(err => {
                console.log(err);
            })
        // 判断浏览器是否支持websocket
        let createWebsocket = (function () {
            return function (urlValue) {
                if(window.WebSocket) return new WebSocket(urlValue);
                return false;
            }
        })();
         // 实例化websocket  websocket有两种协议 ws:不加密 wss: 加密
        let webSocket = createWebsocket("ws://localhost:3008/");

        webSocket.onopen = function(evt){
            console.log("开始连接...", webSocket.readyState)
            if(webSocket.readyState === 1){
                console.log("连接成功...");
                webSocket.send("第一条数据");

            }
            // 一旦连接成功 就发送第一条数据
        }
        webSocket.onmessage = function (evt) {
            // 这是服务端返回的数据
            console.log("服务端说"+evt.data);
        }
        // 关闭连接
        // webSocket.onclose = function(evt){
        //     console.log("connection closed");
        // }

        setInterval(() => {
            webSocket.onopen("dinghuamin");
        }, 2000)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                axios.post('api/v1/chatLine', {
                    content: values.content
                }).then(res => {
                    console.log(res);
                })
            }
        })
    }

    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        },{
            title: '归类',
            dataIndex: 'category',
            key: 'category',
        }];
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>用户列表页</h1>
                <div style={{ width: '50%', margin: '10px auto' }}>
                    <Table dataSource={this.state.list} columns={columns} rowKey={record => record.id} />
                </div>
                <div style={{textAlign: 'center'}}>
                    {this.state.articleData.content}
                    {this.state.articleData.title}
                    {this.state.articleData.author}
                </div>
                {/*<ExifOrientationImg src={require("../../src/assets/image/1.jpg")} />*/}
                {/*<ExifOrientationImg src={require("../../src/assets/image/2.jpg")} width={200} />*/}
                {/*<img src={require("../../src/assets/image/2.jpg")} width={200} />*/}
                {/*<ExifOrientationImg src={require("../../src/assets/image/4.jpg")} width={200} />*/}
                {/*<img src={require("../../src/assets/image/4.jpg")} width={200} />*/}
                {/*<ExifOrientationImg src={require("../../src/assets/image/5.jpg")} width={200} />*/}
                {/*<img src={require("../../src/assets/image/5.jpg")} width={200} />*/}
                {/*<ExifOrientationImg src={require("../../src/assets/image/6.jpg")} width={200} />*/}
                {/*<img src={require("../../src/assets/image/6.jpg")} width={200} />*/}
                <ExifOrientationImg src={require("../../src/assets/image/7.jpg")} width={200} />
                {/*<img src={require("../../src/assets/image/7.jpg")} width={200} />*/}
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input placeholder="请聊天"/>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">发送</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(UserList);