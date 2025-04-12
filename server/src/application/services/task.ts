/* 
    Create a new Task
1. Create a new task linked to a workspace and a project
2. Assign the task to one or more users

    Business rules
A task must be linked to a valid workspace
A task must be part of a project
Only members of the workspace can be assigned to the task
*/

/* 
    Get all Tasks by Workspace
1. Return all tasks that belong to a specific workspace
2. Supports filtering by status, priority, and search by title

    Business rules
Only members of the workspace can see tasks
*/

/* 
    Get Task by ID
1. Return the full task details by task ID
2. Populate project, assigned members, and creator

    Business rules
Only members of the workspace can access task details
*/

/* 
    Update Task by ID
1. Update task fields (title, description, status, due date, etc.)

    Business rules
Only members of the workspace can update tasks
*/

/* 
    Delete Task by ID
1. Delete a task permanently from the workspace

    Business rules
Only the user who created the task can delete it
*/

/* 
    Get Tasks by Project ID
1. Return all tasks that are linked to a specific project
2. Useful for project dashboards or Kanban views

    Business rules
Only members of the workspace/project can view the tasks
*/

/* 
    Change Task Status
1. Change the current status of a task (e.g., from TODO to DONE)

    Business rules
Only assigned members or the creator can change the status
*/
