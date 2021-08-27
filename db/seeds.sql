INSERT INTO department (name)
VALUES 
('Engineering'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
('Lead Engineer', 120000, 1),
('Lead Sales Associate', 90000, 2),
('Junior Engineer', 80000, 1),
('Junior Sales Associate', 65000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Claude', 'Lobster', 1),
('Kelly', 'Kapowski', 2);