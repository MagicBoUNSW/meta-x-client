import React from 'react';
import {SvgIcon} from '@material-ui/core';

function MessagesIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 27 30">
        <svg width="27" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.2687 18.4725C23.2687 19.1046 23.0352 19.7109 22.6196 20.1579C22.204 20.6049 21.6403 20.856 21.0526 20.856H7.75632L3.32422 25.6231V6.55475C3.32422 5.92259 3.55769 5.31633 3.97328 4.86933C4.38887 4.42233 4.95254 4.1712 5.54027 4.1712H21.0526C21.6403 4.1712 22.204 4.42233 22.6196 4.86933C23.0352 5.31633 23.2687 5.92259 23.2687 6.55475V18.4725Z" stroke="#8D91A0" stroke-width="2.21605" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </SvgIcon>
    );
}

export default MessagesIcon;