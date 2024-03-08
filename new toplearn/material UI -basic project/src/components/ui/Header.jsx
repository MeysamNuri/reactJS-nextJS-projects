import { cloneElement } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  useScrollTrigger,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import logo from "../../assets/logo.svg";

const Header = () => {
  function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });

    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  return (
    <>
      <ElevationScroll>
        <AppBar position="static">
          <Toolbar disableGutters>
            <img alt="لوگوی وب سایت" src={logo} style={{ width: "3rem" }} />
            <Typography variant="h4" sx={{ marginLeft: 10, typography: "h3" }}>
              وب سایت شخصی
            </Typography>
            <Button variant="contained">کلیک دیوم</Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Header;
