import React from 'react';
import Head from 'next/head';

import {useRouter} from 'next/router'

import Next from '../../components/next';
import DashboardLayout from './layout';


function DashBoard() {
    const router = useRouter()
    const user = router.query.user as string
  return (
    <React.Fragment>
      <Head>
        <title>DashBoard</title>
      </Head>

      <DashboardLayout user={user}>
            <Next user = {user}></Next>
      </DashboardLayout>
    </React.Fragment>
  );
}

export default DashBoard;