import Head from 'next/head';
import React from 'react';

const Title: React.FC<{children: React.ReactNode; name?: string}> = ({
  children,
  name,
}) => {
  return (
    <>
      <Head>
        <title>{name || ''}</title>
      </Head>
      {children}
    </>
  );
};

export default Title;
