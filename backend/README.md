# CleverKit Backend

CleverKit is an open-source project built to showcase [Pocketbase](https://pocketbase.io/), a cloud database built for modern applications. It is a simple app that allows users to create and view notes.

## Useful Resources

- [pocketbase docs](https://pocketbase.io/docs/)
- [fly.io docs](https://fly.io/docs/)
- [Hosting pocketbase on fly.io](https://fly.io/docs/app-guides/pocketbase/)

## How to Run Locally

To run the backend server locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the dependencies by running `pnpm install`.
3. Start the backend server by running `go run main.go serve --http=127.0.0.1:8080`.

## How to Deploy to fly.io

To deploy the backend server to [fly.io](https://fly.io/), follow these steps:

1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl).
2. Initiate the fly app by running `flyctl launch`.
3. Create a free storage volume by running `flyctl volumes create pb_data --size=1`.
4. Deploy the backend server by running `flyctl deploy`.

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).