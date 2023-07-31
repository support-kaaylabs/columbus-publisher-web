export const modules = [
  {
    key: '/Dashboard',
    to: '/Dashboard',
    type: 'dashboard',
    Module_Name: 'Dashboard',
    name: 'Dashboard',
    sequence: 1,
  },
  {
    key: '/Benchmarking',
    to: '/Benchmarking',
    type: 'benchmarking',
    Module_Name: 'Benchmarking',
    name: 'Benchmarking',
    sequence: 2,
  },
  {
    key: '/Selections',
    to: '/Selections',
    type: 'selections',
    Module_Name: 'Selections',
    name: 'Selections',
    sequence: 3,
    submenu: [
      {
        key: '/Management',
        to: '/Management',
        Module_Name: 'Management',
        name: 'Management',
        sequence: 1,
      },
      {
        key: '/Matrics',
        to: '/Matrics',
        Module_Name: 'Matrics',
        name: 'Matrics',
        sequence: 2,
      },
      {
        key: '/Analysis',
        to: '/Analysis',
        Module_Name: 'Analysis',
        name: 'Analysis',
        sequence: 3,
      },
    ],
  },
  {
    key: '/Shoutout',
    to: '/Shoutout',
    type: 'shoutout',
    Module_Name: 'Shoutout',
    name: 'Shoutout',
    sequence: 4,
  },
  {
    key: '/Knowledge Hub',
    to: '/Knowledge Hub',
    type: 'knowledge Hub',
    Module_Name: 'Knowledge Hub',
    name: 'Knowledge Hub',
    sequence: 5,
  },
  {
    key: '/Settings',
    to: '/Settings',
    type: 'settings',
    Module_Name: 'Settings',
    name: 'Settings',
    sequence: 6,
    submenu:[
      {
        key: '/Profile',
        to: '/Profile',
        Module_Name: 'Profile',
        name: 'Roles',
        sequence: 1,
      },
      {
        key: '/Subscription',
        to: '/Subscription',
        Module_Name: 'Subscription',
        name: 'Subscription',
        sequence: 2,
      },
    ]
  },
  
  {
    key: '/Support',
    to: '/Support',
    type: 'support',
    Module_Name: 'Support',
    name: 'Support',
    sequence: 7,
  },
];
