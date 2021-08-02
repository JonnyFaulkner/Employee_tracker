INSERT INTO department(name)
VALUES
    ('Legal'),
    ('Sales'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Legal Lead', '150000', '1'),
    ('Sales Lead', '150000', '2'),
    ('Engineering Lead', '150000', '3'),
    ('Lawyer', '100000', '1'),
    ('Salesperson', '80000', '2'),
    ('Engineer', '100000', '3');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Mandello', '1', null),
    ('Sara', 'Longino', '2', null),
    ('Robert', 'Loss', '3', null),
    ('Tommy', 'Karrera', '4', '1'),
    ('Kim', 'Sanders', '5', '2'),
    ('Mary', 'Sanders', '6', '3');