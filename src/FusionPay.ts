/**
 * Generic type for custom payment data that user wants to store and retrieve after payment
 */
export type CustomPaymentData = Record<string, any>;

export interface PaymentResponse {
  statut: boolean;
  token: string;
  message: string;
  url: string;
}

export interface PaymentVerificationData<T = CustomPaymentData> {
  _id: string;
  tokenPay: string;
  numeroSend: string;
  nomclient: string;
  personal_Info: T[];
  numeroTransaction: string;
  Montant: number;
  frais: number;
  statut: "pending" | "paid" | "failed";
  moyen: string;
  return_url: string;
  createdAt: string;
}

export interface PaymentVerificationResponse<T = CustomPaymentData> {
  statut: boolean;
  data: PaymentVerificationData<T>;
  message: string;
}

/**
 * FusionPay class for handling payment operations with MoneyFusion payment gateway.
 * @template T Type of custom data to be stored in personal_Info
 */
export class FusionPay<T = CustomPaymentData> {
  private apiUrl: string;
  private readonly headers: Record<string, string>;
  private paymentData: {
    totalPrice?: number;
    article: Array<Record<string, number>>;
    personal_Info: T[];
    numeroSend?: string;
    nomclient?: string;
    return_url?: string;
    webhook_url?: string;
  };

  /**
   * Initializes a new instance of the FusionPay class.
   * @param apiUrl - The API URL for payment processing.
   */
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.headers = {
      "Content-Type": "application/json",
    };
    this.paymentData = {
      article: [],
      personal_Info: [],
    };
  }

  /**
   * Sets the total price for the payment.
   * @param amount - The total price amount.
   */
  public totalPrice(amount: number): this {
    this.paymentData.totalPrice = amount;
    return this;
  }

  /**
   * Adds an article to the payment data.
   * @param name - The name of the article.
   * @param value - The price of the article.
   */
  public addArticle(name: string, value: number): this {
    this.paymentData.article.push({ [name]: value });
    return this;
  }

  /**
   * Adds custom data to personal_Info that will be returned after payment processing.
   * @param data - Custom data object to store with the payment
   */
  public addInfo(data: T): this {
    this.paymentData.personal_Info.push(data);
    return this;
  }

  /**
   * Sets the client name for the payment.
   * @param name - The client name.
   */
  public clientName(name: string): this {
    this.paymentData.nomclient = name;
    return this;
  }

  /**
   * Sets the client number for the payment.
   * @param number - The client phone number.
   */
  public clientNumber(number: string): this {
    this.paymentData.numeroSend = number;
    return this;
  }

  /**
   * Sets the return URL for the payment callback.
   * @param url - The return URL where payment token will be appended.
   */
  public returnUrl(url: string): this {
    this.paymentData.return_url = url;
    return this;
  }

  /**
   * Adds a webhook URL for payment notifications.
   * @param url - The webhook URL to receive payment notifications.
   */
  public webhookUrl(url: string): this {
    this.paymentData.webhook_url = url;
    return this;
  }

  /**
   * Makes a payment using the configured payment data.
   * @returns A promise that resolves with the payment response.
   * @throws Error if the payment request fails.
   */
  public async makePayment(): Promise<PaymentResponse> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(this.paymentData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("An unknown error occurred during payment");
    }
  }

  /**
   * Checks the payment status using a token.
   * @param token - The payment token received as URL query parameter.
   * @returns A promise that resolves with the payment verification response.
   * @throws Error if the status check fails.
   */
  public async checkPaymentStatus(
    token: string
  ): Promise<PaymentVerificationResponse<T>> {
    const url = `https://www.pay.moneyfusion.net/paiementNotif/${token}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("An unknown error occurred while checking payment status");
    }
  }
}
