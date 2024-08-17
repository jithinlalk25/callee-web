import "./App.css";
import { Flex, Heading, Text } from "@chakra-ui/react";

function App() {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Heading as="h1" size="4xl">
        Callee
      </Heading>
      <Text fontSize="md">Money collection made easy</Text>
    </Flex>
  );
}

export default App;
