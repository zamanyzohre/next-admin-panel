'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NextProgressBar = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NextProgressBar