import React from "react";
import { useHistory } from "react-router-dom";

// @ts-ignore
import { store, useGlobalState } from "state-pool";

//chakra ui
import { useToast, Input, Button, Flex, useColorMode } from "@chakra-ui/core";
import Navbar from "./Navbar";

interface loginProps {}

store.setState("user", { username: "" });

const Login: React.FC<loginProps> = () => {
  const toast = useToast();

  // eslint-disable-next-line
  const { colorMode, toggleColorMode } = useColorMode();
  let history = useHistory();

  // eslint-disable-next-line
  const [user, updateUser, _] = useGlobalState("user");
  const handleChange = (event: any) => {
    updateUser((user: any) => {
      user.username = event.target.value;
    });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (user.username.length < 3) {
      toast({
        title: "An error occurred.",
        description: "Please enter passowrd longer than 3 characters",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      updateUser((username: any) => {
        username.username = user.username;
        history.push("/chat");
      });
    }
  };
  return (
    <>
      <Navbar />
      <form onSubmit={submit}>
        <Flex
          bg={colorMode === "light" ? "gray.800" : "gray.700"}
          margin="auto"
          flexWrap="wrap"
          mt="15%"
          align="center"
          height="200px"
          width="500px"
          rounded="5px"
          justifyContent="space-between"
          padding="5%"
        >
          <Input
            bg={colorMode === "light" ? "blue" : "blue.600"}
            placeholder="Username"
            value={user.username}
            width="75%"
            onChange={handleChange}
          />
          <Button type="submit" variantColor={colorMode === "light" ? "pink" : "cyan"}>
            Login
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default Login;
