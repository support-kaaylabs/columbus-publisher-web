import dashboardIcon from '../assets/dashboard.png';
import benchmark from '../assets/benchbright.png';
import selectionsdim from '../assets/selectionsbright.png';
import shoutoutdim from '../assets/shoutoutbright.png';
import knowledge from '../assets/knowledgeBright.png';
import settingsdim from '../assets/settingsbright.png';
import supportdim from '../assets/supportbright.png';

export const modules = [
  {
    key: '/dashboard',
    to: '/dashboard',
    type: 'dashboard',
    Module_Name: 'Dashboard',
    name: 'Dashboard',
    sequence: 1,
    icon:dashboardIcon,
  },
  {
    key: '/benchmarking',
    to: '/benchmarking',
    type: 'benchmarking',
    Module_Name: 'Benchmarking',
    name: 'Benchmarking',
    sequence: 2,
    icon:benchmark,
  },
  {
    key: '/Selections',
    to: '/selections',
    type: 'selections',
    Module_Name: 'Selections',
    name: 'Selections',
    sequence: 3,
    icon:selectionsdim,
    darkIcon: benchmark,
    submenu: [
      {
        key: '/management',
        to: '/management',
        Module_Name: 'Management',
        name: 'Management',
        sequence: 1,
      },
      {
        key: '/metrics',
        to: '/metrics',
        Module_Name: 'Metrics',
        name: 'Metrics',
        sequence: 2,
      },
      {
        key: '/analysis',
        to: '/analysis',
        Module_Name: 'Analysis',
        name: 'Analysis',
        sequence: 3,
      },
    ],
  },
  {
    key: '/shoutout',
    to: '/shoutout',
    type: 'shoutout',
    Module_Name: 'Shoutout',
    name: 'Shoutout',
    sequence: 4,
    icon:shoutoutdim,
    darkIcon: benchmark,
  },
  {
    key: '/knowledgehub',
    to: '/knowledgeHub',
    type: 'knowledge_Hub',
    Module_Name: 'Knowledge Hub',
    name: 'Knowledge Hub',
    sequence: 5,
    icon:knowledge,
  },
  {
    key: '/settings',
    to: '/settings',
    type: 'settings',
    Module_Name: 'Settings',
    name: 'Settings',
    sequence: 6,
    icon:settingsdim,
    darkIcon: benchmark,
    submenu:[
      {
        key: '/profile',
        to: '/profile',
        type: 'profile',
        Module_Name: 'Profile',
        name: 'Profile',
        sequence: 1,
      },
      {
        key: '/subscription',
        to: '/subscription',
        Module_Name: 'Subscription',
        name: 'Subscription',
        sequence: 2,
      },
    ]
  },
  
  {
    key: '/support',
    to: '/support',
    type: 'support',
    Module_Name: 'Support',
    name: 'Support',
    sequence: 7,
    icon:supportdim,
  },
];
