# Peerlist Assignment

Next.js based web app that authenticates user and lists all of it's shots with the help of Dribble API.

## Demo

http://peerlist-assignment-rose.vercel.app/

## Run Locally

Clone the project

```bash
  git clone https://github.com/saurabh-619/peerlist
```

Go to the project directory

```bash
  cd peerlist
```

Install dependencies

```bash
  yarn install
```

Start the app

```bash
  yarn dev
```

## API Reference

#### Register your app and get client_id and client_secret

https://dribbble.com/account/applications/new

#### Get authenticated to get code

```http
  GET https://dribbble.com/oauth/authorize
```

| Parameter   | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `client_id` | `string` | **Required**. Your Client Id |

#### Get access token

```http
  POST https://dribbble.com/oauth/token
```

| Parameter       | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `client_id`     | `string` | **Required**. Your Client Id            |
| `client_secret` | `string` | **Required**. Your Client secret        |
| `code`          | `string` | **Required**. Code after authentication |

#### Get item

```http
  GET https://api.dribbble.com/v2/user/shots
```

| Parameter      | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access token |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_CLIENT_ID`

`DRIBBBLE_CLIENT_ID`

`DRIBBBLE_CLIENT_SECRET`

`TESTING_ACCESS_TOKEN`

## Tech Stack

**Client:** Next.js SSR, TailwindCSS

**Server:** Dribbble API
