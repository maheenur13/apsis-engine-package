import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = "80e2af0a60ecbd16618abc72c2d00fb3";

export const apsisEncrypt = (url: string): string => {
    const cipher = crypto.createCipheriv(
        algorithm,
        secretKey,
        Buffer.from(iv, "hex")
    );
    const encrypted = Buffer.concat([
        cipher.update(String(url)),
        cipher.final(),
    ]);
    return encrypted.toString("hex");
};

// decryption
export const apsisDecrypt = (url: string): string => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(iv, "hex")
    );
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(String(url), "hex")),
        decipher.final(),
    ]);
    return decrypted.toString();
};
