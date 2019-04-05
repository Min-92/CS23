import java.util.Scanner;

public class convertor {
	public static boolean[] dec2bin(int decimal) {
		int a = decimal;
		int i = 1;
		int r;
		while(a!=1) {
			i++;
			a = a/2;
		}
		
        boolean[] answer = new boolean[i];
        answer[i-1] = (1!=0);
        a = decimal;
        i = 0;
        while(a!=1) {
        	r = a%2;
        	a = a/2;
        	answer [i] = (r!=0);
        	i++;
        }
        return answer;
    }
	
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);		
		int a = sc.nextInt();
		for(int i = 0; i < dec2bin(a).length; i++) {
			System.out.print((dec2bin(a)[i]? 1:0));
		}
	}

}