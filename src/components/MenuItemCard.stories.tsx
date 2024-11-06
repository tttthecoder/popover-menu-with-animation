import { Meta, StoryFn } from "@storybook/react";
import MenuItemCard, { type ProductOption } from "./MenuItemCard";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/theme";

export default {
  title: "Components/MenuItemCard",
  component: MenuItemCard,
  argTypes: {
    description: { control: "text" },
    tag: { control: "text" },
    label: { control: "text" },
    price: { control: "text" },
  },
} as Meta;

const Template: StoryFn<ProductOption> = (args) => (
  <ThemeProvider theme={theme}>
    <MenuItemCard {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  id: "1",
  label: "Option A",
  price: 19.99,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  id: "2",
  label: "Option B",
  price: 29.99,
  description:
    "This is a high-quality product that is very popular among customers.",
};

export const WithBatchSales = Template.bind({});
WithBatchSales.args = {
  id: "3",
  label: "Option C",
  price: 9.99,
  batchSales: {
    quantity: 3,
    batchPrice: 25.99,
  },
};

export const WithDescriptionAndBatchSales = Template.bind({});
WithDescriptionAndBatchSales.args = {
  id: "4",
  label: "Option D",
  price: 39.99,
  description: "Limited edition product with premium materials.",
  batchSales: {
    quantity: 5,
    batchPrice: 150.0,
  },
};
