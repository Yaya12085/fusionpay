/**
 * FusionPay class for handling payment operations.
 */
declare class FusionPay {
    private apiUrl;
    private headers;
    private paymentData;
    /**
     * Initializes a new instance of the FusionPay class.
     * @param apiUrl - The API URL for payment.
     */
    constructor(apiUrl: string);
    /**
     * Sets the total price for the payment.
     * @param amount - The total price amount.
     * @returns The FusionPay instance for method chaining.
     * @example
     * fusionPay.totalPrice(200);
     */
    totalPrice(amount: number): FusionPay;
    /**
     * Adds an article to the payment data.
     * @param name - The name of the article.
     * @param value - The price of the article.
     * @returns The FusionPay instance for method chaining.
     * @example
     * fusionPay.addArticle('sac', 100);
     */
    addArticle(name: string, value: number): FusionPay;
    /**
     * Adds personal info to the payment data.
     * @param info - The personal info object.
     * @returns The FusionPay instance for method chaining.
     * @example
     * fusionPay.addInfo({ userId: '1245d858sf8f95f9ff', token: 'dffqsyyyysfs56556sjsjh' });
     */
    addInfo(info: Record<string, string>): FusionPay;
    /**
     * Sets the client name for the payment.
     * @param name - The client name.
     * @returns The FusionPay instance for method chaining.
     * @example
     * fusionPay.clientName('M. Yaya Mohamed');
     */
    clientName(name: string): FusionPay;
    /**
     * Sets the client number for the payment.
     * @param number - The client number.
     * @returns The FusionPay instance for method chaining.
     * @example
     * fusionPay.clientNumber('0574801791');
     */
    clientNumber(number: string): FusionPay;
    /**
     * Sets the return URL for the payment.
     * @param url - The return URL.
     * @returns The FusionPay instance for method chaining.
     * @example
     * fusionPay.returnUrl('https://mon_lien_de_callback.com');
     */
    returnUrl(url: string): FusionPay;
    /**
     * Makes a payment using the configured payment data.
     * @returns A promise that resolves with the payment response.
     * @example
     * fusionPay.makePayment().then(response => { console.log(response); });
     */
    makePayment(): Promise<any>;
    /**
     * Checks the payment status using a token.
     * @param token - The payment token.
     * @returns A promise that resolves with the payment status.
     * @example
     * fusionPay.checkPaymentStatus('your_payment_token_here').then(status => { console.log(status); });
     */
    checkPaymentStatus(token: string): Promise<any>;
}
export default FusionPay;
