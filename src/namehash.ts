import { ens_normalize } from '@adraffy/ens-normalize'
import { keccak, hex_from_bytes } from '@adraffy/keccak'

export function getNamehash(name: string): string {
  let buf = new Uint8Array(64)
  if (name.length > 0) {
    for (let label of name.split('.').reverse()) {
      buf.set(keccak().update(label).bytes, 32)
      buf.set(keccak().update(buf).bytes, 0)
    }
  }
  return hex_from_bytes(buf.subarray(0, 32))
}

export function namehash(name: string): string {
  return '0x' + getNamehash(ens_normalize(name))
}

export function getReverseRecordHash(
  address: string
): string {
  return namehash(`${address.slice(2)}.addr.reverse`)
}
