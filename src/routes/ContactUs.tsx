import { Box, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

function ContactUs() {
  return (
    <Box width="90%" maxW="1024px" margin={"15px auto"}>
      <Heading mb={5} fontWeight="bold">
        Contact Us
      </Heading>
      <Text mb={5}>
        If you have any questions, you can contact us at{" "}
        <Link href="mailto:calleeteam@gmail.com" color="darkblue">
          calleeteam@gmail.com
        </Link>
      </Text>
    </Box>
  );
}

export default ContactUs;
