@RestController
@RequestMapping("/api/voter")
public class VoterController {

    @PostMapping("/register")
    public String register(@RequestBody Voter voter) {
        if (voter.getAge() < 18)
            return "Not eligible to vote";
        return "Voter registered";
    }
}
