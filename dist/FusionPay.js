"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionPay = void 0;
/**
 * FusionPay class for handling payment operations with MoneyFusion payment gateway.
 * @template T Type of custom data to be stored in personal_Info
 */
class FusionPay {
    /**
     * Initializes a new instance of the FusionPay class.
     * @param apiUrl - The API URL for payment processing.
     */
    constructor(apiUrl) {
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
    totalPrice(amount) {
        this.paymentData.totalPrice = amount;
        return this;
    }
    /**
     * Adds an article to the payment data.
     * @param name - The name of the article.
     * @param value - The price of the article.
     */
    addArticle(name, value) {
        this.paymentData.article.push({ [name]: value });
        return this;
    }
    /**
     * Adds custom data to personal_Info that will be returned after payment processing.
     * @param data - Custom data object to store with the payment
     */
    addInfo(data) {
        this.paymentData.personal_Info.push(data);
        return this;
    }
    /**
     * Sets the client name for the payment.
     * @param name - The client name.
     */
    clientName(name) {
        this.paymentData.nomclient = name;
        return this;
    }
    /**
     * Sets the client number for the payment.
     * @param number - The client phone number.
     */
    clientNumber(number) {
        this.paymentData.numeroSend = number;
        return this;
    }
    /**
     * Sets the return URL for the payment callback.
     * @param url - The return URL where payment token will be appended.
     */
    returnUrl(url) {
        this.paymentData.return_url = url;
        return this;
    }
    /**
     * Adds a webhook URL for payment notifications.
     * @param url - The webhook URL to receive payment notifications.
     */
    webhookUrl(url) {
        this.paymentData.webhook_url = url;
        return this;
    }
    /**
     * Makes a payment using the configured payment data.
     * @returns A promise that resolves with the payment response.
     * @throws Error if the payment request fails.
     */
    async makePayment() {
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
        }
        catch (error) {
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
    async checkPaymentStatus(token) {
        const url = `https://www.pay.moneyfusion.net/paiementNotif/${token}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(await response.text());
            }
            return await response.json();
        }
        catch (error) {
            throw error instanceof Error
                ? error
                : new Error("An unknown error occurred while checking payment status");
        }
    }
}
exports.FusionPay = FusionPay;
