import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "antd";

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            userList: []
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
    }

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }];
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>用户列表页</h1>
                <div style={{ width: '50%', margin: '10px auto' }}>
                    <Table dataSource={this.state.userList} columns={columns} rowKey={record => record.name} />
                </div>
            </div>
        )
    }
}

export default UserList;