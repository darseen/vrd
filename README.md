# vrd (Verify Railway Domain)

A lightweight command-line tool to verify a given domain.

## Installation

You can install the package globally using npm:

```bash
npm install -g vrd
```

## Usage

```bash
vrd <www.example.com>
```

Output:

```
Checking records for: www.example.com
[SUCCESS] CNAME Record(s) : www.example.com
[SUCCESS] TXT Record: railway-verify=<TXT value> (at _railway-verify.www.example.com)

Done!
```

## Contributing

Contributions are welcome!

## License

This project is licensed under the MIT License.
