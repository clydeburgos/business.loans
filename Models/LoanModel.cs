using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class LoanModel
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string LoanNumber { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate  { get; set; }
        public DateTime EstimatedDueDate { get; set; }
        public decimal Interest { get; set; }
        public int AccountId { get; set; }
        public int ScheduleType  { get; set; }
    }
}
     