import React, { createContext, useState } from 'react';

interface MyContextProps {
  name: string;
  sideBarHandler: (c: string) => void;
}

export const MyContext = createContext<MyContextProps>({
  name: '',
  sideBarHandler: (c: string) => {
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
  };

  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};
