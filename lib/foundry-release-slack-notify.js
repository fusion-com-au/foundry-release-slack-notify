var SemVer = require('semver').SemVer,
    Exec = require('child_process').execFileSync,
    Config = require('nconf'),
    Merge = require('deep-extend'),
    Nunjucks = require('nunjucks'),
    Request = require('request'),
    Pkg = require('../package.json');

var debug = require('debug')(Pkg.name);

var context = Config.env({
            separator: '_',
            match: /^(npm_package|FOUNDRY).*/
        }).get();

var commands = Config.env({
            separator: '_',
            match: /^npm_package_foundry.*/
        })
        .get('npm:package:foundry:releaseCommands'),

    index = Object.keys(commands)
        .find( function (index) {
            var item = commands[index]
            return (typeof item === 'string' && item === Pkg.name)
                || item.command === Pkg.name;
        }),

    options = Merge({
        webhook: 'https://hooks.slack.com/services/{{FOUNDRY.SLACK.ENDPOINT}}',
        channel: '#releases',
        icon_url: null,
        text: '{{npm.package.name}}@{{FOUNDRY.VERSION}} released',
        username: 'release-bot'
    }, (index && commands[index].options || {}));


exports.publish = function (params, cb) {
    var err;

    debug(Pkg.name + '.options', options);
    debug(Pkg.name + '.context', context);

    Request.post({
        url: Nunjucks.renderString(options.webhook, context),
        json: {
            channel: Nunjucks.renderString(options.channel, context),
            username: Nunjucks.renderString(options.username, context),
            text: Nunjucks.renderString(options.text, context),
        }
    }, cb);

};
