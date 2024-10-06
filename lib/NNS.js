"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NNS = void 0;
const ethers_1 = require("ethers");
const constants = __importStar(require("./constant"));
const namehash_1 = require("./namehash");
/**
 * Wrapper around the NNS contract.
 * Provides methods to interact with the NNS contract and perform operations related to
 * name resolution, address mapping and setting name attributes.
 */
class NNS {
    constructor(signerOrProvider) {
        this.nnsContract = new ethers_1.Contract(constants.nnsContractAddress, constants.nnsAbi, signerOrProvider);
    }
    /**
     * Resolves a given name to an address.
     *
     * @param {string} name - The name to resolve, with the **.nad** domain.
     * @returns {string} Resolved address associated with the given name
     * and address zero if the name is unregistered.
     */
    getResolvedAddress(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedName = (0, namehash_1.namehash)(name);
            return yield this.nnsContract.getResolvedAddress(hashedName);
        });
    }
    /**
     * Retrieves the primary name associated with an address.
     *
     * @param {string} address - The wallet address.
     * @returns {string} Primary name associated with the given address
     * and an empty string if the primary name is not set
     */
    getPrimaryNameForAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nnsContract.getPrimaryNameForAddress(address);
        });
    }
    /**
     * Retrieves the value of a specific attribute for a given name.
     *
     * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
     * @param {string} key - The key of the attribute to retrieve.
     * @returns {string} The value of the attribute associated with the given name and key.
     */
    getNameAttribute(name, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const node = (0, namehash_1.namehash)(name);
            return yield this.nnsContract.getNameAttribute(node, key);
        });
    }
    /**
     * Retrieves a list of name attributes
     *
     * @param {string} name - The name to retrieve the attribute from, with the **.nad** domain.
     * @param {string} keys - The keys of the attributes to retrieve.
     * @returns {NNSNameAttribute[]} List of name attributes
     */
    getNameAttributes(name, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const node = (0, namehash_1.namehash)(name);
            const result = yield this.nnsContract.getNameAttributes(node, keys);
            return result.map((attr) => {
                return {
                    key: attr.key,
                    value: attr.value,
                };
            });
        });
    }
    /**
     * Retrieves the names associated with a given address.
     *
     * @param {string} address - The wallet address.
     * @returns {Promise<string[]>} An array of names associated with the given address.
     */
    getNamesOfAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nnsContract.getNamesOfAddress(address);
        });
    }
    /**
     * Retrieves the avatar URL associated with a given name.
     *
     * @param {string} name - The name to retrieve the avatar URL from, with the **.nad** domain.
     * @returns {string} Avatar URL associated with the given name.
     */
    getAvatarUrl(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getNameAttribute(name, constants.avatarKey);
        });
    }
    /**
     * Set a value for a specific attribute for a given name.
     * @param {string} name - The name to set the attribute for, with the **.nad** domain.
     * @param {string} key - The key of the attribute to set.
     * @param {string} value - The value of the attribute to set.
     * @returns {Transaction} Transaction object for the contract call.
     */
    setNameAttribute(name, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nnsContract.signer === undefined) {
                throw new Error('setNameAttribute requires a signer to be set');
            }
            const node = (0, namehash_1.namehash)(name);
            return yield this.nnsContract.setNameAttribute(node, key, value);
        });
    }
    /**
     * Set a value for a specific attribute for a given name.
     * @param {string} name - The name to set the attribute for, with the **.nad** domain.
     * @param {NNSNameAttribute[]} attributes - The attributes to set.
     * @returns {Transaction} Transaction object for the contract call.
     */
    setNameAttributes(name, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nnsContract.signer === undefined) {
                throw new Error('setNameAttribute requires a signer to be set');
            }
            const node = (0, namehash_1.namehash)(name);
            return yield this.nnsContract.setNameAttributes(node, attributes);
        });
    }
}
exports.NNS = NNS;
