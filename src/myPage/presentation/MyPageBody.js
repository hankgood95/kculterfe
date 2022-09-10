import React, { useState } from 'react';
import BoxCardList from './myPageCard/BoxCardList';
import MyPageNavbar from './common/MyPageNavbar';

function MyPageBody() {
    const [viewMyMap, setLikeList] = useState(true)
    
    return (
        <div id='my-body'>
            <MyPageNavbar setLikeList={setLikeList} firstPageName="My map" secondPageName="empty"/>
            <BoxCardList/>
        </div>
    )
}

export default MyPageBody;