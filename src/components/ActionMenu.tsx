import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  IconButton,
  Fade,
  keyframes,
  Paper,
  Stack,
  Alert,
  useTheme,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import ReactDOM from "react-dom";
import { useTriggerCbOnEscapeKeyForAnElement } from "../hooks/useTriggerCbOnEscapeKeyForAnElement";
import ProductOptionCard, { type ProductOption } from "./MenuItemCard";

interface ActionMenuProps {
  productId: string;
}

const dummyOptions: ProductOption[] = [
  { id: "1", label: "50ml", price: 80 },
  { id: "2", label: "30ml", price: 60 },
  {
    id: "3",
    label: "5ml",
    price: 15,
    description: "This option is awesome!",
    batchSales: { quantity: 3, batchPrice: 40 },
  },
];

const createAnimatedGap = (gap: number) => keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-${gap}px); }
`;

const createAnimatedBgColor = (color: string) => keyframes`
  from { background-color: "initial" }
  to { background-color: ${color} }
`;

const GAP_BETWEEN_MENU_ITEMS = 8;
const CLOSE_BUTTON_DISTANCE = 16;
const ANIMATION_DURATION = 0.3;

const ActionMenu: React.FC<ActionMenuProps> = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string>("");
  const [anchorPosition, setAnchorPosition] = useState({
    top: 0, left: 0, right: 0, bottom: 0, height: 0, width: 0,
  });
  const [menuPosition, setMenuPosition] = useState({
    top: 0, left: 0, hasOverflow: false, height: 0, width: 0,
  });

  const theme = useTheme();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen || (!fetching && !error && options.length)) return;

    setFetching(true);
    new Promise((res) => setTimeout(() => res(dummyOptions), 500))
      .then((data) => setOptions(data as ProductOption[]))
      .catch((error) => {
        console.error("Error fetching options:", error);
        // depending on the BE errors design this will be changed!
        setError("An Error Occured!");
      })
      .finally(() => setFetching(false));
  }, [isOpen]);

  useEffect(() => {
    const updatePosition = () => {
      if (anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        setAnchorPosition({
          top: rect.top,
          height: rect.height,
          width: rect.width,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => { 
      window.removeEventListener("resize", updatePosition);
    }
  }, []);

  useLayoutEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const rect = menuRef.current.getBoundingClientRect();
    const middlePoint = anchorPosition.height / 2 + anchorPosition.top;
    const hasOverflow = !fetching && !error && menuRef.current.clientHeight < menuRef.current.scrollHeight;
    
    let top, left;

    if (fetching || error) {
      top =
        middlePoint + rect.height / 2 > window.innerHeight
          ? window.innerHeight - rect.height
          : middlePoint - rect.height / 2 < 0
          ? 0
          : middlePoint - rect.height / 2;
      left = anchorPosition.right - anchorPosition.height - CLOSE_BUTTON_DISTANCE - rect.width;
    } else if (middlePoint - (rect.height + (options.length - 1) * GAP_BETWEEN_MENU_ITEMS) / 2 < 0) {
      top = hasOverflow ? 0 : (options.length - 1) * GAP_BETWEEN_MENU_ITEMS;
      left = anchorPosition.right - anchorPosition.height - CLOSE_BUTTON_DISTANCE - rect.width;
    } else if (middlePoint + (rect.height+ ((options.length - 1) * GAP_BETWEEN_MENU_ITEMS)) / 2 > window.innerHeight) {
      top = window.innerHeight - rect.height;
      left = anchorPosition.right - anchorPosition.height - CLOSE_BUTTON_DISTANCE - rect.width;
    } else {
      top = middlePoint - rect.height / 2;
      left = anchorPosition.right - anchorPosition.height - CLOSE_BUTTON_DISTANCE - rect.width;
    }

    setMenuPosition((prev) => ({...prev, top, left, hasOverflow }));
  }, [isOpen, anchorPosition, fetching, error, options]);

  useTriggerCbOnEscapeKeyForAnElement(overlayRef, handleClose);
  useEffect(() => {
    isOpen && overlayRef.current?.focus()
  }, [isOpen]);

  const renderContent = () => {
    if (fetching) {
      return <CircularProgress size={anchorPosition.height} color="primary" sx={{ display: "block" }} />;
    }
    if (error) {
      return <Alert severity="error" sx={{ fontSize: "1rem", py: 1, px: 2, borderRadius: 1 }}>{error}</Alert>;
    }
    return (
      <Fade in appear timeout={ANIMATION_DURATION * 1000}>
        <Stack direction="column" sx={{ gap: menuPosition.hasOverflow ? 1 : "initial", width: { xs: 202, md: 232 } }}>
          {options.map((item, index) => (
            <Paper
              key={item.id}
              sx={{
                p: 0,
                animation: !menuPosition.hasOverflow
                  ? `${createAnimatedGap((options.length - 1 - index) * GAP_BETWEEN_MENU_ITEMS)} ${ANIMATION_DURATION}s ease forwards`
                  : "initial",
              }}
            >
              <ProductOptionCard {...item} />
            </Paper>
          ))}
        </Stack>
      </Fade>
    );
  };

  return (
    <Box>
      <Fade in={!isOpen} timeout={300}>
        <Button
          variant="contained"
          ref={anchorRef}
          onClick={handleOpen}
          startIcon={<AddShoppingCartIcon style={{ width: 16, height: 16 }} />}
          sx={{
            textTransform: "none",
            height: 40,
            py: 1,
            px: 2,
            gap: 0.5,
            borderRadius: 1,
            "&:focus": { outline: "none" },
          }}
        >
          Buy
        </Button>
      </Fade>
      {isOpen &&
        ReactDOM.createPortal(
          <Box
            ref={overlayRef}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
            sx={{
              zIndex: theme.zIndex.modal,
              position: "fixed",
              inset: 0,
              animation: `${createAnimatedBgColor("rgba(60, 60, 60, 0.7)")} ${ANIMATION_DURATION}s ease forwards`,
            }}
          >
            <Box sx={{ position: "absolute", top: anchorPosition.top, left: anchorPosition.right - anchorPosition.height }}>
              <Fade in={isOpen} timeout={ANIMATION_DURATION * 1000} appear>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    boxShadow: 4,
                    backgroundColor: "white",
                    color: "black",
                    height: anchorPosition.height,
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                    "&:focus": { outline: "none" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              </Fade>
            </Box>
            <Box
              ref={menuRef}
              sx={{
                maxHeight: "70vh",
                overflow: menuPosition.hasOverflow ? "auto" : "visible",
                position: "absolute",
                top: menuPosition.top,
                left: menuPosition.left,
              }}
            >
              {renderContent()}
            </Box>
          </Box>,
          document.body
        )}
    </Box>
  );
};

export default ActionMenu;
