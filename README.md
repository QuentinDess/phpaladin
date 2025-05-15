# phpaladin

> A GitHub App built with [Probot](https://github.com/probot/probot) that A fantasy-themed GitHub Probot that reviews pull requests for PHP code quality. PHPaladin is your valiant code guardian — it automatically checks pull requests for compliance with tools like PHPStan, PHP CS Fixer, Deptrac, PHP MD, and your custom ruleset. With the spirit of a paladin and the precision of a linter, it ensures every PR upholds the sacred laws of clean, maintainable PHP.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t phpaladin .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> phpaladin
```

## Contributing

If you have suggestions for how phpaladin could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2025 QuentinDess
