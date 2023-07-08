import React, { useState } from "react";
import Login from "./Login";
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
} from "@chakra-ui/react";
import Signup from "./Signup";
export default function Login_SignupContainer() {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <Container p="20px" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
      <Flex>
        <ButtonGroup>
          <Button
            colorScheme={activeButton === "login" ? "blue" : "gray"}
            variant={activeButton === "login" ? "solid" : "outline"}
            onClick={() => handleButtonClick("login")}
          >
            Login
          </Button>
          <Button
            colorScheme={activeButton === "signup" ? "blue" : "gray"}
            variant={activeButton === "signup" ? "solid" : "outline"}
            onClick={() => handleButtonClick("signup")}
          >
            Signup
          </Button>
        </ButtonGroup>
      </Flex>
      <Divider />
      {activeButton === "login" ? <Login /> : <Signup />}
    </Container>
  );
}
