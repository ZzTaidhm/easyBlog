import React, { Component } from 'react';
import axios from 'axios';
import { Input, Form, Button } from "antd";
import io from 'socket.io-client';

class ChatRoom extends Component {
    constructor(props){
        super(props);
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
            <div>
                <h1 style={{ textAlign: 'center' }}>聊天室</h1>

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

export default Form.create()(ChatRoom);