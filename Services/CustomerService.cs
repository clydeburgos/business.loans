using Dapper;
using Models;
using Models.Configs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CustomerService : ICustomerService
    {
        private readonly SqlConfig sqlConfig;
        public CustomerService(SqlConfig sqlConfig) {
            this.sqlConfig = sqlConfig;
        }

        public async Task<CustomerModel> GetCustomer(int id) {
            string query = $"SELECT * FROM Customer WHERE Id = { id }";
            using (var connection = new SqlConnection(sqlConfig.LoanAppConnection))
            {
                var customer = await connection.QueryFirstOrDefaultAsync<CustomerModel>(query);
                return customer;
            }
        }

        public async Task<IEnumerable<CustomerSearchResultModel>> SearchCustomer(string keyword) {
            string query = $@"SELECT * FROM Customer
              WHERE FirstName LIKE '%{keyword}%' OR LastName LIKE '%{keyword}%' OR 
              City LIKE '%{keyword}%' OR PostalCode LIKE '%{keyword}%'";
            using (var connection = new SqlConnection(sqlConfig.LoanAppConnection))
            {
                var customer = await connection.QueryAsync<CustomerSearchResultModel>(query);
                return customer;
            }
        }

        public async Task<IEnumerable<CustomerModel>> GetCustomers()
        {
            string query = $"SELECT * FROM Customer WHERE AccountId = 1";
            using (var connection = new SqlConnection(sqlConfig.LoanAppConnection))
            {
                var customers = await connection.QueryAsync<CustomerModel>(query);
                return customers;
            }
        }
        public async Task<int> SaveCustomer(CustomerModel customerModel) {
            var customer = await GetCustomer(customerModel.Id);
            if (customer == null)
            {
                string query = @"INSERT INTO Customer (CustomerId, FirstName, LastName, 
                    StreetAddress, City, PostalCode, TelephoneNumber, MobileNumber, IsMember, CoMaker, AccountId) VALUES 
                    (@CustomerId, @FirstName, @LastName, @StreetAddress, @City, @PostalCode, @TelephoneNumber, @MobileNumber, @IsMember,
                    @CoMaker, @AccountId)";
                using (var connection = new SqlConnection(sqlConfig.LoanAppConnection))
                {
                        var custParams = new DynamicParameters();
                        custParams.Add("CustomerId", customerModel.CustomerId);
                        custParams.Add("FirstName", customerModel.FirstName);
                        custParams.Add("LastName", customerModel.LastName);
                        custParams.Add("StreetAddress", customerModel.StreetAddress);
                        custParams.Add("City", customerModel.City);
                        custParams.Add("PostalCode", customerModel.PostalCode);
                        custParams.Add("TelephoneNumber", customerModel.TelephoneNumber);
                        custParams.Add("MobileNumber", customerModel.MobileNumber);
                        custParams.Add("IsMember", customerModel.IsMember);
                        custParams.Add("CoMaker", customerModel.CoMaker);
                        custParams.Add("AccountId", 1);

                    int result = await connection.ExecuteAsync(query, custParams, null, null, CommandType.Text);
                    return result;
                }
            }
            else 
            {
                return await UpdateCustomer(customerModel);
            }
        }
        public async Task<int> UpdateCustomer(CustomerModel customerModel) {
            string query = @"UPDATE Customer SET FirstName = @FirstName, LastName = @LastName, 
                    StreetAddress = @StreetAddress, City = @City, PostalCode = @PostalCode, 
                    TelephoneNumber = @TelephoneNumber, MobileNumber = @MobileNumber = @IsMember, IsMember = @IsMember, 
                    CoMaker =  @CoMaker, AccountId = @AccountId)";

            using (var connection = new SqlConnection(sqlConfig.LoanAppConnection))
            {
                var custParams = new DynamicParameters();
                custParams.Add("CustomerId", customerModel.CustomerId);
                custParams.Add("FirstName", customerModel.FirstName);
                custParams.Add("LastName", customerModel.LastName);
                custParams.Add("StreetAddress", customerModel.StreetAddress);
                custParams.Add("City", customerModel.City);
                custParams.Add("PostalCode", customerModel.PostalCode);
                custParams.Add("TelephoneNumber", customerModel.TelephoneNumber);
                custParams.Add("MobileNumber", customerModel.MobileNumber);
                custParams.Add("IsMember", customerModel.IsMember);
                custParams.Add("CoMaker", customerModel.CoMaker);
                custParams.Add("AccountId", 1);

                int result = await connection.ExecuteAsync(query, custParams, null, null, CommandType.Text);
                return result;
            }
        }
        public async Task<bool> DeleteCustomer(int id) {
            string query = $"DELETE FROM Customer WHERE id = {id}";
            using (var connection = new SqlConnection(sqlConfig.LoanAppConnection))
            {
                int result = await connection.ExecuteAsync(query, null, null, null, CommandType.Text);
                return result > 0;
            }
        }
    }
}
