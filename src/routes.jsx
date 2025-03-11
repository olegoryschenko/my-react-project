import { ChatPage } from "./commponents/chatPage";
import { Login } from "./commponents/Login";
import { LOGIN_ROUTE } from "./utils/consts";
import { CHAT_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        id: 1,
        path: LOGIN_ROUTE,
        component: <Login/>,
    }
]

export const privateRoutes = [
    {
        id: 2,
        path: CHAT_ROUTE,
        component: <ChatPage/>,
    }
]