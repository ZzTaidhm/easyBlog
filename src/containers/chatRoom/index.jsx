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
            ]
        }
        this.socket = null;
        this.preProtocol = "ws://localhost:3008";
    }

    componentDidMount() {
        // socket.io
        const socket = io(`${this.preProtocol}/chatLine`);
        this.socket = socket;
        // 接收消息
        // socket.on方法的回调放在click里面 就会导致了反复注册该事件 形成叠加，
        // 导致自己的接收不断重复，其实回调是个单独体，遇到重复了
        // 把socket.on方法放在click包含体之外就可以了
        this.socket.on("receiveMsg", data => {
            this.setState(prevState => ({
                chatData: prevState.chatData.concat(data)
            }))
        });
    }

    send1 = (e) => {
        this.handleSubmit1(e);
    }

    send2 = (e) => {
        this.handleSubmit2(e);
    }

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!values.content1) return false;
            if(!err){
                this.socket.emit('chatMsg', {roleName: "Peppa", content: values.content1});
                this.props.form.resetFields("content1");
            }
        })
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!values.content2) return false;
            if(!err){
                this.socket.emit('chatMsg', {roleName: "George", content: values.content2});
                this.props.form.resetFields("content2");
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{margin: "100px"}}>
                {/*<h1 style={{ textAlign: 'center' }}>聊天室</h1>*/}
                <Row gutter={40}>
                    <Col span={7}>
                        <h2 style={{textAlign: 'center'}}>我是佩奇</h2>
                        <Form onSubmit={this.handleSubmit1}>
                            <Form.Item>
                                {getFieldDecorator('content1', {
                                })(
                                    <TextArea rows={4} placeholder="请聊天"/>,
                                )}
                            </Form.Item>
                            <Button type="primary" onClick={(e) => this.send1(e)}>发送</Button>
                        </Form>
                    </Col>
                    <Col span={10}>
                        <List
                            style={{height: 500, overflow: 'auto'}}
                            header="消息窗口"
                            itemLayout="horizontal"
                            bordered={true}
                            dataSource={this.state.chatData}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.roleName === "George" ? require("../../../src/assets/image/jio.jpg") : require("../../../src/assets/image/pei.jpeg")} />}
                                        title={<p style={{color: item.roleName === "George" ? 'green' : 'pink'}}>{item.roleName}</p>}
                                        description={
                                            <p style={{color: item.roleName === "George" ? 'green' : 'pink'}}>{item.content}</p>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={7}>
                        <h2 style={{textAlign: 'center'}}>我是乔治</h2>
                        <Form onSubmit={this.handleSubmit2}>
                            <Form.Item>
                                {getFieldDecorator('content2', {
                                })(
                                    <TextArea rows={4} placeholder="请聊天"/>,
                                )}
                            </Form.Item>
                            <Button type="primary" onClick={(e) => this.send2(e)}>发送</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(ChatRoom);