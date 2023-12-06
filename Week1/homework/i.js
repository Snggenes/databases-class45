const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
});
connection.connect();

function executeQuery(query) {
  connection.query(query, (error, result) => {
    if (error) {
      console.error(`Error: ${query}`);
      throw error;
    }
    console.log(result);
  });
}

const query1 = "create database if not exists meetup";
const query2 = "use meetup";
const query3 = `
create table if not exists Invitee(
    invitee_no int auto_increment primary key,
    invitee_name text,
    invited_by int,
    foreign key (invited_by) references Invitee(invitee_no)
)
`;
const query4 = `
create table if not exists Room(
    room_no int auto_increment primary key,
    room_name text,
    floor_number int
)
`;
const query5 = `
create table if not exists Meeting(
    meeting_no int auto_increment primary key,
    meeting_title text,
    starting_time text,
    ending_time text,
    room_no int,
    foreign key (room_no) references Room(room_no)
)
`;
const query6 = `
INSERT INTO Invitee (invitee_name, invited_by)
VALUES
('Sven', NULL), -- Assuming Sven is not invited by anyone
('Eva', 1),     -- Assuming Eva is invited by invitee_no 1
('Lars', 2),     -- Assuming Lars is invited by invitee_no 2
('Anna', 3),     -- Assuming Anna is invited by invitee_no 3
('Johan', 4)     -- Assuming Johan is invited by invitee_no 4
`;
const query7 = `
INSERT INTO Room (room_name, floor_number)
VALUES
('Room A', 1),
('Room B', 2),
('Room C', 1),
('Room D', 1),
('Room E', 2)
`;
const query8 = `
INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
VALUES
('Project A', '19-11-1997 10:00:00', '19-11-1997 11:00:00', 1),
('Project B', '20-11-1997 10:00:00', '20-11-1997 11:00:00', 2),
('Project C', '21-11-1997 10:00:00', '21-11-1997 11:00:00', 3),
('Project D', '22-11-1997 10:00:00', '22-11-1997 11:00:00', 4),
('Project E', '23-11-1997 10:00:00', '23-11-1997 11:00:00', 5)
`;

executeQuery(query1);
executeQuery(query2);
executeQuery(query3);
executeQuery(query4);
executeQuery(query5);
executeQuery(query6);
executeQuery(query7);
executeQuery(query8);

connection.end();
