# myWallet API

## To run it locally, follow the steps:

1. Clone this repository
2. Install packages
```bash
npm i
```
3. With mongodb installed and running, create and configure a `.env` file using `.env.example` file.
4. Run server locally
```bash
npm run dev
```

## Api Documentation

### Authentication

### `POST /sign-up`
- register an user
- requires a body in the format:
```js
{
  name: "Naruto",
  email: "naruto@uzumaki.com",
  password: "sasukeee"
}
```

### `POST /sign-in`
- login with given credentials
- requires a body in the format:
```js
{
  email: "naruto@uzumaki.com",
  password: "sasukeee"
}
```

#### Expenses
### `POST /expenses`
- insert an expense
- protected route 
- requires a header containing `{Authorization: Bearer TOKEN}`
- requires a body in the format:
```js
{
  description: "Pet Shop",
  value: 50
}
```

#### Incomes
### `POST /incomes`
- insert an income
- protected route
- requires a header containing `{Authorization: Bearer TOKEN}`
- requires a body in the format:
```js
{
  description: "Salary",
  value: 1200
}
```

### Revenue
### `GET /revenue`
- get user revenue
- protected route
- requires a header containing `{Authorization: Bearer TOKEN}`
- returns an array in the format: 
```js
userRevenue: [
    {
      _id: "63ea1eca3ce0f5c696e6990a",
      userId: "63ea1cdeb6426234006e123e",
      description: "salário",
      value: 1200,
      type: "income",
      date: "13/02"
    },
    {
      _id: "63ea1ed73ce0f5c696e6990b",
      userId: "63ea1cdeb6426234006e123e",
      description: "mercado",
      value: 230,
      type: "expense",
      date: "13/02"
    },
    ...
]
```
### `DELETE /revenue/:id`
- delete given revenue
- protected route
- requires a header containing `{Authorization: Bearer TOKEN}`
