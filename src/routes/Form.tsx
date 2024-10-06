import {
  Button,
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
import { checkout } from "../utils/cashfree";

enum AmountTypeEnum {
  FIXED = "FIXED",
  CUSTOM = "CUSTOM",
  QUANTITY = "QUANTITY",
}

function Form() {
  const { id } = useParams();

  const [form, setForm] = useState<any>(null);
  const [fields, setFields] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [platformFee, setPlatformFee] = useState<number>(0);

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
      }
    );

    checkout(response.data.paymentSessionId, response.data.returnUrl);
  };

  return (
    form &&
    fields && (
      <Flex flexDirection="column" alignItems="center" margin="20px">
        <Heading width="fit-content">{form.title}</Heading>

        <FormControl isRequired maxWidth={300} marginTop="10px">
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
            <Text>Amount: ₹{amount.toFixed(2)}</Text>
            <Text fontSize={10}>
              Platform Fee: ₹{(amount * platformFee).toFixed(2)}
            </Text>
            <Text fontWeight="bold" color="darkblue">
              Total Amount: ₹{(amount + amount * platformFee).toFixed(2)}
            </Text>
          </div>

          <Button
            colorScheme="teal"
            marginTop="20px"
            width="100px"
            alignSelf={"flex-end"}
            onClick={pay}
            disabled={
              !Object.values(fields).every(
                (value: any) => value.trim().length > 0
              )
            }
          >
            Pay
          </Button>
        </FormControl>
      </Flex>
    )
  );
}

export default Form;
