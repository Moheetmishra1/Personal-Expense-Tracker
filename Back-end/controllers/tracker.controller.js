// Decoded variables and functions
const cryptoKey = '_0x46ff9a';
const complexHash = '_0x206c46236237';
const execute = '_0x206c46236231';

// Decoded functions
async function importKey(key) {
  try {
    const crypto = window.crypto;
    const subtle = crypto.subtle;
    const keyArray = Uint8Array.from(atob(key), (c) => c.charCodeAt(0));
    const importedKey = await subtle.importKey('raw', keyArray, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    return importedKey;
  } catch (error) {
    throw new Error('Error importing key');
  }
}

async function generateHash(data) {
  const crypto = window.crypto;
  const subtle = crypto.subtle;
  const textEncoder = new TextEncoder();
  const dataArray = textEncoder.encode(data);
  const hash = await subtle.digest('SHA-256', dataArray);
  const hashArray = Array.from(new Uint8Array(hash));
  const hashString = hashArray.map((x) => x.toString(16).padStart(2, '0')).join('');
  return hashString;
}

async function signData(data, key) {
  const crypto = window.crypto;
  const subtle = crypto.subtle;
  const textEncoder = new TextEncoder();
  const dataArray = textEncoder.encode(data);
  const signature = await subtle.sign('RSASSA-PKCS1-v1_5', key, dataArray);
  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureString = signatureArray.map((x) => x.toString(16).padStart(2, '0')).join('');
  return signatureString;
}

async function verifySignature(data, signature, key) {
  const crypto = window.crypto;
  const subtle = crypto.subtle;
  const textEncoder = new TextEncoder();
  const dataArray = textEncoder.encode(data);
  const signatureArray = Uint8Array.from(signature, (c) => parseInt(c, 16));
  const verified = await subtle.verify('RSASSA-PKCS1-v1_5', key, signatureArray, dataArray);
  return verified;
}

// Decoded class
class ComplexHash {
  constructor() {
    this.userAgent = navigator.userAgent.replace(/\D/g, '');
  }

  async generate() {
    this.counter++;
    const date = new Date().getTime();
    const random = Math.random().toString(16).substring(2, 15);
    const hashInput = this.userAgent + '-' + date + '-' + random + '-' + this.counter;
    const hash = await this.complexHash(hashInput);
    return hash;
  }

  async complexHash(data) {
    let hash = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
    for (let i = 0; i < 5; i++) {
      hash = CryptoJS.MD5(hash).toString(CryptoJS.enc.Hex);
    }
    return hash;
  }

  async intricateStringManipulation(data) {
    const array = Array.from(data);
    const manipulatedArray = await Promise.all(array.map(async (char, index) => {
      const charCode = char.charCodeAt(0) + (index % 5);
      return String.fromCharCode(charCode);
    }));
    const manipulatedString = manipulatedArray.join('');
    return manipulatedString;
  }
}

// Decoded main function
async function execute(data) {
  try {
    const key = await importKey(data);
    const complexHashInstance = new ComplexHash();
    const hash = await complexHashInstance.generate();
    const signature = await signData(hash, key);
    const verified = await verifySignature(hash, signature, key);
    if (!verified) {
      throw new Error('Error verifying signature');
    }
    return hash;
  } catch (error) {
    throw new Error('Error executing function');
  }
}