DROP DATABASE IF EXISTS oneTeam;

CREATE DATABASE oneTeam;
USE oneTeam;

CREATE TABLE users (
  -- 'name' is equivalent to username
  -- not renamed to username in order to avoid breaking legacy code
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL UNIQUE KEY,
  firstName varchar(255),
  lastName varchar(255),
  hashedPassword varchar(255),
  salt varchar(255),
  owner BOOLEAN NOT NULL -- 1 if user is a teacher, 0 if user is a student
);

CREATE TABLE videos (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  videoId varchar(255) NOT NULL UNIQUE KEY,
  title varchar(255) NOT NULL,
  description varchar(255),
  image varchar(255),
  userId INT(11) NOT NULL,
  duration INT(11),
  videoDescription varchar(255),
  series varchar(255),
  idxInSeries INT(11),

  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE studentComments (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  videoId INT(11) NOT NULL,
  timeStamp INT(11) NOT NULL,
  userId INT(11) NOT NULL,
  comment varchar(255),
  addressedByTeacher BOOLEAN NOT NULL DEFAULT 0,
  commentType varchar(255),

  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (videoId) REFERENCES videos(id)
);

CREATE TABLE teacherComments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  comment varchar(255),
  videoId INT(11) NOT NULL,
  userId INT(11) NOT NULL,
  begRange INT(11), -- Beginning timestamp of the video addressed by comment
  endRange INT(11), -- Ending timestamp of the video addressed by comment
  commentType varchar(255),

  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (videoId) REFERENCES videos(id)
);

INSERT IGNORE INTO users (name, owner) VALUES ('jun yoo', true);
INSERT IGNORE INTO users (name, firstName, lastName, hashedPassword, salt, owner) VALUES ('tom', 'Tom', 'Wagner', '123', '456', true);
INSERT IGNORE INTO users (name, firstName, lastName, hashedPassword, salt, owner) VALUES ('amy', 'Amy', 'San Felipe', '123', '456', true);
INSERT IGNORE INTO users (name, firstName, lastName, hashedPassword, salt, owner) VALUES ('ian', 'Ian', 'Pradhan', '123', '456', false);
INSERT IGNORE INTO users (name, firstName, lastName, hashedPassword, salt, owner) VALUES ('wei', 'Wei', 'Gao', '123', '456', false);

INSERT IGNORE INTO videos (videoId, title, userId, description, image, duration) VALUES ('ZK3O402wf1c', 'Lec 1 | MIT 18.06 Linear Algebra, Spring 2005', 1, 'Lecture 1: The Geometry of Linear Equations. View …e information at http://ocw.mit.edu/terms More...', 'https://i.ytimg.com/vi/ZK3O402wf1c/default.jpg', 2389);

INSERT INTO studentComments (videoId, userId, timeStamp, comment) VALUES (1, 4, 132, 'hello so confused!!');
INSERT INTO teacherComments (videoId, userId, begRange, endRange, comment) VALUES (1, 2, 110, 132, "I'm sorry you're confused!");