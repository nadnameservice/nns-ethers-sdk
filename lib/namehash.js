"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReverseRecordHash = exports.namehash = exports.getNamehash = void 0;
const ens_normalize_1 = require("@adraffy/ens-normalize");
const keccak_1 = require("@adraffy/keccak");
function getNamehash(name) {
    let buf = new Uint8Array(64);
    if (name.length > 0) {
        for (let label of name.split('.').reverse()) {
            buf.set((0, keccak_1.keccak)().update(label).bytes, 32);
            buf.set((0, keccak_1.keccak)().update(buf).bytes, 0);
        }
    }
    return (0, keccak_1.hex_from_bytes)(buf.subarray(0, 32));
}
exports.getNamehash = getNamehash;
function namehash(name) {
    return '0x' + getNamehash((0, ens_normalize_1.ens_normalize)(name));
}
exports.namehash = namehash;
function getReverseRecordHash(address) {
    return namehash(`${address.slice(2)}.addr.reverse`);
}
exports.getReverseRecordHash = getReverseRecordHash;
