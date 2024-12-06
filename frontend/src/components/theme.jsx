import { createTheme } from "@mui/material/styles";

export const demoTheme = createTheme({
  palette: {
    primary: {
      main: "#424874",
    },
    secondary: {
      main: "#7986CB",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#424874",
          color: "#FFFFFF",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#6068a5",
          color: "#FFFFFF",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#424874",
            color: "white",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});
