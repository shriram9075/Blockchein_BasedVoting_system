public class Block {
    public String hash;
    public String previousHash;
    public String voteData;
    public int nonce;

    public Block(String data, String previousHash) {
        this.voteData = data;
        this.previousHash = previousHash;
        this.hash = calculateHash();
    }

    public String calculateHash() {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(
                (previousHash + voteData + nonce).getBytes()
            );
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
