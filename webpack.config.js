const path = require("path");

module.exports = {
    // Entry point of your application
    entry: "./src/index.js",

    // Output configuration
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },

    // Development server configuration
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 3000,
        open: true,
        allowedHosts: [
            // Specify allowed hosts here. Use '*' to allow all hosts.
            "localhost",
            "yourapp.local",
        ],
    },

    // Add additional configurations here
};
