# FusionPay

FusionPay is a JavaScript library for handling payment operations, providing a simple and intuitive API to facilitate online payments for moneyfusion.net.

## Installation

You can install FusionPay via npm or yarn.:

```bash
npm install fusionpay
```

```bash
yarn add fusionpay
```

## Usage

Initializing FusionPay
To start using FusionPay, you need to initialize a new instance with your API URL:

```javascript
const { FusionPay } = require("fusionpay");
//OR import { FusionPay } from "fusionpay";

const fusionPay = new FusionPay("https://your-api-url.com");
```

## Setting Payment Data

You can set the payment data using the various methods provided by FusionPay:

```javascript
fusionPay
  .totalPrice(200)
  .addArticle("Sac", 100)
  .addArticle("Veste", 200)
  .addInfo({ userId: "1245d858sf8f95f9ff", token: "dffqsyyyysfs56556sjsjh" })
  .clientName("M. Yaya")
  .clientNumber("0574801791")
  .returnUrl("https://my_call_back_link.com");
```

## Making a Payment

To make a payment, use the makePayment() method:

```javascript
fusionPay
  .makePayment()
  .then((response) => {
    console.log("Payment successful:", response);
  })
  .catch((error) => {
    console.error("Payment failed:", error);
  });
```

## Checking Payment Status

To check the payment status, use the checkPaymentStatus() method:

```javascript
const paymentToken = "your_payment_token_here";

fusionPay
  .checkPaymentStatus(paymentToken)
  .then((status) => {
    console.log("Payment status:", status);
  })
  .catch((error) => {
    console.error("Failed to check payment status:", error);
  });
```

## API

`FusionPay(apiUrl: string)`

- `apiUrl: The API URL for payment.`

## Methods

- `totalPrice(amount: number): FusionPay`
- `addArticle(name: string, value: number): FusionPay`
- `addInfo(info: Record<string, string>): FusionPay`
- `clientName(name: string): FusionPay`
- `clientNumber(number: string): FusionPay`
- `returnUrl(url: string): FusionPay`
- `makePayment(): Promise<AxiosResponse>`
- `checkPaymentStatus(token: string): Promise<AxiosResponse>`

## License

This project is licensed under the MIT License. See the LICENSE file for details.
