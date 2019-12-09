using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class CustomerModel
    {
        public int Id { get; set; }
        public Guid CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string TelephoneNumber { get; set; }
        public string MobileNumber { get; set; }
        public bool IsMember { get; set; }
        public int CoMaker { get; set; }
        public int AccountId { get; set; }
    }

    public class CustomerSearchResultModel {
        public int Id { get; set; }
        public Guid CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
