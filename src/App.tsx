import { ThemeProvider, CssBaseline, Paper } from "@mui/material";
import { theme } from "./theme/theme";
import ActionMenu from "./components/ActionMenu";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "space-between",
          height: "100vh",
          width: "100vw",
        }}
      >
        <ActionMenu productId={"1"} />
        <ActionMenu productId={"2"} />
        <ActionMenu productId={"3"} />
        <ActionMenu productId={"5"} />
        <ActionMenu productId={"6"} />
        <ActionMenu productId={"7"} />
        <ActionMenu productId={"8"} />
        <ActionMenu productId={"9"} />
        <ActionMenu productId={"10"} />
        <ActionMenu productId={"11"} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
