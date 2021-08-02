import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Nghia',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'Nghia_1',
    email: 'admin1@gmail.com',
    password: bcrypt.hashSync('admin1', 10),
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('john', 10),
  },
  {
    name: 'Jane',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('jane', 10),
  },
  {
    name: 'hoang nghia',
    email: 'hoangnghia@gmail.com',
    password: bcrypt.hashSync('hoangnghia', 10),
  },
  {
    name: 'test_name',
    email: 'test@gmail.com',
    password: bcrypt.hashSync('test', 10),
  },
];

export default users;
