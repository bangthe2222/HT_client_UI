import React from 'react';
import Head from 'next/head';
import DashboardLayout from './layout';
import { useRouter } from 'next/router';

function DashBoard() {
  const router = useRouter()
  const user = router.query.user as string

  return (
    <React.Fragment>
      <Head>
        <title>DashBoard</title>
      </Head>

      <DashboardLayout user={user}>
        <></>
      </DashboardLayout>
    </React.Fragment>
  );
}

export default DashBoard;
