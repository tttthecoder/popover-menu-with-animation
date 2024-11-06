// ActionMenu.stories.tsx
import { Meta, StoryFn } from "@storybook/react";
import ActionMenu from "./ActionMenu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const theme = createTheme();

export default {
  title: "Components/ActionMenu",
  component: ActionMenu,
  argTypes: {
    productId: { control: "text" },
  },
} as Meta;

const Template: StoryFn<typeof ActionMenu> = (args) => (
  <ThemeProvider theme={theme}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <ActionMenu {...args} />
    </Box>
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  productId: "123",
};
