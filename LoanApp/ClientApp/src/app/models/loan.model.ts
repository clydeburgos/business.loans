import { ScheduleType } from "./schedule.model";

export class Loan {
    public Id: number = 0;
    public CustomerId: number = 0;
    public LoanNumber: string;
    public Amount: number = 0;
    public TransactionDate: string;
    public EstimatedDueDate: string;
    public Interest: number = 10;
    public AccountId: number = 0;
    public ScheduleType: ScheduleType
}
