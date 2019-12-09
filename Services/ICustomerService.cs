using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface ICustomerService
    {
        Task<CustomerModel> GetCustomer(int id);
        Task<IEnumerable<CustomerModel>> GetCustomers();
        Task<IEnumerable<CustomerSearchResultModel>> SearchCustomer(string keyword);
        Task<int> SaveCustomer(CustomerModel customerModel);
        Task<int> UpdateCustomer(CustomerModel customerModel);
        Task<bool> DeleteCustomer(int id);
    }
}
