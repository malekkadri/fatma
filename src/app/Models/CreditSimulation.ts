export interface CreditSimulationRequest {
    user_id: number;
    account_number: string;
    product: string;
    amount: number;
    periodicity: string;
    duration: number;
    interest_rate: number;
    first_due_date: Date;
  }
  
  export interface CreditSimulationResponse {
    requested_amount: number;
    installment_amount: number;
    start_date: string;
    end_date: string;
    message: string;
    interest_rate : number;
  }
  