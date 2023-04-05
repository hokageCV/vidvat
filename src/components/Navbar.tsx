import { Flex, Box, Button, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '/logo.png';

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex align="center" justify="space-between" wrap="wrap" bg="navBG" px={4} py={1}>
      <Flex align="center">
        <Box>
          <img src={logo} alt="logo" height="50px" width="50px" />
        </Box>
      </Flex>

      <Box display={{ base: 'block', sm: 'none' }} onClick={onOpen}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={6} />}
      </Box>

      <Box
        display={{ base: isOpen ? 'block' : 'none', sm: 'flex' }}
        width={{ base: 'full', sm: 'auto', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        justifyContent="flex-end"
      >
        <Button bg="navButtonBG" border="1px" borderColor="blackAlpha.800" mr={4} px={2}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
}
