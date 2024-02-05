# Folderr's JWT Test Script

All this script does is ensures the keys you give it will work with Folderr

Designed to be a sanity check for [foldcli's](https://github.com/Folderr/foldcli) `genkey` and `setup db` commands, as well as your own keys.

Folderr v2 uses `PS (Probablistic RSA)` JWT algorithms, meaning that your keys need to be `RSA` keys in order to work.

Due to Folderr using the [jsonwebtoken](https://https://github.com/auth0/node-jsonwebtoken) library, they also need to be PEM encoded.

Known working formats:

```
PEM Encoded PKCS8 Private Key + PEM Encoded PKCS1 Public Key
```

Known **non-working** formats:

```
PEM Encoded (any format, PKCS8 or otherwise) Private Key + PEM Encoded PKIX Public Key
```

## Requirements

- NodeJS
- A private and public key

## Usage

```sh
node /path/to/private/key.pem /path/to/public/key.pem
```

### License

MIT
