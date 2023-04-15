import { Flex, Box, Button, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "/logo.png";
import { logout } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { useAuthStore, emptyUserData } from "../hooks/useAuthStore";
import { TEACHER } from "../constants";

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { userData, setUserData } = useAuthStore();

  const handleLogout = () => {
    logout();
    setUserData(emptyUserData);
    navigate("/auth", { replace: true });
  };

  return (
    <Flex align="center" justify="space-between" wrap="wrap" bg="navBG" px={4} py={1}>
      <Flex align="center">
        <Box>
          <img src={logo} alt="logo" height="50px" width="50px" />
        </Box>
      </Flex>

      <Box display={{ base: "block", sm: "none" }} onClick={onOpen}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={6} />}
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", sm: "flex" }}
        width={{ base: "full", sm: "auto", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        justifyContent="flex-end"
      >
        {userData.userType === TEACHER && (
          <Button
            onClick={() => navigate("/new", { replace: true })}
            bg="navButtonBG"
            border="1px"
            borderColor="blackAlpha.800"
            mr={4}
            px={2}
          >
            Add
          </Button>
        )}
        <Button
          onClick={handleLogout}
          bg="navButtonBG"
          border="1px"
          borderColor="blackAlpha.800"
          mr={4}
          px={2}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
}
