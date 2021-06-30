import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin_Nghia',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'Admin_Nghia_1',
    email: 'admin1@gmail.com',
    password: bcrypt.hashSync('admin1', 10),
    isAdmin: true,
  },
  {
    name: 'Admin_Nghia_2',
    email: 'admin2@gmail.com',
    password: bcrypt.hashSync('admin2', 10),
    isAdmin: true,
  },
  {
    name: 'John Dee',
    email: 'johndee@example.com',
    password: bcrypt.hashSync('johndee', 10),
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('johndoe', 10),
  },
  {
    name: 'test_name',
    email: 'test@gmail.com',
    password: bcrypt.hashSync('test', 10),
  },
  {
    name: 'Hoang Nghia',
    email: 'hoangnghia@gmail.com',
    password: bcrypt.hashSync('hoangnghia', 10),
    isAdmin: true,
  },
];

export default users;
