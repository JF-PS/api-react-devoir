import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const ivKey: string = "1a2964f20495fd5282a54c76c725111f";
const iv = Buffer.from(ivKey, "hex");

const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString("hex");
};

const decrypt = (hash: string) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivKey, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

export { encrypt, decrypt };
