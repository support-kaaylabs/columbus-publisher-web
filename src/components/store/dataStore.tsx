import React, { createContext, useState } from 'react';

interface MyContextProps {
  name: string;
  readonly text?: string;
  sideBarHandler: (c: string) => void;
}

export const MyContext = createContext<MyContextProps>({
  name: '',
  sideBarHandler: (c) => {
    console.log(c);
  },
});

interface MyComponentProps {
  children: React.ReactNode;
}

export const MyProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [name, setName] = useState<string>('PRODUCT');

  const sideBarHandler = (prop: string) => {
    setName(prop);
  };
  const data = {
    name: name,
    sideBarHandler: sideBarHandler,
    text: '#222222',
  };

  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};
