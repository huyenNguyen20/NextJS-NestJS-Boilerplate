import PropTypes from "prop-types";
import Link from "next/link";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { FilterVintage } from "@material-ui/icons";
import MenuWithAvatar from "./MenuWithAvatar";
import baseUrl from "../../lib/baseUrl";
import { styledToolbar } from "../../lib/styles/styles";

const optionsMenu = [
  {
    text: "Source Code",
    href: "https://github.com/huyenNguyen20",
  },
  {
    text: "My Account",
    href: "/profile"
  },
  {
    text: "Log out",
    href: `/logout`,
  },
 
];

const propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

const defaultProps = {
  user: null,
};

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styledToolbar}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item sm={11} xs={9} style={{ textAlign: "left" }}>
            {user ? null : (
              <Link href="/">
                <Avatar>
                  <FilterVintage />
                </Avatar>
              </Link>
            )}
          </Grid>
          <Grid item sm={1} xs={3} style={{ textAlign: "right" }}>
            {user ? (
              <div style={{ whiteSpace: " nowrap" }}>
                <MenuWithAvatar
                  options={optionsMenu}
                  src={user.avatarUrl}
                  alt={user.displayName}
                  isAdmin={user.isAdmin}
                />
              </div>
            ) : (
              <Link href="/signup">
                <a
                  style={{ margin: "0px 20px 0px auto", whiteSpace: "nowrap" }}
                >
                  Sign Up
                </a>
              </Link>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
