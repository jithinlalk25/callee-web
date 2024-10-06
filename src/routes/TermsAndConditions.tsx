import { Box, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

function TermsAndConditions() {
  return (
    <Box width="90%" maxW="1024px" margin={"15px auto"}>
      <Heading mb={5} fontWeight="bold">
        Terms and Condtions
      </Heading>
      <Heading size="md" mb={5} fontWeight="bold">
        Acceptance of Terms
      </Heading>
      <Text mb={5}>
        By accessing or using Callee, you agree to be bound by these Terms and
        Conditions. If you do not agree to these terms, please refrain from
        using Callee.
      </Text>
      <Heading size="md" mb={5} fontWeight="bold">
        User Accounts
      </Heading>
      <Text mb={5}>
        You may be required to create a Callee account to use certain features.
        You are responsible for maintaining the confidentiality of your account
        information and for any activities that occur under your account.
      </Text>
      <Heading size="md" mb={5} fontWeight="bold">
        Platform Fees
      </Heading>
      <Text mb={5}>
        Callee charges a 5% platform fee on all transactions processed through
        the platform. This fee covers payment gateway charges and platform
        maintenance costs.
      </Text>
      <Heading size="md" mb={5} fontWeight="bold">
        Refund Policy
      </Heading>
      <Text mb={5}>
        Callee's refund policy is determined by the specific event or activity
        for which payments are being collected. Please refer to the terms and
        conditions of the individual event or activity for details on refund
        eligibility and procedures.
      </Text>
      <Heading size="md" mb={5} fontWeight="bold">
        Intellectual Property
      </Heading>
      <Text mb={5}>
        All content and materials on Callee, including the Callee logo, are the
        property of Callee or its licensors. You are not permitted to use,
        reproduce, or distribute any of this material without prior written
        consent.
      </Text>
      <Heading size="md" mb={5} fontWeight="bold">
        Limitation of Liability
      </Heading>
      <Text mb={5}>
        Callee shall not be liable for any direct, indirect, incidental,
        special, or consequential damages arising out of or in connection with
        your use of Callee, even if Callee has been advised of the possibility
        of such damages.
      </Text>
      <Heading size="md" mb={5} fontWeight="bold">
        Changes to Terms
      </Heading>
      <Text mb={5}>
        Callee reserves the right to modify these Terms and Conditions at any
        time. Any changes will be effective upon posting on the Callee website.
        Your continued use of Callee after such changes constitute your
        acceptance of the modified terms.
      </Text>
      <Heading size="md" mb={5} fontWeight="bold">
        Contact Information
      </Heading>
      <Text mb={5}>
        For any questions or concerns regarding these Terms and Conditions,
        please contact us at{" "}
        <Link href="mailto:calleeteam@gmail.com" color="darkblue">
          calleeteam@gmail.com
        </Link>
      </Text>
      <Text mb={5}>
        By using Callee, you acknowledge that you have read, understood, and
        agreed to these Terms and Conditions.
      </Text>
    </Box>
  );
}

export default TermsAndConditions;
