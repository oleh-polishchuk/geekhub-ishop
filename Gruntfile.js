module.exports = function (grunt) {

    grunt.initConfig({
        "bower-install-simple": {
            options: {
                color: true,
                directory: "bower_components"
            },
            "prod": {
                options: {
                    production: true,
                    directory: "prod_components"
                }
            },
            "dev": {
                options: {
                    production: false,
                    directory: "dev_components"
                }
            }
        },

        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            libs: {
                options: {
                    destPrefix: 'public/vendor'
                },
                files: {
                    // jQuery
                    'js/jquery.js': 'jquery/dist/jquery.js',

                    // Bootstrap
                    'js/bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
                    'css/bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
                    'css/bootstrap-theme.css': 'bootstrap/dist/css/bootstrap-theme.css',

                    // Font Awesome
                    'css/font-awesome.css': 'font-awesome/css/font-awesome.min.css',

                    // Fonts
                    'fonts': [
                        'bootstrap/fonts',
                        'font-awesome/fonts'
                    ],

                    // Angular JS
                    'js/angular.js': 'angular/angular.min.js',

                    // Angular Resource
                    '/js/angular-resource.js': 'angular-resource/angular-resource.min.js',

                    // Angular Sanitize
                    '/js/angular-sanitize.js': 'angular-sanitize/angular-sanitize.js',

                    // Angular File Module
                    'js/angular-file-model.js': 'angular-file-model/angular-file-model.js',

                    // Angular Cart Module
                    'js/angular-cart.js': 'ngCart/dist/ngCart.js',

                    // Angular Route
                    'js/angular-route.js': 'angular-route/angular-route.min.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-bower-install-simple');

    grunt.registerTask('install', [
        'bower-install-simple',
        'bowercopy'
    ]);

    grunt.registerTask('zip', ['zip_directories']);
};