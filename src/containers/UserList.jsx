import React, { Component } from 'react';
import axios from 'axios';
import { Table, Input, Form, Button } from "antd";
import ExifOrientationImg from 'react-exif-orientation-img'
import io from 'socket.io-client';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            articleData: {}
        }
    }

    componentDidMount() {
        // socket.io
        const socket = io('ws://localhost:3008/');
        socket.on('receiveMsg', data => {
            console.log('服务端消息：',  data);
        })

        socket.emit('send', 'hello dinghuamin');

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
                {/*<h1 style={{ textAlign: 'center' }}>用户列表页</h1>*/}
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
                {/*<ExifOrientationImg src={require("../../src/assets/image/7.jpg")} width={200} />*/}
                {/*<img src={require("../../src/assets/image/7.jpg")} width={200} />*/}
            </div>
        )
    }
}

export default Form.create()(UserList);