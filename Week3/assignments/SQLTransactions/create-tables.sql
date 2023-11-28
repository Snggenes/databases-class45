--create tables

CREATE TABLE account (
    account_number int  NOT NULL ,
    balance int  NOT NULL ,
    PRIMARY KEY (
        account_number
    )
);

CREATE TABLE account_changes (
    change_number int  NOT NULL ,
    account_number int  NOT NULL ,
    amount int  NOT NULL ,
    changed_date varchar(255)  NOT NULL ,
    remark text  NOT NULL ,
    PRIMARY KEY (
        change_number
    )
);

ALTER TABLE account_changes ADD CONSTRAINT fk_account_changes_account_number FOREIGN KEY(account_number)
REFERENCES account (account_number);


--insert values

INSERT INTO account (account_number, balance)
VALUES
  (101, 2000),
  (102, 2500),
  (103, 3000),
  (104, 3500),
  (105, 4000);



START TRANSACTION;

UPDATE account
SET balance = balance - 1000
WHERE account_number = 101;

UPDATE account
SET balance = balance + 1000
WHERE account_number = 102;

INSERT INTO account_changes (change_number, account_number, amount, changed_date, remark)
VALUES
  (1, 101, -1000, '2023-11-27', 'to account 102'),
  (2, 102, 1000, '2023-11-27', 'from account 101');

COMMIT;
