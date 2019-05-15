module.exports = {
    "styleType": "css",
    "jsType": "vue",
    "useBootstrapToggle": false,
    "bootstrap": {
        "scripts": {
            "alert": true,
            "button": true,
            "carousel": true,
            "collapse": true,
            "dropdown": true,
            "modal": true,
            "popover": true,
            "scrollspy": true,
            "tab": true,
            "tooltip": true,
            "util": true
        }
    },
    "javascriptSettings": {
        "development": [
            {
                "test": ".vue$",
                "exclude": "node_modules",
                "use": [
                    {
                        "loader": "vue-loader",
                        "options": {
                            "presets": [
                                "vue",
                                "env",
                                "stage-3"
                            ],
                            "plugins": [
                                "transform-runtime"
                            ]
                        }
                    }
                ]
            },
            {
                "test": ".js$",
                "loader": "babel-loader",
                "exclude": "node_modules"
            },
            {
                "test": ".pug$",
                "oneOf": [
                    {
                        "resourceQuery": "^\\?vue",
                        "use": [
                            "pug-plain-loader"
                        ]
                    },
                    {
                        "use": [
                            "raw-loader",
                            "pug-plain-loader"
                        ]
                    }
                ]
            },
            {
                "test": ".html$",
                "oneOf": [
                    {
                        "resourceQuery": "^\\?vue",
                        "use": [
                            "html-loader"
                        ]
                    },
                    {
                        "use": [
                            "html-loader"
                        ]
                    }
                ]
            }
        ],
        "production": [
            {
                "test": ".vue$",
                "exclude": "node_modules",
                "use": [
                    {
                        "loader": "vue-loader",
                        "options": {
                            "presets": [
                                "vue",
                                "env",
                                "stage-3"
                            ],
                            "plugins": [
                                "transform-runtime"
                            ]
                        }
                    }
                ]
            },
            {
                "test": ".js$",
                "loader": "babel-loader",
                "exclude": "node_modules"
            },
            {
                "test": ".pug$",
                "oneOf": [
                    {
                        "resourceQuery": "^\\?vue",
                        "use": [
                            "pug-plain-loader"
                        ]
                    },
                    {
                        "use": [
                            "raw-loader",
                            "pug-plain-loader"
                        ]
                    }
                ]
            },
            {
                "test": ".html$",
                "oneOf": [
                    {
                        "resourceQuery": "^\\?vue",
                        "use": [
                            "html-loader"
                        ]
                    },
                    {
                        "use": [
                            "html-loader"
                        ]
                    }
                ]
            }
        ]
    }
}