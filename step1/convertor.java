import java.util.Scanner;

public class convertor {
	public static ArrayList dec2bin(int decimal) {
		ArrayList<Integer> answer = new ArrayList();
		int a = decimal;
		int r;	
		for(int i = 0; a!=1; i++) {
			r = a%2;
			a = a/2;
			answer.add(r);
			if(a == 1) {
				answer.add(a);
			}
		}
        return answer;
    }
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);		
		int a = sc.nextInt();
		
		ArrayList<Integer> ans = new ArrayList();
		
		ans = dec2bin(a);
		Iterator itr = ans.iterator();
		
		while(itr.hasNext()) {
			System.out.print(itr.next());
		}
	}

}