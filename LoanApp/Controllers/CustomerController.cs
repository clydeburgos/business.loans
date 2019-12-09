using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace LoanApp.Controllers
{
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService customerService;
        public CustomerController(ICustomerService customerService) {
            this.customerService = customerService;
        }

        [Route("customer/get/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetCustomer(int id) {
            var data = await customerService.GetCustomer(id);
            return Ok(data);
        }

        [Route("customer/getall")]
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            var data = await customerService.GetCustomers();
            return Ok(data);
        }

        [Route("customer/search/{keyword}")]
        [HttpGet]
        public async Task<IActionResult> SearchCustomers(string keyword)
        {
            var data = await customerService.SearchCustomer(keyword);
            return Ok(data);
        }

        [Route("customer/save")]
        [HttpPost]
        public async Task<IActionResult> SaveCustomer([FromBody]CustomerModel model)
        {
            if (ModelState.IsValid)
            {
                model.CustomerId = Guid.NewGuid();
                var data = await customerService.SaveCustomer(model);
                return Ok(data);
            }
            else {
                return BadRequest(ModelState);
            }
        }

        [Route("customer/delete/{id}")]
        [HttpPost]
        public async Task<IActionResult> SaveCustomer(int id)
        {
            var data = await customerService.DeleteCustomer(id);
            return Ok(data);
        }
    }
}