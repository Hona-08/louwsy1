export enum WalletBalanceType {
  Wallet = 1,
  CreditCard = 2,
  BankTransfer = 3,
  Refund = 4,
}

export enum WalletBalanceStatus {
  Pending = 1,
  Confirmed = 2,
  Cancelled = 3,
}

export enum WalletBalanceAmountType {
  Debit = 'DEBIT',
  Credit = 'CREDIT',
}

export enum WireReceiptStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Cancelled = 'CANCELLED',
}
