# FusionPay

[![npm version](https://img.shields.io/npm/v/fusionpay.svg)](https://www.npmjs.com/package/fusionpay)

FusionPay is a modern TypeScript/JavaScript library that simplifies integration with the MoneyFusion payment gateway. It provides a fluent, intuitive API for implementing secure online payments in your applications.

## Features

- 🔒 Secure payment processing with MoneyFusion
- 💪 Full TypeScript support with generic types
- 🧩 Fluent API with method chaining
- 📋 Comprehensive payment status verification
- 🛠️ Customizable data storage for transactions

## Installation

```bash
# Using npm
npm install fusionpay

# Using yarn
yarn add fusionpay

# Using pnpm
pnpm add fusionpay
```

## Quick Start

```typescript
import { FusionPay } from "fusionpay";

// Initialize the payment client
const payment = new FusionPay("https://api.moneyfusion.com");

// Configure the payment
payment
  .totalPrice(1500)
  .addArticle("Premium Headphones", 1000)
  .addArticle("Extended Warranty", 500)
  .clientName("John Doe")
  .clientNumber("+123456789")
  .addInfo({
    orderId: "ORD-12345",
    customerEmail: "john.doe@example.com",
  })
  .returnUrl("https://your-store.com/return")
  .webhookUrl("https://your-store.com/webhook");

// Initiate payment
try {
  const response = await payment.makePayment();

  // Redirect user to payment gateway
  window.location.href = response.url;
} catch (error) {
  console.error("Payment initiation failed:", error);
}
```

## Detailed Usage Guide

### Initializing with Custom Data Types

FusionPay uses TypeScript generics to ensure type safety for your custom payment data:

```typescript
// Define your custom data type
interface OrderData {
  orderId: string;
  customerEmail: string;
  productIds: string[];
}

// Create a typed payment client
const payment = new FusionPay<OrderData>("https://api.moneyfusion.com");

// Your custom data is now type-checked
payment.addInfo({
  orderId: "ORD-12345",
  customerEmail: "customer@example.com",
  productIds: ["PROD-001", "PROD-002"],
});
```

### Payment Flow

1. **Configure payment details** using the fluent API
2. **Initiate payment** with `makePayment()`
3. **Redirect user** to the payment URL returned in the response
4. **Handle the callback** when the user returns from the payment gateway
5. **Verify payment status** using the token from the callback URL

### Handling Payment Callbacks

When a payment is processed, the user will be redirected(`get`) to your `returnUrl` with a token parameter or a `post` request will be made to the `webhookUrl` with the payment data:

```
https://your-store.com/return?token=payment_token_here
```

Extract and validate this token to verify the payment status:

```typescript
// Node.js Express example

//In case you use returnUrl
app.get("/return", async (req, res) => {
  const { token } = req.query;
  try {
    const payment = new FusionPay(process.env.FUSION_API_URL);
    const status = await payment.checkPaymentStatus(token as string);

    if (status.statut && status.data.statut === "paid") {
      // Payment successful
      const customData = status.data.personal_Info[0];
      // Process order fulfillment...
    } else {
      // Payment failed or pending
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).send("Failed to verify payment");
  }
});

// In case you use webhook
app.post("/webhook", async (req, res) => {
  // Handle webhook events
  const {...} = req.body; // Payment data from MoneyFusion(typeof PaymentVerificationData)
  //make your order fulfillment
});
```

## API Reference

### Required vs Optional Fields

The following table shows all configuration fields for the FusionPay client, whether they're required, and their purpose:

| Field           | Method                                    | Required | Description                                                      |
| --------------- | ----------------------------------------- | :------: | ---------------------------------------------------------------- |
| `totalPrice`    | `totalPrice(amount: number)`              |    ✅    | The total payment amount to be processed                         |
| `article`       | `addArticle(name: string, value: number)` |    ✅    | Individual items included in the payment (at least one required) |
| `nomclient`     | `clientName(name: string)`                |    ✅    | Customer's full name                                             |
| `numeroSend`    | `clientNumber(number: string)`            |    ✅    | Customer's phone number                                          |
| `return_url`    | `returnUrl(url: string)`                  |    ❌    | URL where customer will be redirected after payment              |
| `webhook_url`   | `webhookUrl(url: string)`                 |    ❌    | URL for receiving server-to-server payment notifications         |
| `personal_Info` | `addInfo(data: T)`                        |    ❌    | Custom data to store with the transaction                        |

\*At least one article must be added using `addArticle()` or `addArticles()`.

### Response Types

#### PaymentResponse

```typescript
interface PaymentResponse {
  statut: boolean; // Payment initiation status
  token: string; // Token for payment verification
  message: string; // Status message
  url: string; // Payment gateway URL for user redirection
}
```

#### PaymentVerificationResponse

```typescript
interface PaymentVerificationResponse<T> {
  statut: boolean; // Verification request status
  message: string; // Status message
  data: {
    _id: string; // Payment record ID
    tokenPay: string; // Payment token
    numeroSend: string; // Customer phone number
    nomclient: string; // Customer name
    personal_Info: T[]; // Your custom data array
    numeroTransaction: string; // Transaction reference
    Montant: number; // Payment amount
    frais: number; // Transaction fees
    statut: "pending" | "paid" | "failed"; // Payment status
    moyen: string; // Payment method used
    return_url: string; // Callback URL
    createdAt: string; // Transaction timestamp
  };
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
