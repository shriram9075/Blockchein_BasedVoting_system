@Entity
public class Voter {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String voterId;
    private int age;
    private boolean hasVoted;
}
