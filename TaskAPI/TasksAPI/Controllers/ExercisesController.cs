/*using Microsoft.AspNetCore.Mvc;

namespace TasksAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController
    {
        private static List<string> stringList = new List<string> { "ana", "vasile", "gheorghe", "maria", "ion" };

        // Method with route parameter
        [HttpGet("{routeParameter}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<string> GetWithRouteParameter(string routeParameter)
        {
            return Ok(routeParameter);
        }

        private ActionResult<string> Ok(string routeParameter)
        {
            return routeParameter;
        }

        // Method with route parameter and query parameters
        [HttpGet("{routeParameter}/sum")]
        public ActionResult<string> GetWithQueryParameters(string routeParameter, double queryParam1, double queryParam2)
        {
            return $"{routeParameter}: {queryParam1 + queryParam2}";
        }

        // Method to receive a list of numbers and return the sum
        [HttpPost("sum")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<double> GetSumOfNumbers(List<double> numbers)
        {
            if (numbers == null || numbers.Count == 0)
                return new BadRequestObjectResult("List of numbers cannot be null or empty.");

            return numbers.Sum();
        }

        // Method to return the static list of strings
        [HttpGet("list")]
        public ActionResult<List<string>> GetStringList()
        {
            return stringList;
        }

        // Method to update the list at a specific index
        [HttpPut("{index}")]
        public ActionResult<List<string>> UpdateList(int index, [FromBody] string newValue)
        {
            if (index < 0 || index >= stringList.Count)
                return new BadRequestObjectResult("Index out of bounds.");

            if (newValue == null)
                return new BadRequestObjectResult("New value cannot be null.");

            stringList[index] = newValue;
            return stringList;
        }

        // Method to delete an element at a given position
        [HttpDelete("{index}")]
        public ActionResult<List<string>> DeleteElement(int index)
        {
            if (index < 0 || index >= stringList.Count)
                return new BadRequestObjectResult("Index out of bounds.");

            stringList.RemoveAt(index);
            return stringList;
        }
    }
}
*/