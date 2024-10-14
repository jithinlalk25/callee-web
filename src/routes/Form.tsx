import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Spinner,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Constant } from "../utils/constants";
import { checkout } from "../utils/cashfree";

enum AmountTypeEnum {
  FIXED = "FIXED",
  CUSTOM = "CUSTOM",
  QUANTITY = "QUANTITY",
}

enum FeeCollectedFromEnum {
  PAYER = "PAYER",
  PAYEE = "PAYEE",
}

function Form() {
  const { id } = useParams();

  const [form, setForm] = useState<any>(null);
  const [fields, setFields] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [platformFee, setPlatformFee] = useState<number>(0);
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const init = async () => {
    const response = await axios.get(
      `${Constant.API_URL}form-web/getForm/${id}`
    );

    setPlatformFee(response.data.platformFee / 100);

    if (
      [AmountTypeEnum.FIXED, AmountTypeEnum.QUANTITY].includes(
        response.data.form.amountType
      )
    ) {
      setAmount(response.data.form.amount);
    }
    setForm(response.data.form);
    const fieldsObj: any = {};
    response.data.form.fields.forEach((field: any) => {
      fieldsObj[field.id] = "";
    });
    setFields(fieldsObj);
  };

  useEffect(() => {
    init();
  }, []);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      // @ts-ignore
      step: 1,
      defaultValue: 1,
      min: 1,
      onChange: (value: string) => {
        setAmount(Number(value) * form.amount);
        setQuantity(Number(value));
      },
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ quantity });

  const pay = async () => {
    setLoading(true);
    let _fields = { ...fields };

    Object.keys(_fields).forEach((key) => {
      _fields[key] = _fields[key].trim();
    });

    let data: any = {
      fields: _fields,
    };

    if (form.amountType == AmountTypeEnum.QUANTITY) {
      data["quantity"] = quantity;
    }

    if (form.amountType == AmountTypeEnum.CUSTOM) {
      data["amount"] = amount;
    }

    const response = await axios.post(
      `${Constant.API_URL}submission-web/submit`,
      {
        formId: form._id,
        formVersion: form.version,
        data,
        whatsAppNumber,
      }
    );
    checkout(
      response.data.paymentSessionId,
      response.data.returnUrl,
      setLoading
    );
  };

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Split the text based on URLs
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        // If the part is a URL, render it as a clickable link
        return (
          <Link key={index} href={part} color="blue" isExternal>
            {part}
          </Link>
        );
      }
      return part; // Otherwise, render the text part as is
    });
  };

  return (
    form &&
    fields && (
      <Flex
        flexDirection="column"
        alignItems="center"
        padding="20px"
        minHeight="100vh"
      >
        {loading ? (
          <Spinner thickness="4px" size="xl" />
        ) : (
          <>
            <Heading width="fit-content">{form.title}</Heading>
            {form.description?.length > 0 && (
              <Text marginTop="10px">
                {form.description.split("\n").map((line: any, index: any) => (
                  <React.Fragment key={index}>
                    {renderTextWithLinks(line)}
                    <br />
                  </React.Fragment>
                ))}
              </Text>
            )}

            <FormControl isRequired maxWidth={500} marginTop="10px">
              {form.fields.map((field: any) => (
                <div key={field.id} style={{ marginTop: "20px" }}>
                  <FormLabel>{field.name}</FormLabel>
                  <Input
                    value={fields[field.id]}
                    onChange={(event) => {
                      setFields((prevData: any) => {
                        return { ...prevData, [field.id]: event.target.value };
                      });
                    }}
                  />
                </div>
              ))}

              {form.amountType == AmountTypeEnum.QUANTITY && (
                <div style={{ marginTop: "20px" }}>
                  <FormLabel>{form?.quantityField?.name}</FormLabel>
                  <HStack maxW="200px">
                    <Button {...dec}>-</Button>
                    <Input {...input} />
                    <Button {...inc}>+</Button>
                    <Text>{quantity}</Text>
                  </HStack>
                </div>
              )}

              {form.amountType == AmountTypeEnum.CUSTOM && (
                <div style={{ marginTop: "20px" }}>
                  <Input
                    value={amount}
                    onChange={(event) => {
                      setAmount(Number(event.target.value));
                    }}
                  />
                </div>
              )}

              <div style={{ marginTop: "20px" }}>
                <Text
                  style={
                    form.feeCollectedFrom == FeeCollectedFromEnum.PAYEE
                      ? { fontWeight: "bold", color: "darkblue" }
                      : {}
                  }
                >
                  Amount: ₹{amount.toFixed(2)}
                </Text>
                {form.feeCollectedFrom == FeeCollectedFromEnum.PAYER && (
                  <>
                    <Text fontSize={10}>
                      Platform Fee: ₹{(amount * platformFee).toFixed(2)}
                    </Text>
                    <Text fontWeight="bold" color="darkblue">
                      Total Amount: ₹
                      {(amount + amount * platformFee).toFixed(2)}
                    </Text>
                  </>
                )}
              </div>
              <Divider marginTop="20px" marginBottom="20px" />
              <FormLabel color="blue">
                Receive Payment Confirmation on WhatsApp
              </FormLabel>
              <InputGroup maxWidth={200} size="sm">
                <InputLeftAddon>+91</InputLeftAddon>
                <Input
                  type="tel"
                  value={whatsAppNumber}
                  placeholder="9999999999"
                  maxLength={10}
                  onChange={(event) => {
                    const input = event.target.value;
                    // Allow only digits and limit to 10 characters
                    if (/^\d*$/.test(input)) {
                      setWhatsAppNumber(input);
                    }
                    // setWhatsAppNumber(event.target.value);
                  }}
                />
              </InputGroup>

              <Button
                colorScheme="teal"
                marginTop="20px"
                width="100px"
                alignSelf={"flex-end"}
                onClick={pay}
                disabled={
                  !Object.values(fields).every(
                    (value: any) => value.trim().length > 0
                  ) || whatsAppNumber.trim().length != 10
                }
              >
                Pay
              </Button>
            </FormControl>
            <Flex marginTop="auto"></Flex>
            <Flex
              backgroundColor="#f3f3f3"
              width="100%"
              alignItems="center"
              flexDirection="column"
              marginTop="20px"
            >
              <Text
                fontSize={20}
                color="#9e9e9e"
                fontWeight="bold"
                marginLeft="auto"
                marginRight="auto"
                marginTop="3px"
              >
                Callee
              </Text>
              <Link
                href="https://callee.app"
                color="#9e9e9e"
                isExternal
                marginBottom="5px"
                fontSize={12}
              >
                https://callee.app
              </Link>
            </Flex>
          </>
        )}
      </Flex>
    )
  );
}

export default Form;
