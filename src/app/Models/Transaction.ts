export interface Transaction {
    sourceAccount: string;
    currency: string;
    targetAccount: string;
    amount: number;
    paymentReason: string;
    executionDate: string;
  }