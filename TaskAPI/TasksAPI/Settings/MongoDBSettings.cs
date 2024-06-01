namespace TasksAPI.Settings
{
    public class MongoDBSettings : IMongoDBSettings
    {
        public string TasksCollectionName
        {
            get
            {
                return "Tasks";
            }
            set
            {

            }
        }
        public string ConnectionString
        {
            get
            {
                return "mongodb://localhost:27017";
            }
            set
            {
                
            }
        }
        public string DatabaseName
        {
            get
            {
                return "tasksManagement";
            }
            set
            {

            }
        }
    }
}
