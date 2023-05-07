module.exports = {
    "*.{ts,tsx}": [
        "prettier --parser typescript --write",
    ],
    "*.{json,css}": [
        "prettier --write"
    ]
}
