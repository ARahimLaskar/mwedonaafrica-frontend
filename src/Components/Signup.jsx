import React, { useState } from "react";
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

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://stormy-bat-waders.cyclic.app/user/signup", {
        name,
        phone,
        email,
        password,
      })
      .then((res) => alert("Signup Successful"))
      .catch((err) => alert("User Exist! please Login"));
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
  };

  //   const handleGoogle = () => {
  //     axios
  //       .get("http://localhost:8000/auth/google")
  //       .then((res) => console.log(res));
  //     //   .catch((err) => alert("something went wrong, please try again"));
  //   };

  return (
    <Container>
      <Text textAlign="center">Signup</Text>
      <form onSubmit={handleSubmit}>
        <VStack>
          <Input
            type="text"
            id="name"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="number"
            value={phone}
            placeholder="Enter Phone No."
            onChange={(e) => setPhone(e.target.value)}
            required
          />
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
            Signup
          </Button>

          <Divider />

          <Button w="100%" colorScheme="blue">
            <FcGoogle size="1.5rem" />
            Continue with Google
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
