const router = require('express').Router();
const inquirer = require('inquirer');
const { get } = require('./routes/apiRoutes/index');
const routes = require('./routes/apiRoutes/index');
const axios = require('axios');
const { text } = require('body-parser');

router.use('/api', routes);

function Manager() {
    console.log('Welcome to Employee Manager!');

    const userPrompt = () => {
        inquirer
            .prompt(
                {
                    type: 'list',
                    name: 'user_options',
                    message: 'What would you like to do?',
                    choices: [
                        'See all employees.',
                        'Add employee.',
                        'Remove employee.',
                        'Update employee role.'
                    ]
                }
            )
            .then(({ user_options }) => {
                if (user_options === 'See all employees.') {
                    const url = 'http://localhost:3001/api/employees'
                    axios.get(url)
                        .then(data => {
                            console.table(data.data.data);
                            userPrompt();
                        })
                        .catch(err => console.log(err))
                } else if (user_options === 'Add employee.') {
                    inquirer.prompt([
                        {
                            type: 'text',
                            name: 'first_name',
                            message: 'What is the employees first name',
                            validate: firstName => {
                                if (firstName) {
                                    return true;
                                } else {
                                    console.log('Please enter employees first name');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'text',
                            name: 'last_name',
                            message: 'What is the employees last name',
                            validate: lastName => {
                                if (lastName) {
                                    return true;
                                } else {
                                    console.log('Please enter employees last name');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: 'What is the employees role id',
                            choices: [
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6'
                            ],
                        },
                        {
                            type: 'boolean',
                            name: 'manager_id',
                            message: 'What is their managers id if none leave blank'
                        }
                    ])
                        .then(data => {
                            const url = 'http://localhost:3001/api/employee'
                            console.log(data.role)
                            axios.post(url, {
                                first_name: data.first_name,
                                last_name: data.last_name,
                                role_id: data.role_id,
                                manager_id: data.manager_id
                            })
                                .then(response => {
                                    console.log(response.data);
                                    userPrompt();
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                } else if (user_options === 'Remove employee.') {
                    inquirer.prompt(
                        {
                            type: 'boolean',
                            name: 'employee_id',
                            message: 'What is the employees id number?',
                            validate: employeeId => {
                                if (employeeId) {
                                    return true;
                                } else {
                                    console.log('Please enter employees ID number');
                                    return false;
                                }
                            }
                        }
                    ).then(data => {
                        const url = 'http://localhost:3001/api/employee/' + data.employee_id;

                        axios.delete(url)
                            .then(response => {
                                console.log(response.data);
                                userPrompt();
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                } else if (user_options === 'Update employee role.') {
                    inquirer.prompt([
                        {
                            type: 'boolean',
                            name: 'employee_id',
                            message: 'What is the employees ID number',
                            validate: employeeId => {
                                if (employeeId) {
                                    return true;
                                } else {
                                    console.log('Please enter employees ID number');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'boolean',
                            name: 'role_id',
                            message: 'What is the employees new role ID number?',
                            validate: roleId => {
                                if (roleId) {
                                    return true;
                                } else {
                                    console.log('Please enter employees new role ID number');
                                    return false;
                                }
                            }
                        }
                    ])
                        .then(data => {
                            const url = 'http://localhost:3001/api/employee/' + data.employee_id;
                            const role = [data.role_id]

                            axios.put(url, role)
                                .then(response => {
                                    console.log(response.data);
                                    userPrompt()
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                }
            })
    }
    userPrompt()
}

Manager()

module.exports = router;