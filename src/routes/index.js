import UserList from '../containers/UserList';
import ChatRoom from '../containers/chatRoom';

export default [
    {
        path: '/user',
        component: UserList
    },
    {
        path: '/',
        component: ChatRoom
    },
]
