# Demo Credit API Docs

Here goes the documentation for this wallet service.

## Running this service
- Clone the repository
```
git clone https://github.com/awesome-urch/demo-credit.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```

- Configure your MySQL server and edit the .env file <br>
Here is the [E-R Diagram](https://dbdesigner.page.link/XzhsNWVH27tgs2BU9)

- Build and run the project
```
npm run build
npm start
```


## Folder Structure

```
/config
  database.js -- loads the knexfile using settings for the current environment
/db
  /migrations
  /seeds
/server
  /controllers -- business logic for handling API endpoints
    base_controller.ts
    auth_controller.ts
    transaction_controller.ts
    transfer_controller.ts
    wallet_controller.ts
  /helpers -- modules for common functions that sit outside controllers/models
  /models  -- collection of all the models
    base.ts
    user.ts
    transaction.ts
    transfer.ts
    wallet.ts
  /routes -- defines API endpoints and passes requests to corresponding controllers
    auth_routes.ts
    transaction_routes.ts
    transfer_routes.ts
    wallet_routes.ts
  start.ts -- the main Express app
knexfile.ts -- defines all database settings for different environments
package.json -- defines scripts for utilities like migrations and seeds
```


## Authentication

Just a faux authentication that returns the user's ID after registration or login. The user ID would then be supplied as a body param to other endpoints of the wallet service.

### Login

#### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin", "password":"password"}' \
  http://localhost:3000/login
```

#### Response

```json
{
  "ok": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@email.com",
    "created_at": "2018-04-03 14:43:02.183277-04",
    "updated_at": "2018-04-03 14:43:02.183277-04"
  }
}
```

### Register

#### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"new-user", "password":"my-password", "email":"my@email.com"}' \
  http://localhost:3000/register
```

#### Response

```json
{
  "ok": true,
  "message": "Registration successful",
  "user": {
    "id": 2,
    "username": "new-user",
    "email": "my@email.com",
    "created_at": "2023-01-01 14:43:02.183277-04",
    "updated_at": "2023-01-01 14:43:02.183277-04"
  }
}
```

### Create Wallet Account

#### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":"1"}' \
  http://localhost:3000/wallet/create
```

#### Response

```json
{
  "ok": true,
  "message": "Wallet created successfully",
  "wallet": {
    "id": 1,
    "user_id": 1,
    "balance": 0,
    "updated_at": "2023-01-17T08:49:16.000Z",
    "created_at": "2023-01-17T08:49:16.000Z"
  }
}
```

### Fund Wallet Account

#### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":"1", "amount":"100"}' \
  http://localhost:3000/wallet/credit
```

#### Response

```json
{
  "ok": true,
  "message": "Wallet credited successfully",
  "transaction": {
    "id": 1,
    "user_id": 1,
    "amount": 100,
    "balance": 100,
    "transaction_type": "credit",
    "transaction_reference": "r6kzbhe2kui",
    "reason": null,
    "updated_at": "2023-01-17T08:54:29.000Z",
    "created_at": "2023-01-17T08:54:29.000Z"
  }
}
```

### Transfer to another User's Wallet Account

#### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"from":"1", "to":"2", "amount":"100"}' \
  http://localhost:3000/wallet/transfer
```

#### Response

```json
{
  "ok": true,
  "message": "Transfer successful",
  "transaction": {
    "id": 1,
    "user_id": 2,
    "amount": 100,
    "balance": 200,
    "transaction_type": null,
    "transaction_reference": "oot13d04o",
    "reason": null,
    "updated_at": "2023-01-16T16:35:29.000Z",
    "created_at": "2023-01-16T16:35:29.000Z"
  }
}
```

### Withdraw from Wallet Account

#### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":"1", "amount":"100"}' \
  http://localhost:3000/wallet/debit
```

#### Response

```json
{
  "ok": true,
  "message": "Wallet debited successfully",
  "transaction": {
    "id": 2,
    "user_id": 1,
    "amount": 100,
    "balance": 0,
    "transaction_type": "debit",
    "transaction_reference": "mdf9evx7m",
    "reason": null,
    "updated_at": "2023-01-17T08:56:32.000Z",
    "created_at": "2023-01-17T08:56:32.000Z"
  }
}
```