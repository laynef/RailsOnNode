module.exports = {
    "styleType": "css",
    "jsType": "jsx",
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
                "test": ".jsx?$",
                "exclude": "node_modules",
                "use": [
                    {
                        "loader": "babel-loader",
                        "options": {
                            "presets": [
                                "react",
                                "env",
                                "stage-0",
                                "react-hmre"
                            ],
                            "plugins": [
                                "transform-runtime",
                                "add-module-exports",
                                "transform-decorators-legacy",
                                "transform-react-display-name",
                                "transform-imports",
                                [
                                    "react-transform",
                                    {
                                        "transforms": [
                                            {
                                                "transform": "react-transform-hmr",
                                                "imports": [
                                                    "react"
                                                ],
                                                "locals": [
                                                    "module"
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ],
        "production": [
            {
                "test": ".jsx?$",
                "exclude": "node_modules",
                "use": [
                    {
                        "loader": "babel-loader",
                        "options": {
                            "presets": [
                                "react",
                                "env",
                                "stage-0"
                            ],
                            "plugins": [
                                "transform-runtime",
                                "add-module-exports",
                                "transform-decorators-legacy",
                                "transform-react-display-name"
                            ]
                        }
                    }
                ]
            }
        ]
    }
}