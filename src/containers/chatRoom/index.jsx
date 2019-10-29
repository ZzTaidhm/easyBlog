import React, { Component } from 'react';
import axios from 'axios';
import { Input, Form, Button, Row, Col, List, Avatar } from "antd";
import io from 'socket.io-client';
import './index.scss';
const { TextArea } = Input;

class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatData: [
                {
                    roleName: 'George',
                    msg: '你好，我是乔治',
                },
                {
                    roleName: 'Peppa',
                    msg: '你好，我是佩奇',
                },
            ]
        }
    }

    componentDidMount() {
        // socket.io
        const socket = io('ws://localhost:3008/');
        socket.on('receiveMsg', data => {
            console.log('服务端消息：',  data);
        })

        socket.emit('send', 'hello dinghuamin');

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
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{marginTop: 100}}>
                {/*<h1 style={{ textAlign: 'center' }}>聊天室</h1>*/}
                <Row gutter={40}>
                    <Col span={7}>
                        <h2 style={{textAlign: 'center'}}>我是佩奇</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea rows={4} placeholder="请聊天"/>,
                                )}
                            </Form.Item>
                            <Form.Item style={{textAlign: 'right'}}>
                                <Button type="primary" htmlType="submit">发送</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={10}>
                        <List
                            header="消息窗口"
                            itemLayout="horizontal"
                            bordered={true}
                            dataSource={this.state.chatData}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.roleName === "George" ? require("../../../src/assets/image/jio.jpg") : require("../../../src/assets/image/pei.jpeg")} />}
                                        title={<h5 style={{color: item.roleName === "George" ? 'green' : 'pink'}}>{item.roleName}</h5>}
                                        description={
                                            <p style={{color: item.roleName === "George" ? 'green' : 'pink'}}>{item.msg}</p>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={7}>
                        <h2 style={{textAlign: 'center'}}>我是乔治</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <TextArea rows={4} placeholder="请聊天"/>,
                                )}
                            </Form.Item>
                            <Form.Item style={{textAlign: 'right'}}>
                                <Button type="primary" htmlType="submit">发送</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(ChatRoom);