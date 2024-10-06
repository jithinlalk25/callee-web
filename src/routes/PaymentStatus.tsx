import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Constant } from "../utils/constants";

function PaymentStatus() {
  const { orderId } = useParams();

  const [data, setData] = useState<any>(null);

  const init = async () => {
    const response = await axios.get(
      `${Constant.API_URL}payment-web/getPaymentStatus/${orderId}`
    );

    setData(response.data);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    data && (
      <Flex flexDirection="column" alignItems="center" margin="20px">
        <Heading as="h4" size="md" color="blue">
          Payment Status
        </Heading>

        <Card marginTop="10px">
          <CardBody>
            <Text>
              <Text as="span" fontWeight="bold">
                Payment Id:
              </Text>{" "}
              {data.paymentId}
            </Text>
            <Text>
              {" "}
              <Text as="span" fontWeight="bold">
                Amount:
              </Text>{" "}
              {data.amount}
            </Text>
            <Text>
              {" "}
              <Text as="span" fontWeight="bold">
                Status:
              </Text>{" "}
              {data.status}
            </Text>
          </CardBody>
        </Card>
      </Flex>
    )
  );
}

export default PaymentStatus;
