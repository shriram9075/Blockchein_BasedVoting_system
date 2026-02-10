@RestController
@RequestMapping("/api/vote")
public class VoteController {

    Blockchain blockchain = new Blockchain();

    @PostMapping("/cast")
    public String castVote(@RequestParam String voterId,
                           @RequestParam String candidate) {
        blockchain.addVote(voterId + " -> " + candidate);
        return "Vote securely recorded on blockchain";
    }
}
