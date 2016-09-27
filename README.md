# foundry-release-slack-notify

Sends message to a slack channel on publish.

## Install

```bash
npm i foundry-release-slack-notify --save-dev
```

## Usage

In your `package.json`:

```json

...

"foundry": {
    "releaseCommands": [
        ...
        {
            "type": "releaseCommand",
            "command": "foundry-release-slack-notify",
            "options": {
              "channel": "#channel-name",
              "webhook": "https://hooks.slack.com/services/FOO/BAR/BAZ",
              "text": "<!here> {{npm.package.name}}@{{npm.package.version}} released."
            }
        },
        ...
    ]
}
...
```

Where `options.text` is a nunjucks template string where the entire `package.json` of your project is available.

Without `options`, it defaults to :

```
{
    webhook: 'https://hooks.slack.com/TXXXXX/BXXXXX/XXXXXXXXXX',
    channel: '#releases',
    icon_url: null,
    text: '{{npm.package.name}}@{{npm.package.version}} released',
    username: 'release-bot'
}
```
