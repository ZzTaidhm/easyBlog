import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "antd";
import ExifOrientationImg from 'react-exif-orientation-img'

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            userList: [],
            articleData: {}
        }
    }

    componentDidMount() {
        // 获取用户列表
        axios.get('api/user/list')
            .then(res => {
                console.log(res);
                this.setState({userList: res.data});
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

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '密码',
            dataIndex: 'sexy',
            key: 'password',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },{
            title: '联系方式',
            dataIndex: 'tel_phone',
            key: 'tel_phone',
        }];
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>用户列表页</h1>
                <div style={{ width: '50%', margin: '10px auto' }}>
                    <Table dataSource={this.state.userList} columns={columns} rowKey={record => record.name} />
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
            </div>
        )
    }
}

export default UserList;