import React from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-3">
        <Link to="/">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
      </div>
    </nav>
  );
};

export default LeftSidebar;
