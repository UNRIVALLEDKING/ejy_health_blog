import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';

export default function CustomTooltip({ toolTipMessage, children }) {
  return (
    <Tooltip TransitionComponent={Zoom} arrow title={toolTipMessage}>
      {children}
    </Tooltip>
  );
}
