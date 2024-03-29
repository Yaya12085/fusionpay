import axios, { AxiosResponse } from "axios";

/**
 * FusionPay class for handling payment operations.
 */
class FusionPay {
  private apiUrl: string;
  private headers: Record<string, string>;
  private paymentData: {
    totalPrice?: number;
    article: Array<Record<string, number>>;
    personal_Info: Array<Record<string, string>>;
    numeroSend?: string;
    nomclient?: string;
    return_url?: string;
  } = {
    article: [],
    personal_Info: [],
  };

  /**
   * Initializes a new instance of the FusionPay class.
   * @param apiUrl - The API URL for payment.
   */
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Sets the total price for the payment.
   * @param amount - The total price amount.
   * @returns The FusionPay instance for method chaining.
   * @example
   * fusionPay.totalPrice(200);
   */
  totalPrice(amount: number): FusionPay {
    this.paymentData.totalPrice = amount;
    return this;
  }

  /**
   * Adds an article to the payment data.
   * @param name - The name of the article.
   * @param value - The value of the article.
   * @returns The FusionPay instance for method chaining.
   * @example
   * fusionPay.addArticle('sac', 100);
   */
  addArticle(name: string, value: number): FusionPay {
    this.paymentData.article.push({ [name]: value });
    return this;
  }

  /**
   * Adds personal info to the payment data.
   * @param info - The personal info object.
   * @returns The FusionPay instance for method chaining.
   * @example
   * fusionPay.addInfo({ userId: '1245d858sf8f95f9ff', token: 'dffqsyyyysfs56556sjsjh' });
   */
  addInfo(info: Record<string, string>): FusionPay {
    this.paymentData.personal_Info.push(info);
    return this;
  }

  /**
   * Sets the client name for the payment.
   * @param name - The client name.
   * @returns The FusionPay instance for method chaining.
   * @example
   * fusionPay.clientName('M. konan');
   */
  clientName(name: string): FusionPay {
    this.paymentData.nomclient = name;
    return this;
  }

  /**
   * Sets the client number for the payment.
   * @param number - The client number.
   * @returns The FusionPay instance for method chaining.
   * @example
   * fusionPay.clientNumber('0574801791');
   */
  clientNumber(number: string): FusionPay {
    this.paymentData.numeroSend = number;
    return this;
  }

  /**
   * Sets the return URL for the payment.
   * @param url - The return URL.
   * @returns The FusionPay instance for method chaining.
   * @example
   * fusionPay.returnUrl('https://mon_lien_de_callback.com');
   */
  returnUrl(url: string): FusionPay {
    this.paymentData.return_url = url;
    return this;
  }

  /**
   * Makes a payment using the configured payment data.
   * @returns A promise that resolves with the payment response.
   * @example
   * fusionPay.makePayment().then(response => { console.log(response); });
   */
  async makePayment(): Promise<AxiosResponse> {
    try {
      const response = await axios.post(this.apiUrl, this.paymentData, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  /**
   * Checks the payment status using a token.
   * @param token - The payment token.
   * @returns A promise that resolves with the payment status.
   * @example
   * fusionPay.checkPaymentStatus('your_payment_token_here').then(status => { console.log(status); });
   */
  async checkPaymentStatus(token: string): Promise<AxiosResponse> {
    const url = `https://www.pay.moneyfusion.net/paiementNotif/${token}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

export default FusionPay;
