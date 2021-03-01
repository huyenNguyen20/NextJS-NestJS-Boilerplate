import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import authApi from "./api/authApi";
import userApi from "./api/userApi";

export default function withAuth(
  BaseComponent,
  { loginRequired = true, logoutRequired = false } = {}
) {

  class App extends React.Component {
    // Using getInitialProps() insteads of getStaticProps() or getServerSideProps() 
    // because this is High Order Component for both Static and Server Side Generation
    static async getInitialProps(ctx) {
      let props = {};
      let user = null;
      const compProps = {};
      let resp;

      // If withAuth HOC is called on the browser => ctx.req = undefined
      if (authApi.isAuthenticated()){
        resp = await userApi.fetchProfile();
      }

      // If withAuth HOC is called on the browser => ctx.req is availale
      if ( ctx.req && ctx.req.headers.cookie && ctx.req.headers.cookie.split("=")[1]){
        resp = await userApi.fetchProfile(
          ctx.req.headers.cookie.split("=")[1]
        );
      }

      if (resp && resp.success) {
        user = resp.response.user;
      }

      if (BaseComponent.getInitialProps) {
        Object.assign(
          compProps,
          (await BaseComponent.getInitialProps(ctx)) || {}
        );
      }
      props = { ...compProps, user };
      console.log("Props in withAuth", props);
      return props;
    }

    componentDidMount() {
      const { user } = this.props;
      console.log("user", user);
      if (loginRequired && !logoutRequired && !user) {
        Router.push("/public/login", "/login");
        return;
      }

      if (logoutRequired && user) {
        Router.push("/");
      }
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      return (
        <>
          <BaseComponent {...this.props} />
        </>
      );
    }
  }

  const propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      isAdmin: PropTypes.bool,
    })
  };

  const defaultProps = {
    user: null,
  };

  App.propTypes = propTypes;
  App.defaultProps = defaultProps;

  return App;
}
