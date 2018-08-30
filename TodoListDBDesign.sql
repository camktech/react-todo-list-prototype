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
