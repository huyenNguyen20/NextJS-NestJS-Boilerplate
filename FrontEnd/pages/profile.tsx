import React from "react";
import Head from "next/head";
import UserProfile from "../components/User/Main";
import withAuth from "../lib/withAuth";

function Profile () {
    return (
        <>
            <Head>
                <title> My Account </title>
                <meta name="description" content="User Profile" />
            </Head>
            <UserProfile />
        </>
    );
}

export default withAuth(Profile);
