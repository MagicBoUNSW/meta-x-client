import React from 'react';
import {SvgIcon} from '@material-ui/core';

function OverviewIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 27 29">
        <svg width="27" height="29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.32422 10.7259L13.2964 2.38354L23.2687 10.7259V23.8354C23.2687 24.4676 23.0352 25.0738 22.6196 25.5208C22.204 25.9678 21.6403 26.219 21.0526 26.219H5.54027C4.95254 26.219 4.38887 25.9678 3.97328 25.5208C3.55769 25.0738 3.32422 24.4676 3.32422 23.8354V10.7259Z" stroke="#8D91A0" stroke-width="2.21605" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9.97217 26.219V14.3013H16.6203V26.219" stroke="#8D91A0" stroke-width="2.21605" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </SvgIcon>
    );
}

export default OverviewIcon;