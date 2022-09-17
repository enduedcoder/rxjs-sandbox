const { Observable } = require('rxjs');
const { map, pluck, filter } = require('rxjs/operators');

const users = {
  data: [
    {
      status: 'active',
      age: 18,
    },
    {
      status: 'inactive',
      age: 15,
    },
    {
      status: 'inactive',
      age: 11,
    },
    {
      status: 'active',
      age: 34,
    },
    {
      status: 'active',
      age: 45,
    },
    {
      status: 'inactive',
      age: 54,
    },
    {
      status: 'active',
      age: 23,
    },
    {
      status: 'inactive',
      age: 32,
    },
  ],
};

const observable = new Observable((subscriber) => {
  subscriber.next(users);
}).pipe(
  // map((value) => {
  //   return value.data;
  // }),

  // pluck('data'),
  map((value) => value?.data), // Use map and optional chaining

  // map((value) => {
  //   return value.filter((user) => user.status === 'active');
  // }),
  filter((users) => users.length > 2),
  map((value) => {
    return (
      value.reduce((sum, user) => sum + user.age, 0) / value.length
    );
  })
);

const observer = {
  next: (value) => {
    console.log('Observer got a value of', value);
  },
  error: (err) => {
    console.log('Observer got an error of ', err);
  },
  complete: () => {
    console.log('Observer got a complete notification');
  },
};

observable.subscribe(observer);
