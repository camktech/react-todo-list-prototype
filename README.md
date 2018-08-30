# API Design

## Users
  ### index
    method: GET
    path: /users
    request: {}
    response: 
      success: [{id, name, email}, {id, name, email}]
      error: {message}
  ### show
    method: GET
    path: /users/:d
    request: {}
    response: 
      success: {id, name, email}
      error: {message}
  ### create
    method: POST
    path: /users
    request: {id, name, email}
    response:
      success: {id, name, email}
      error: {message}
  ### update
    method: PATCH
    path: /users/:id
    request: {id, name, email}
    response:
      success: {id, name, email}
      error: {message}
  ### destroy
    method: DELETE
    path: /users/:id
    request: {}
    response:
      success: {message}
      error: {message}



## TaskGroups

******************************************************************************

  Concerning TaskGroups#create & TaskGroups#update: 
  when request include a non-nil :owner_id, 
  the group will be assigned to the given User, 
  else assigned to the current user 

******************************************************************************

  ### index
    method: GET
    path: /task_groups
    request: {}
    response: 
      success: [{id, description, owner_id, user_ids}, {id, description, owner_id, user_ids}]
      error: {message}
  ### show
    method: GET
    path: /task_groups/:d
    request: {}
    response: 
      success: {id, description, owner_id, user_ids}
      error: {message}
  ### create
    method: POST
    path: /task_groups
    request: {description, owner_id = nil, user_ids}
    response:
      success: {id, description, owner_id, user_ids}
      error: {message}
  ### update
    method: PATCH
    path: /task_groups/:id
    request: {description, owner_id = nil, user_ids}
    response:
      success: {id, description, owner_id, user_ids}
      error: {message}
  ### destroy
    method: DELETE
    path: /task_groups/:id
    request: {}
    response:
      success: {message}
      error: {message}



## Tasks

******************************************************************************

  Concerning Tasks#create & Tasks#update: 
  when request include a non-nil :user_id, 
  the task will be assigned to the given User, 
  else assigned to the current user 

******************************************************************************


  ### index
    method: GET
    path: /tasks
    request: {}
    response: 
      success: [
                  {
                    task_group: {
                      task_group_id, task_group_description,
                      task_group_owner, task_group_users,
                      task_group_tasks: [
                        task: {id, description, completed_at, task_group_id, user_id, dependencies}
                      ]
                    }
                  }
                ]
      error: {message}
  ### show
    method: GET
    path: /tasks/:id
    request: {}
    response: 
      success: {id, description, completed_at, task_group_id, user_id, [dependencies]}
      error: {message}
  ### create
    method: POST
    path: /tasks
    request: {description, task_group_id, [dependencies], user_id = nil}
    response:
      success: {id, description, completed_at, task_group_id, user_id, [dependencies]}
      error: {message}
  ### update
    method: PATCH
    path: /tasks/:id
    request: {description, completed_at, [dependencies], task_group_id, user_id = nil}
    response:
      success: {id, description, completed_at, task_group_id, user_id, [dependencies]}
      error: {message}
  ### destroy
    method: DELETE
    path: /tasks/:id
    request: {}
    response:
      success: {message}
      error: {message}

# SQL Design

```sql
CREATE TABLE User (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(255) NOT NULL,
  Email varchar(100) NOT NULL UNIQUE
);

CREATE TABLE TaskGroup (
  Id int NOT NULL AUTO_INCREMENT,
  Description varchar(255) NOT NULL,
  OwnerId int NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (OwnerId) REFERENCES User(Id)
);

CREATE TABLE Task (
  Id int NOT NULL AUTO_INCREMENT,
  Description varchar(255) NOT NULL,
  CompletedAt datetime,
  TaskGroupId int NOT NULL,
  UserId int NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (TaskGroupId) REFERENCES TaskGroup(Id),
  FOREIGN KEY (UserId) REFERENCES User(Id)
);

CREATE TABLE TaskDependency (
  Id int NOT NULL AUTO_INCREMENT,
  TaskId int NOT NULL,
  DependencyId int NOT NULL,
  FOREIGN KEY (TaskId) REFERENCES Task(Id),
  FOREIGN KEY (DependencyId) REFERENCES Task(Id),
  PRIMARY KEY (Id)
);

CREATE TABLE TaskGroupUser (
  Id int NOT NULL AUTO_INCREMENT,
  TaskGroupId int NOT NULL,
  UserId int NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (TaskGroupId) REFERENCES TaskGroup(Id),
  FOREIGN KEY (OwnerId) REFERENCES User(Id)
);
```