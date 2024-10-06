import { Contract, Transaction, ethers } from 'ethers'
import * as constants from './constant'
import { namehash } from './namehash'

type Provider = ethers.providers.Provider
type Signer = ethers.Signer

export type NNSNameAttribute = {
  key: string
  value: string
}

/**
 * Wrapper around the NNS contract.
 * Provides methods to interact with the NNS contract and perform operations related to
 * name resolution, address mapping and setting name attributes.
 */
export class NNS {
  nnsContract: Contract

  constructor(signerOrProvider: Signer | Provider) {
    this.nnsContract = new Contract(
      constants.nnsContractAddress,
      constants.nnsAbi,
      signerOrProvider
    )
  }

  /**
   * Resolves a given name to an address.
   *
   * @param {string} name - The name to resolve, with the **.nad** domain.
   * @returns {string} Resolved address associated with the given name
   * and address zero if the name is unregistered.
   */
  async getResolvedAddress(name: string): Promise<string> {
    const hashedName = namehash(name)

    return await this.nnsContract.getResolvedAddress(
      hashedName
    )
  }

  /**
   * Retrieves the primary name associated with an address.
   *
   * @param {string} address - The wallet address.
   * @returns {string} Primary name associated with the given address
   * and an empty string if the primary name is not set
   */
  async getPrimaryNameForAddress(
    address: string
  ): Promise<string> {
    return await this.nnsContract.getPrimaryNameForAddress(
      address
    )
  }

  /**
   * Retrieves the value of a specific attribute for a given name.
   *
   * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
   * @param {string} key - The key of the attribute to retrieve.
   * @returns {string} The value of the attribute associated with the given name and key.
   */
  async getNameAttribute(
    name: string,
    key: string
  ): Promise<string> {
    const node = namehash(name)
    return await this.nnsContract.getNameAttribute(
      node,
      key
    )
  }

  /**
   * Retrieves a list of name attributes
   *
   * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
   * @param {string} keys - The keys of the attributes to retrieve.
   * @returns {NNSNameAttribute[]} List of name attributes
   */
  async getNameAttributes(
    name: string,
    keys: string[]
  ): Promise<NNSNameAttribute[]> {
    const node = namehash(name)
    const result = await this.nnsContract.getNameAttributes(
      node,
      keys
    )

    return result.map((attr: any) => {
      return {
        key: attr.key,
        value: attr.value,
      }
    })
  }

  /**
   * Retrieves the names associated with a given address.
   *
   * @param {string} address - The wallet address.
   * @returns {Promise<string[]>} An array of names associated with the given address.
   */
  async getNamesOfAddress(
    address: string
  ): Promise<string[]> {
    return await this.nnsContract.getNamesOfAddress(address)
  }

  /**
   * Retrieves the avatar URL associated with a given name.
   *
   * @param {string} name - The name to retrieve the avatar URL from, with the **.nad** domain.
   * @returns {string} Avatar URL associated with the given name.
   */
  async getAvatarUrl(name: string): Promise<string> {
    return await this.getNameAttribute(
      name,
      constants.avatarKey
    )
  }

  /**
   * Set a value for a specific attribute for a given name.
   * @param {string} name - The name to set the attribute for, with the **.nad** domain.
   * @param {string} key - The key of the attribute to set.
   * @param {string} value - The value of the attribute to set.
   * @returns {Transaction} Transaction object for the contract call.
   */
  async setNameAttribute(
    name: string,
    key: string,
    value: string
  ): Promise<Transaction> {
    if (this.nnsContract.signer === undefined) {
      throw new Error(
        'setNameAttribute requires a signer to be set'
      )
    }

    const node = namehash(name)
    return await this.nnsContract.setNameAttribute(
      node,
      key,
      value
    )
  }

  /**
   * Set a value for a specific attribute for a given name.
   * @param {string} name - The name to set the attribute for, with the **.nad** domain.
   * @param {NNSNameAttribute[]} attributes - The attributes to set.
   * @returns {Transaction} Transaction object for the contract call.
   */
  async setNameAttributes(
    name: string,
    attributes: NNSNameAttribute[]
  ): Promise<Transaction> {
    if (this.nnsContract.signer === undefined) {
      throw new Error(
        'setNameAttribute requires a signer to be set'
      )
    }

    const node = namehash(name)
    return await this.nnsContract.setNameAttributes(
      node,
      attributes
    )
  }
}
