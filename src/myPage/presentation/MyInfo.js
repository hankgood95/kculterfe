import React, { useState } from 'react';
import BasicInfoPage from './myInfo/BasicInfoPage';
import PwdInfoPage from './myInfo/PwdInfoPage';
import MyPageNavbar from './common/MyPageNavbar';

function MyInfo() {
  const [viewInfo, setSecurity] = useState(true)

  return(
      <div id='my-body'>
          <MyPageNavbar setLikeList={setSecurity} firstPageName="Info" secondPageName="Security"/>
          { viewInfo ? <BasicInfoPage/> : <PwdInfoPage/> }
      </div>
  )
}

export default MyInfo;