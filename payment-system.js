// feat: Implement payment processing system
// BREAKING CHANGE: Payment API endpoints completely redesigned

// OLD API (v1.x) - DEPRECATED
const oldPaymentAPI = {
  processPayment: (amount, cardNumber) => {
    // Simple, insecure payment processing
    return { status: 'processed', amount };
  }
};

// NEW API (v2.x) - CURRENT
const newPaymentAPI = {
  // Secure payment processing with multiple providers
  async processPayment(paymentData) {
    const { amount, provider, method, token } = paymentData;
    
    // Validate payment data
    if (!amount || amount <= 0) {
      throw new Error('Invalid payment amount');
    }
    
    // Process with specific provider
    switch (provider) {
      case 'stripe':
        return await this.processStripePayment(amount, token);
      case 'paypal':
        return await this.processPaypalPayment(amount, token);
      case 'square':
        return await this.processSquarePayment(amount, token);
      default:
        throw new Error('Unsupported payment provider');
    }
  },
  
  async processStripePayment(amount, token) {
    // Stripe integration
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      payment_method: token
    });
    
    return {
      provider: 'stripe',
      status: paymentIntent.status,
      id: paymentIntent.id,
      amount: paymentIntent.amount / 100
    };
  },
  
  async refundPayment(paymentId) {
    // New method for refunds
    const refund = await stripe.refunds.create({
      payment_intent: paymentId
    });
    
    return {
      status: 'refunded',
      amount: refund.amount / 100,
      id: refund.id
    };
  }
};

module.exports = { 
  newPaymentAPI, 
  oldPaymentAPI, // Keep for migration period
  processStripePayment: newPaymentAPI.processStripePayment,
  refundPayment: newPaymentAPI.refundPayment
};
