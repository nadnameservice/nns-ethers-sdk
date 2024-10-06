# @nadnameservice/nns-ethers-sdk

A TypeScript library for interacting with Nad Name Service (NNS) protocol using ethers v5. This library provides a convenient wrapper around the NNS smart contract, enabling seamless operations related to name resolution, address mapping, and managing name attributes.

## About Nad Name Service

Nad Name Service (NNS) is a web3 name service built natively on Monad. NNS maps human-readable names like 'salmo.nad' to machine-readable identifiers such as cryptocurrency addresses, metadata, and more.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Initialization](#initialization)
  - [Examples](#examples)
- [API Reference](#api-reference)
  - [NNS Class](#nns-class)
    - [getResolvedAddress](#getresolvedaddress)
    - [getPrimaryNameForAddress](#getprimarynameforaddress)
    - [getNameAttribute](#getnameattribute)
    - [getNameAttributes](#getnameattributes)
    - [getNamesOfAddress](#getnamesofaddress)
    - [getAvatarUrl](#getavatarurl)
    - [setNameAttribute](#setnameattribute)
    - [setNameAttributes](#setnameattributes)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Name Resolution:** Resolve `.nad` domain names to Ethereum addresses.
- **Address Mapping:** Retrieve primary names associated with wallet addresses.
- **Attribute Management:** Get and set custom attributes for names.
- **Avatar Integration:** Fetch avatar URLs associated with names.
- **And many more...**

## Prerequisites

- **Node.js:** Ensure you have Node.js installed (v12 or higher recommended).
- **TypeScript**
- **Ethers.js:** This library depends on [Ethers.js](https://docs.ethers.org/v5/) for blockchain interactions.

## Installation

Install the library via npm:

```bash
npm install @nadnameservice/nns-ethers-sdk
```

Or using yarn:

```bash
yarn add @nadnameservice/nns-ethers-sdk
```

## Usage

### Initialization

To initialize the NNS library:

Create an instance of the `NNS` class by providing a `provider` if you only want to read infos:

```typescript
import { NNS } from '@nadnameservice/nns-ethers-sdk'
import { ethers } from 'ethers'

const provider = new providers.JsonRpcProvider(
  'YOUR_RPC_URL'
)

const nns = new NNS(provider)
```

Or if you want to modify name attributes, provide a `signer` to the `NNS` class:

```typescript
import { NNS } from '@nadnameservice/nns-ethers-sdk'
import { ethers } from 'ethers'

const provider = new providers.JsonRpcProvider(
  'YOUR_RPC_URL'
)

const wallet = new Wallet('...')

const signer = wallet.connect(provider)

const nns = new NNS(signer)
```

### Examples

#### Get resolved address of a .nad name

```typescript
const resolveAddress = await nns.getResolvedAddress(
  'test.nad'
)
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

#### Get the primary .nad name of an address

```typescript
const primaryName = await nns.getPrimaryNameForAddress(
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
)
// test.nad
```

#### Get the avatar associated with a name

```typescript
const avatar = await nns.getAvatarUrl('test.nad')
// https://www.example.com/image.png
```

#### Get name attributes

```typescript
// Get an attribute
const avatarStr = await nns.getNameAttribute(
  'test.nad',
  'avatar'
)

// Get a list of attribute of a name
const customAttrs = await nns.getNameAttributes(
  'test.nad',
  ['key1', 'key2', 'key3']
)
```

#### Set name attributes

```typescript
// Set value for an attribute
const tx = await nns.setNameAttribute(
  'test.nad',
  'key1',
  'value1'
)

await provider.waitForTransaction(tx.hash!)

// Set value for a list of attributes
const tx2 = await nns.setNameAttributes('test.nad', [
  {
    key: 'key2',
    value: 'value2',
  },
  {
    key: 'key3',
    value: 'value3',
  },
])

await provider.waitForTransaction(tx2.hash!)
```

## API Reference

### NNS Class

#### `getResolvedAddress(name: string): Promise<string>`

Resolves a given name to an address.

- **Parameters:**
  - `name`: The name to resolve, with the `.nad` domain.
- **Returns:** Resolved address or zero address if unregistered.

#### `getPrimaryNameForAddress(address: string): Promise<string>`

Retrieves the primary name associated with an address.

- **Parameters:**
  - `address`: The wallet address.
- **Returns:** Primary name or empty string if not set.

#### `getNameAttribute(name: string, key: string): Promise<string>`

Retrieves the value of a specific attribute for a given name.

- **Parameters:**
  - `name`: The name to retrieve the attribute from, with the `.nad` domain.
  - `key`: The key of the attribute.
- **Returns:** Value of the attribute.

#### `getNameAttributes(name: string, keys: string[]): Promise<NNSNameAttribute[]>`

Retrieves a list of name attributes.

- **Parameters:**
  - `name`: The name to retrieve attributes from, with the `.nad` domain.
  - `keys`: The keys of the attributes to retrieve.
- **Returns:** List of name attributes.

#### `getNamesOfAddress(address: string): Promise<string[]>`

Retrieves the names associated with a given address.

- **Parameters:**
  - `address`: The wallet address.
- **Returns:** An array of names associated with the address.

#### `getAvatarUrl(name: string): Promise<string>`

Retrieves the avatar URL associated with a given name.

- **Parameters:**
  - `name`: The name to retrieve the avatar URL from, with the `.nad` domain.
- **Returns:** Avatar URL.

#### `setNameAttribute(name: string, key: string, value: string): Promise<Transaction>`

Sets a value for a specific attribute for a given name.

- **Parameters:**
  - `name`: The name to set the attribute for, with the `.nad` domain.
  - `key`: The key of the attribute to set.
  - `value`: The value of the attribute to set.
- **Returns:** Transaction object for the contract call.

#### `setNameAttributes(name: string, attributes: NNSNameAttribute[]): Promise<Transaction>`

Sets multiple attributes for a given name.

- **Parameters:**
  - `name`: The name to set the attributes for, with the `.nad` domain.
  - `attributes`: The attributes to set.
- **Returns:** Transaction object for the contract call.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Open a pull request detailing your changes and why they should be merged.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
