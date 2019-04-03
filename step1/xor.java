public class xor {

	public static void main(String[] args) {
		int x,y,z;
		boolean a,b,c;

		System.out.println(" x | y | z |");
		System.out.println("---|---|---|");

		for(int i = 0; i < 2; i++) {
			for(int j = 0; j < 2; j++) {
				x = i;  y = j;
				a = (x != 0); b = (y!= 0);
				c = !a&&b||a&&!b; // !AB+
				z = (c)? 1:0;

				System.out.println(" "+x+" | "+y+" | "+z+" | ");
			}
		}
//			result
//		  x | y | z |
//		 ---|---|---|
//		  0 | 0 | 0 |
//		  0 | 1 | 1 |
//		  1 | 0 | 1 |
//		  1 | 1 | 0 |

	}

}
