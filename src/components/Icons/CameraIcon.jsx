import React from 'react';
import {SvgIcon} from '@material-ui/core';

function CameraIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M17.8132 0.981101C17.6973 0.9145 17.554 0.911899 17.4357 0.974455L13.3057 3.16145V1.84923C13.3046 0.828395 12.4516 0.00115577 11.399 0H1.90678C0.854178 0.00115577 0.00119174 0.828395 0 1.84923V9.15077C0.00119174 10.1716 0.854178 10.9988 1.90678 11H11.399C12.4516 10.9988 13.3046 10.1716 13.3057 9.15077V7.86239L17.4359 10.0494C17.554 10.1119 17.6974 10.1095 17.8132 10.0429C17.9291 9.97614 18 9.85521 18 9.72476V1.29908C18 1.16848 17.9289 1.0477 17.8132 0.981101ZM12.5427 9.15092C12.5421 9.76348 12.0303 10.2597 11.3987 10.2605H1.90678C1.27516 10.2597 0.763457 9.76348 0.762712 9.15092V1.84923C0.763457 1.23681 1.27516 0.740412 1.90678 0.73969H11.399C12.0304 0.740412 12.5423 1.23681 12.543 1.84923L12.5427 9.15092ZM17.2373 9.10151L13.3057 7.01969V4.00415L17.2373 1.92247V9.10151Z" fill="#121212"/>
      </SvgIcon>
    );
}

export default CameraIcon;