import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import { RiLogoutCircleRLine } from "react-icons/ri";
import { useContext } from "react";
import { authContext } from "../AuthWrapper";

const NavBar = () => {
  const token = useContext(authContext);
  const onLogoutHandler = () => {
    token?.setToken(false);
  };
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#211C6A",
        width: "100vw",
        height: "10vh",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to={"/"}>
        <div
          style={{
            display: "flex",
            color: "white",
            gap: "5%",
          }}
        >
          <FaHome
            color="white"
            size={"6%"}
            style={{
              gap: "5%",
            }}
          />
          home
        </div>
      </Link>

      <div
        style={{
          display: "flex",
          color: "white",
          gap: "5%",
          justifyContent: "end",
        }}
      >
        <RiLogoutCircleRLine
          color="white"
          size={"6%"}
          style={{
            gap: "5%",
          }}
        />
        <button onClick={() => onLogoutHandler()}>logout</button>
      </div>
    </div>
  );
};

export default NavBar;
