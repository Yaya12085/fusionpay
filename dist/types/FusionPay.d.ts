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
    statut: "pending" | "paid" | "failed" | "no paid";
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
export declare class FusionPay<T = CustomPaymentData> {
    private apiUrl;
    private readonly headers;
    private paymentData;
    /**
     * Initializes a new instance of the FusionPay class.
     * @param apiUrl - The API URL for payment processing.
     */
    constructor(apiUrl: string);
    /**
     * Sets the total price for the payment.
     * @param amount - The total price amount.
     */
    totalPrice(amount: number): this;
    /**
     * Adds an article to the payment data.
     * @param name - The name of the article.
     * @param value - The price of the article.
     */
    addArticle(name: string, value: number): this;
    /**
     * Adds custom data to personal_Info that will be returned after payment processing.
     * @param data - Custom data object to store with the payment
     */
    addInfo(data: T): this;
    /**
     * Sets the client name for the payment.
     * @param name - The client name.
     */
    clientName(name: string): this;
    /**
     * Sets the client number for the payment.
     * @param number - The client phone number.
     */
    clientNumber(number: string): this;
    /**
     * Sets the return URL for the payment callback.
     * @param url - The return URL where payment token will be appended.
     */
    returnUrl(url: string): this;
    /**
     * Adds a webhook URL for payment notifications.
     * @param url - The webhook URL to receive payment notifications.
     */
    webhookUrl(url: string): this;
    /**
     * Makes a payment using the configured payment data.
     * @returns A promise that resolves with the payment response.
     * @throws Error if the payment request fails.
     */
    makePayment(): Promise<PaymentResponse>;
    /**
     * Checks the payment status using a token.
     * @param token - The payment token received as URL query parameter.
     * @returns A promise that resolves with the payment verification response.
     * @throws Error if the status check fails.
     */
    checkPaymentStatus(token: string): Promise<PaymentVerificationResponse<T>>;
}
