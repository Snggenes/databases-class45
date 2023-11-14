const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
});
connection.connect();

connection.query("create database if not exists meetup", (error, result) => {
  if (error) throw error;
  console.log(result);
});

connection.query("use meetup", (error, result) => {
  if (error) throw error;
  console.log(result);
});

connection.query(
  `
    create table Invitee(
        invitee_no int auto_increment primary key,
        invitee_name text,
        invited_by text
    )
`,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  `
      create table Room(
          room_no int auto_increment primary key,
          room_name text,
          floor_number int
      )
  `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  `
        create table Meeting(
            meeting_no int auto_increment primary key,
            meeting_title text,
            starting_time text,
            ending_time text,
            room_no int,
            foreign key (room_no) references Room(room_no)
        )
    `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  `
      INSERT INTO Invitee (invitee_name, invited_by)
      VALUES
      ('Sven', 'Sofia'),
      ('Eva', 'Erik'),
      ('Lars', 'Emma'),
      ('Anna', 'Gustav'),
      ('Johan', 'Isabella')
    `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  `
      INSERT INTO Room (room_name, floor_number)
      VALUES
      ('Room A', 1),
      ('Room B', 2),
      ('Room C', 1),
      ('Room D', 1),
      ('Room E', 2)
    `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

connection.query(
  `
      INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
      VALUES
      ('Project A', '19-11-1997 10:00:00', '19-11-1997 11:00:00', 1),
      ('Project B', '20-11-1997 10:00:00', '20-11-1997 11:00:00', 2),
      ('Project C', '21-11-1997 10:00:00', '21-11-1997 11:00:00', 3),
      ('Project D', '22-11-1997 10:00:00', '22-11-1997 11:00:00', 4),
      ('Project E', '23-11-1997 10:00:00', '23-11-1997 11:00:00', 5)
    `,
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);

connection.end();
