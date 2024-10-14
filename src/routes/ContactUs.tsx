import { Box, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

function ContactUs() {
  return (
    <Box width="90%" maxW="1024px" margin={"15px auto"}>
      <Heading mb={5} fontWeight="bold">
        Contact Us
      </Heading>
      <Text mb={5}>Last updated on 10-10-2024 16:05:58</Text>
      <Text mb={5}>You may contact us using the information below:</Text>
      <Text>Merchant Legal entity name: JITHIN KALAKKASSERY LAL</Text>
      <Text>
        Registered Address: Kurichilakode, Perumbavoor, Kerala, PIN: 683544
      </Text>
      <Text>
        Operational Address: Kalakkassery House, Kodanad PO, Kurichilakode,
        Perumbavoor, Kerala, PIN: 683544
      </Text>
      <Text>Telephone No: 7356245819</Text>
      <Text>E-Mail ID: calleeteam@gmail.com</Text>
    </Box>
  );
}

export default ContactUs;
