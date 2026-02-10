public class Blockchain {
    private List<Block> chain = new ArrayList<>();

    public Blockchain() {
        chain.add(new Block("Genesis Block", "0"));
    }

    public void addVote(String voteData) {
        Block prev = chain.get(chain.size() - 1);
        chain.add(new Block(voteData, prev.hash));
    }
}
