export interface CreditDemandRequest {
    user_id: number;
    account_number: string;
    product: string;
    salary: number;
    retenue: number;
    duration: number;
    start_date: Date;
    end_date: Date;
    periodicity: string;
  }  

  export interface CreditDemandResponse {
    id: number;
    user_id: number;
    account_number: string;
    product: string;
    salary: number;
    retenue: number;
    duration: number;
    start_date: Date;
    end_date: Date;
    periodicity: string;
    is_verified: boolean;
    created_at: Date;
  }