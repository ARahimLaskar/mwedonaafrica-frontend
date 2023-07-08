import React, { useEffect, useState, useContext } from "react";
import { myContext } from "../Context/AuthContextProvider";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Image,
  Grid,
  Text,
  GridItem,
  UnorderedList,
  ListItem,
  Spacer,
  Button,
  useDisclosure,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FcLike, FcMenu } from "react-icons/fc";
import Cart from "./Cart";
import MenuDrower from "./MenuDrower";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const [cartClick, setCartClick] = useState(false);
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const displayMenu = useBreakpointValue({ md: "block", lg: "none" });

  const [token, setToken] = useState(localStorage.getItem("token"));
  const user = localStorage.getItem("userName");
  const navigate = useNavigate();
  const { isLogedin, setisLogedin } = useContext(myContext);
  console.log("user", isLogedin.user);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);
  const lsToken = localStorage.getItem("token");
  const handleLogin = () => {
    navigate("/login_signup");
  };

  const handleLogout = () => {
    setToken(localStorage.removeItem("token"));
    localStorage.removeItem("userName");
    setisLogedin({
      login: false,
      userName: "",
    });
    // Logic to handle logout
  };

  return (
    <>
      <nav className="main_nav">
        <Box w="80%" m="0 auto">
          <Grid
            templateColumns="200px 1fr"
            justifyContent="space-around"
            alignItems="center"
          >
            <GridItem>
              <Image
                w="100px"
                h="100px"
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/99/62/cc/caption.jpg?w=1200&h=-1&s=1"
                alt="Logo"
              />
            </GridItem>
            {/* {displayMenu ? ( */}
            <GridItem>
              <Flex justifyContent="flex-end" gap="30px" alignItems="center">
                <Link to="/">Home</Link>
                <Link to="">About</Link>
                <Link to="/products">Products</Link>
                <Link>Contact</Link>
                {isLogedin ? (
                  <>
                    <Button colorScheme="blue" variant="outline">
                      {user}
                    </Button>
                    <Button colorScheme="blue" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleLogin}>Login</Button>
                )}

                <FcLike size="30px" onClick={onOpen} />
              </Flex>
            </GridItem>
          </Grid>
        </Box>
        <Divider marginTop="0px" />
      </nav>
      {displayMenu || cartClick ? (
        <Cart isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      ) : (
        <MenuDrower isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      )}
    </>
  );
}

export default Navbar;
