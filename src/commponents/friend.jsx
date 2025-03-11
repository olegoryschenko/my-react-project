import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../main';
import { ProfileMenu } from '../../UI/profileMenu';
import {  collection, query, } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
export const Friends = ({ darkMode, modalFriends, setModalFriends }) => {
    const [profileMenu, setProfileMenu] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { firestore } = useContext(AuthContext);
    const [users, loading] = useCollectionData(
        query(collection(firestore, 'users'))
      );
    const [userNewArray, setUserNewArray] = useState([]);
      
      useEffect(() => {
          if(!loading && users) {
              let userSetName = [
                ...new Set(users.map(a => a.name))
            ];
            setUserNewArray(userSetName)
        }
    }, [users, loading])

    const handleInputSearchValue = (e) => {
        setSearchValue(e.target.value)
    }

    const handleProfileMenu = () => {
        setProfileMenu(!profileMenu);
    }


  
    
    return (
        <div style={{
            borderRight: darkMode ? 'none' : null,
            display: modalFriends ? 'block' : 'none'
        }} className={modalFriends ? "friends animate__animated animate__fadeInLeft" : "friends"}>
            <header style={{
                borderBottom: darkMode ? 'none' : null
            }} className="header">
                    <div className="header__inner">
                        <button className="header__inner-btn" onClick={handleProfileMenu}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.99976 10.6676V8.00098H27.9998V10.6676H3.99976ZM3.99976 17.3343H27.9998V14.6676H3.99976V17.3343ZM3.99976 24.001H27.9998V21.3343H3.99976V24.001Z" fill={darkMode ? "#FFF" : "#080707"}/>
                            </svg>

                        </button>
                        <label
                         style={{
                            outline: darkMode ? '1px solid #272A30' : null,
                            color: darkMode ? '#fff' : null
                        }}
                         className="header__inner-label">
                        {profileMenu ? <ProfileMenu active={'menu active'}/> : null}
                            <svg  className="header__inner-label--img" width="24" height="24" viewBox="0 0 24 24" 
                            fill='none' xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.7549 14.255H14.9649L14.6849 13.985C15.6649 12.845 16.2549 11.365 16.2549 9.755C16.2549 6.165 13.3449 3.255 9.75488 3.255C6.16488 3.255 3.25488 6.165 3.25488 9.755C3.25488 13.345 6.16488 16.255 9.75488 16.255C11.3649 16.255 12.8449 15.665 13.9849 14.685L14.2549 14.965V15.755L19.2549 20.745L20.7449 19.255L15.7549 14.255ZM9.75488 14.255C7.26488 14.255 5.25488 12.245 5.25488 9.755C5.25488 7.26501 7.26488 5.255 9.75488 5.255C12.2449 5.255 14.2549 7.26501 14.2549 9.755C14.2549 12.245 12.2449 14.255 9.75488 14.255Z" fill="#747881"/>
                            </svg>
                            <input 
                              type="text"
                              placeholder="Search"
                              onChange={handleInputSearchValue}
                             />
                        </label>
                        <div onClick={() => setModalFriends(false)} className="modal-close">
                            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24"></rect> <path d="M7 17L16.8995 7.10051" stroke={darkMode ? "#fff" : "#000"}strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 7.00001L16.8995 16.8995" stroke={darkMode ? "#fff" : "#000"} strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </div>
                    </div>
            </header>
            <div className="main">
                <ul className="main__friends-user--lists">
                    <h2 style={{
                        color:  darkMode ? '#fff' : '#000',
                        padding: '10px 10px',
                    }}>Пользователи которые могут писать в чате ({userNewArray.length}):</h2>
                    {!loading ? userNewArray.filter(name => 
                        name.toLowerCase().includes(searchValue.toLowerCase())
                    ).
                    map((users) => (
                        <li 
                         key={users}
                         style={{
                            color: darkMode ? '#fff' : null
                    
                         }}
                         className="main__frineds-user--items">
                            <div className="main__frineds-user--item">
                                    <div className="main__frineds-user--item__inner">
                                        <div 
                                        style={{
                                            background: darkMode ? '#eb88c9' : null,
                                            border: 'none'
                                        }}
                                        className="main__frineds-user--item__inner-img-block">
                                            <span
                                            style={{
                                                color: darkMode ? '#fff' : null,
                                            }}
                                             className="text-avatar">{users.slice(0, 1)}</span>
                                        </div>
                                        <div className="main__frineds-user--item__inner-information">
                                            <div className="main__frineds-user--item__inner-information-info">
                                                <h3 className="main__frineds-user--item__inner-information--name">{users}</h3>

                                            </div>
                                        </div>
                                    </div>
                            </div>    
                        </li>   
                    ))
                    :
                    'Loading...'
                    }
                </ul>
            </div>
        </div>
        
    )
}