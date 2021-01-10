import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [active, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) =>
    setActiveItem(...active, setActiveItem(name));

  const menubar = user ? (
    <div>
      <Menu pointing secondary>
        <Menu.Item name={user.username} as={Link} to="/" />
        <Menu.Menu position="right">
          <Menu.Item name="Logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name="home"
          active={active === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="Login"
            active={active === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="Register"
            active={active === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

  return menubar;
}

export default MenuBar;
