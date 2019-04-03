public class adder {

    public static boolean[] halfadder(boolean bitA, boolean bitB) {
        boolean[] answer = new boolean[2];
        answer[0] = bitA&&bitB;                // carry
        answer[1] = !bitA&&bitB||bitA&&!bitB;  // sum

        return answer;
    }
    public static boolean[] fulladder(boolean bitA, boolean bitB, boolean carry) {
        boolean[] answer = new boolean[2];
        //carry 논리연산식
//        answer[0] = bitA&&bitB||bitB&&carry||bitA&&carry ;
        //sum 논리연산식
//        answer[1] = bitA&&bitB&&carry||!bitA&&!bitB&&carry||!bitA&&bitB&&!carry||bitA&&!bitB&&!carry;

        //carry halfadder 메소드 호출
        answer[0] = halfadder(bitA,bitB)[0]||halfadder(carry,halfadder(bitA,bitB)[0])[0] ;
        //sum halfadder 메소드 호출
        answer[1] = halfadder(carry,(halfadder(bitA,bitB)[1]))[1];

        return answer;
    }

	public static void main(String[] args) {

		int x,y,z,c,s;
		boolean a,b,d,e,f;


		// halfadder 진리표 출력
		System.out.println("half adder truth table");
		System.out.println(" x | y | c | s ");
		System.out.println("---|---|---|---");
		for(int i = 0; i < 2; i++) {
			for(int j = 0; j < 2; j++) {
				x = i;
				y = j;

				a = (x!= 0);
				b = (y!= 0);
				d = halfadder(a,b)[0];
				e = halfadder(a,b)[1];
				c = (d)? 1:0;
				s = (e)? 1:0;

				System.out.println(" "+x+" | "+y+" | "+c+" | "+s);
			}
		}

		// fulladder 진리표 출력
		System.out.println("full adder truth table");
		System.out.println(" x | y | z | c | s ");
		System.out.println("---|---|---|---|---");

		for(int i = 0; i < 2; i++) {
			for(int j = 0; j < 2; j++) {
				for(int k = 0; k<2; k++) {
					x = i;
					y = j;
					z = k;

					a = (x!= 0);
					b = (y!= 0);
					d = (z!= 0);

					e = fulladder(a,b,d)[0];
					f = fulladder(a,b,d)[1];
					c = (e)? 1:0;
					s = (f)? 1:0;

					System.out.println(" "+x+" | "+y+" | "+z+" | "+c+" | "+s);

				}
			}
		}
    //result
//		half adder truth table
//		 x | y | c | s
//		---|---|---|---
//		 0 | 0 | 0 | 0
//		 0 | 1 | 0 | 1
//		 1 | 0 | 0 | 1
//		 1 | 1 | 1 | 0
//		full adder truth table
//		 x | y | z | c | s
//		---|---|---|---|---
//		 0 | 0 | 0 | 0 | 0
//		 0 | 0 | 1 | 0 | 1
//		 0 | 1 | 0 | 0 | 1
//		 0 | 1 | 1 | 0 | 0
//		 1 | 0 | 0 | 0 | 1
//		 1 | 0 | 1 | 0 | 0
//		 1 | 1 | 0 | 1 | 0
//		 1 | 1 | 1 | 1 | 1
	}
}
