import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Image,
  Box,
  Button,
  Text,
  Divider,
  Flex,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { ADD_PRODUCT_DETAILS } from "../Redux/actionType";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcAddColumn } from "react-icons/fc";

export default function Cart({ isOpen, onOpen, onClose }) {
  const [cartData, setCartData] = useState([]);
  const [deleteCartItem, setDeleteCartItem] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const apiUrl = "https://stormy-bat-waders.cyclic.app/cart";
  useEffect(() => {
    axios
      .get(apiUrl, config)
      .then((res) => {
        console.log(res.data);

        if (res.data === "please login") {
          setCartData([]);
        } else {
          setCartData(res.data);
        }
      })
      .catch((err) => setCartData([]));
  }, [isOpen, deleteCartItem]);

  const handleDeleteCartItem = (_id) => {
    console.log(_id);
    axios
      .delete(`https://stormy-bat-waders.cyclic.app/cart/${_id}`, config)
      .then((res) => setDeleteCartItem(!deleteCartItem));
  };

  return (
    <>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            {cartData.length > 0 ? (
              cartData?.map((e) => {
                return (
                  <Box
                    marginBottom="10px"
                    p="20px"
                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                  >
                    <Image w="100%" src={e.image} />
                    <Text p="0">Name: {e.name}</Text>
                    <Text marginBottom="5px">Type: {e.type}</Text>
                    <Flex gap="30px">
                      <Button
                        w="100px"
                        marginTop="5px"
                        box-sizing="border-box"
                        colorScheme="blue"
                        size={{ base: "sm", md: "md" }}
                        onClick={() => {
                          dispatch({
                            type: ADD_PRODUCT_DETAILS,
                            payload: e,
                          });
                          navigate("/productDetail");
                        }}
                      >
                        Buy Now
                      </Button>
                      <i
                        class="fa-solid fa-trash-can fa-2x"
                        onClick={() => {
                          handleDeleteCartItem(e._id);
                        }}
                        style={{ color: "red", marginTop: "6px" }}
                      ></i>
                    </Flex>
                  </Box>
                );
              })
            ) : (
              <Box>
                <FcAddColumn
                  size="100px"
                  onClick={() => {
                    navigate("/products");
                  }}
                />
                <Text>Cart is Empty</Text>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
