import { Box, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

function CancellationRefundPolicy() {
  return (
    <Box width="90%" maxW="1024px" margin={"15px auto"}>
      <Heading mb={5} fontWeight="bold">
        Cancellation & Refund Policy
      </Heading>
      <Text mb={5}>Last updated on 11-10-2024 17:16:43</Text>
      <Text mb={5}>
        At Callee, we provide a platform for administrators and organizers to
        collect payments for events, contributions, and group activities. As
        Callee serves solely as a facilitator between the organizer and the
        payees, we do not offer refunds or accept cancellations once payments
        are processed.
      </Text>
      <Text>
        Refunds or cancellations, if any, are governed by the policies of the
        individual organizers or admins who collect the payments. We advise
        users to contact the respective organizer directly for any refund or
        cancellation inquiries.
      </Text>
      <Text>
        For any further questions or concerns, feel free to contact our support
        team at calleeteam@gmail.com
      </Text>
    </Box>
  );
}

export default CancellationRefundPolicy;
