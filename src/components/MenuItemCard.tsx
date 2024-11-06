import React from "react";
import { Typography, Box, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export interface ProductOption {
  id: string;
  label: string;
  price: number;
  description?: string;
  batchSales?: {
    quantity: number;
    batchPrice: number;
  };
}

const ProductOptionCard: React.FC<ProductOption> = ({
  id,
  label,
  price,
  description,
  batchSales,
}) => {
  const handleAddItem = (id: string) => {};

  return (
    <Box key={id} sx={{ px: 3, py: { xs: 2, md: 2.5 }, boxShadow: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box
          onClick={() => handleAddItem(id)}
          sx={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AddShoppingCartIcon sx={{ width: 16, height: 16 }} />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {label}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "bold", pl: 1 }}>
          &#8364;{price.toFixed(2)}
        </Typography>
      </Box>
      {description && (
        <Tooltip arrow title={description}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {description}
          </Typography>
        </Tooltip>
      )}
      {batchSales && (
        <Typography
          variant="caption"
          sx={{
            mt: 2,
            fontWeight: "bold",
            display: "inline-block",
            backgroundColor: "grey.300",
            p: 1,
            lineHeight: 1,
            borderRadius: 2,
          }}
        >
          {`${batchSales.quantity} x ${label} for `} &#8364;
          {batchSales.batchPrice.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
};

export default ProductOptionCard;
