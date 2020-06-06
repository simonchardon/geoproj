import React from "react";
import {Link} from "react-router-dom";

//the header of the all app

const Header = () => {
    return(
      <div className="header">
          <Link to={"/"}><h1>Position Tracker Api</h1></Link>
      </div>
    );
}

export default Header;