'use strict';
var util = require('util');
var path = require('path');
var uuid = require('node-uuid');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var VsAngularGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
          'Welcome to the impressive VsAngular generator!'
        ));

        var prompts = [
            {
                name: 'appName',
                message: 'What is your app\'s name ?',
                default: this._.camelize(this._.slugify(this._.humanize(path.basename(process.cwd())))) 
            },
            {
                name: 'appVersion',
                message: 'Version',
                default: '1.0.0'
            },
            {
                name: 'appDescription',
                message: 'Description'
            }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.appVersion = props.appVersion;
            this.appDescription = props.appDescription;
            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            var context = {
                app_name: this.appName,
                app_version: this.appVersion,
                app_description: this.appDescription
            }

            this.template("_bower.json", "bower.json", context);
            this.template("_README.md", "README.md", context);
            this.template("_package.json", "package.json", context);

            this.copy("_bowerrc", ".bowerrc");
            this.copy("_gitattributes", ".gitattributes");
            this.copy("_gitignore", ".gitignore");
            this.copy("_Gruntfile.js", "Gruntfile.js");
            this.copy("_karma.conf.js", "karma.conf.js");
            this.copy("_tsd.json", "tsd.json");
            this.copy("_tsd.d.ts", "typings/tsd.d.ts");
            this.copy("_web.config", "web.config");
            this.copy("_web.Debug.config", "web.Debug.config");
            this.copy("_web.Release.config", "web.Release.config");
        },

        projectfiles: function () {
            var context = {
                project_guid: ("{" + uuid.v4() + "}").toUpperCase(),
                root_namespace: this._.classify(this.appName),
                file_name: this.appName,
                iis_port: Math.floor((Math.random() * 7001) + 2000).toString()
            }

            this.template("_template.csproj", context.file_name + ".csproj", context);
            this.template("_template.sln", context.file_name + ".sln", context);

            this.copy("js/app.ts", "source/js/app.ts");
            this.copy("jade/index.jade", "source/jade/index.jade");
            this.copy("jade/templates/directives/pane.jade", "source/jade/templates/directives/pane.jade");
            this.copy("jade/templates/directives/tabs.jade", "source/jade/templates/directives/tabs.jade");
            this.copy("jade/templates/states/about.jade", "source/jade/templates/states/about.jade");
            this.copy("jade/templates/states/main.jade", "source/jade/templates/states/main.jade");
            this.copy("js/controllers/controllers.ts", "source/js/controllers/controllers.ts");
            this.copy("js/directives/directives.ts", "source/js/directives/directives.ts");
            this.copy("js/models/models.ts", "source/js/models/models.ts");
            this.copy("js/services/services.ts", "source/js/services/services.ts");
            this.copy("less/colors.less", "source/less/colors.less");
            this.copy("less/directives.less", "source/less/directives.less");
            this.copy("less/directives/pane.less", "source/less/directives/pane.less");
            this.copy("less/directives/tabs.less", "source/less/directives/tabs.less");
            this.copy("less/fonts.less", "source/less/fonts.less");
            this.copy("less/generals.less", "source/less/generals.less");
            this.copy("less/main.less", "source/less/main.less");
            this.copy("less/mixins.less", "source/less/mixins.less");
            this.copy("less/states.less", "source/less/states.less");
            this.copy("less/states/main.less", "source/less/states/main.less");
            this.copy("test/spec/tests.ts", "test/spec/tests.ts");
        },
    },

    end: function () {
        this.spawnCommand('tsd', ['reinstall', '--overwrite', '--save']);
        this.installDependencies();
    }
});

module.exports = VsAngularGenerator;
