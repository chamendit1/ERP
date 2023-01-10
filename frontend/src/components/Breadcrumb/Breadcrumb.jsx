import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@mui/material";

import Home from "@mui/icons-material/Home";
import '../../css/breadcrumb.css'
const Breadcrumb = props => {
  const {
    navigate,
    location: { pathname }
  } = props;
  const pathnames = pathname.split("/").filter(x => x);
  const isLast = pathnames.length - 1;
  // console.log(isLast)
  return (
    <>
    <MUIBreadcrumbs aria-label="breadcrumb"> 
      {pathnames.length > 0 ? (
        <Link 
          onClick={() => navigate("/")} 
          style={{textDecoration: 'none'}} 
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Home className='home' fontSize='12px'/>
        </Link>
      ) : (
        <Home className='home' fontSize='12px'/>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography className="text-last" variant="body2" key={name}>{name}</Typography>
        ) : (
          <Link key={name} onClick={() => navigate(routeTo)} to={'/'} style={{textDecoration: 'none'}} >
            <Typography className="text" variant="body2">{name}</Typography>
          </Link>
        );
      })}
    </MUIBreadcrumbs>
    <Typography variant="subtitle2" sx={{fontWeight:'bold'}}>{pathnames[isLast]}</Typography>
    </>
  );
};

export default Breadcrumb;
