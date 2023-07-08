import React, { useState, useContext } from "react";
import {
  Container,
  Input,
  Button,
  Divider,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { myContext } from "../Context/AuthContextProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLogedin, setisLogedin } = useContext(myContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://stormy-bat-waders.cyclic.app/user/login", {
        email,
        password,
      })
      .then((res) => {
        alert("login Successful");
        const token = res.data.token;
        // console.log(res);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("token", token);
        setisLogedin({
          login: true,
          userName: localStorage.getItem("userName"),
        });
      })
      .then(() => navigate("/products"))
      .catch((err) => alert("please Signup!"));
    setEmail("");
    setPassword("");
  };
  return (
    <Container>
      <Text textAlign="center">Login</Text>
      <form onSubmit={handleSubmit}>
        <VStack>
          <Input
            type="email"
            id="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            id="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <Button w="100%" colorScheme="blue" type="submit">
            Login
          </Button>

          <Divider />

          <Button w="100%" colorScheme="blue" type="submit">
            <FcGoogle size="1.5rem" />
            Continue with Google
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
