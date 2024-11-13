import { cloneElement } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  useScrollTrigger,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomizedButton = styled(Button)`
  color: lime;
`;

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
        <AppBar>
          <Toolbar>
            <Typography variant="h4">وب سایت شخصی</Typography>
            <CustomizedButton variant="dashed" color="secondary">
              کلیک کن
            </CustomizedButton>
            <Button variant="contained">کلیک دیوم</Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Header;
