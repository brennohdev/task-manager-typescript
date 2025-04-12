/* 
    Create a new Project
1. Create a project linked to a workspace
2. Assign the creator as createdBy

    Business rules
Only users in the workspace can create a project
The project must belong to a valid workspace
*/

/* 
    List all Projects from a Workspace
1. Return paginated list of all projects in a workspace
2. Populate creator’s data (name, profile picture)
3. Sort projects by creation date (newest first)

    Business rules
Only members of the workspace can access project list
*/

/* 
    Get a Project by ID
1. Return details of a specific project by ID
2. Ensure the project belongs to the workspace

    Business rules
Only members of the workspace can access project data
Throw error if project does not exist or belongs to another workspace
*/

/* 
    Get Project Analytics (Stats)
1. Return stats from tasks in the project: total, completed, overdue
2. Use MongoDB aggregation pipeline for performance

    Business rules
Project must belong to the workspace
Only members can view analytics
*/

/* 
    Update a Project
1. Update project details (name, emoji, description)

    Business rules
Only members of the workspace can update project data
Project must exist and belong to the workspace
*/

/* 
    Delete a Project
1. Delete a project from a workspace
2. Delete all tasks associated with the project

    Business rules
Only the creator can delete a project (if enforced)
Project must exist and belong to the workspace
Delete operation must clean up associated tasks
*/
