import React from 'react';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';

const menuData = [
  {
    id: 0,
    icon: <StarIcon />,
    label: 'starred',
    link: '/navbar',
  },
  {
    id: 1,
    icon: <DraftsIcon />,
    label: 'draft',
    link: '/test',
  },
  {
    id: 2,
    icon: <InboxIcon />,
    label: 'inbox',
    link: '/',
    submenu: [
      {
        id: 0,
        icon: <DraftsIcon />,
        label: 'draft',
        link: '/',
      },
    ],
  },
  {
    id: 3,
    icon: <StarIcon />,
    label: 'starred',
    link: '/',
  },
  {
    id: 4,
    icon: <SendIcon />,
    label: 'send',
    link: '/',
  },
];

export default menuData;
