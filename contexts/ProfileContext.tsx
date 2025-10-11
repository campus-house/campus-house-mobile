import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
  name: string;
  intro: string;
  updateProfile: (name: string, intro: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState('방미오');
  const [intro, setIntro] = useState('이번에 이사온 미오라고해요!! ^~^');

  const updateProfile = (newName: string, newIntro: string) => {
    setName(newName);
    setIntro(newIntro);
  };

  return (
    <ProfileContext.Provider value={{ name, intro, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

