using Microsoft.AspNetCore.Mvc;
using TasksAPI.Services;
using TaskModel = TasksAPI.Models.TaskModel;

namespace TasksAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        // In-memory storage for tasks

        private readonly ITaskCollectionService _taskCollectionService;

        public TaskController(ITaskCollectionService taskCollectionService)
        {
            _taskCollectionService = taskCollectionService ?? throw new ArgumentNullException(nameof(TaskCollectionService));
        }


        // A GET request to the /task endpoint returns all tasks
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            List<TaskModel> tasks = await _taskCollectionService.GetAll();
            return Ok(tasks);
        }

        // A GET request to the /task/{id} endpoint returns a task
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTask(Guid id)
        {
            // Check if the task exists
            var task = await _taskCollectionService.Get(id);

            // If the task does not exist, return a 404 Not Found response
            if (task == null)
                return NotFound("Task not found.");

            return Ok(task);
        }

        // A POST request to the /task endpoint creates a new task
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateTask([FromBody] TaskModel task)
        {
            // Check if the task is null
            if (task == null)
                return BadRequest("Task cannot be null.");

            // Check if the task fields are null or empty
            if (string.IsNullOrEmpty(task.Title) || string.IsNullOrEmpty(task.Description) || string.IsNullOrEmpty(task.AssignedTo) || string.IsNullOrEmpty(task.Status))
                return BadRequest("Task fields cannot be null or empty.");

            await _taskCollectionService.Create(task);

            return Ok();
        }

        // A PUT request to the /task/{id} endpoint updates a task
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] TaskModel updatedTask)
        {
            // Check if the task from the body is null
            if (updatedTask == null)
                return BadRequest("Task cannot be null.");

            // Check if the task fields are null or empty
            if (string.IsNullOrEmpty(updatedTask.Title) || string.IsNullOrEmpty(updatedTask.Description) || string.IsNullOrEmpty(updatedTask.AssignedTo) || string.IsNullOrEmpty(updatedTask.Status))
                return BadRequest("Task fields cannot be null or empty.");

            // Check if the task exists
            var task = await _taskCollectionService.Get(id);

            // If the task does not exist, return a 404 Not Found response
            if (task == null)
                return NotFound("Task not found.");

            task.Id = id;
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.AssignedTo = updatedTask.AssignedTo;
            task.Status = updatedTask.Status;

            await _taskCollectionService.Update(id, task);

            return Ok();
        }

        // A DELETE request to the /task/{id} endpoint deletes a task
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            // Check if the task exists
            var task = _taskCollectionService.Get(id);

            // If the task does not exist, return a 404 Not Found response
            if (task == null)
                return NotFound("Task not found.");

            await _taskCollectionService.Delete(id);

            return Ok();
        }
    }
}
