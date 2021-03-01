import React from "react";
import Admin from "../components/Admin/Main";
import withAuth from "../lib/withAuth";
import Head from "next/head";

function AdminDashboard () {
    return (
        <>
        <Head>
          <title> Admin Dashboard</title>
          <meta name="description" content="Admin Dashboard" />
        </Head>
        <Admin/>
        </>
    )
}

export default withAuth(AdminDashboard);