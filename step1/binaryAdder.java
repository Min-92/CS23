public class binaryAdder {

	public static boolean[] halfadder(boolean bitA, boolean bitB) {
	        boolean[] answer = new boolean[2];
	        answer[0] = bitA&&bitB;                // carry
	        answer[1] = !bitA&&bitB||bitA&&!bitB;  // sum

	        return answer;
	    }

	  public static boolean[] fulladder(boolean bitA, boolean bitB, boolean carry) {
	        boolean[] answer = new boolean[2];
	        answer[0] = bitA&&bitB||bitB&&carry||bitA&&carry ;
	        answer[1] = bitA&&bitB&&carry||!bitA&&!bitB&&carry||!bitA&&bitB&&!carry||bitA&&!bitB&&!carry;

	        return answer;
	    }


	public static boolean[] byteadder(boolean[] byteA, boolean[] byteB) {
	        boolean[] answer = new boolean[byteA.length+1];
	        int len = byteA.length;
	        boolean c = true;

	        for(int i = 0 ; i <= len; i++) {
	        	if(i == 0) {
	        		answer[i] = halfadder(byteA[i],byteB[i])[1];
	        		c = halfadder(byteA[i],byteB[i])[0];
	        	}else if(i == len) {

	        	answer[i] = c;


	        	}else {
	        		answer[i] = fulladder(byteA[i],byteB[i],c)[1];
	        		c = fulladder(byteA[i],byteB[i],c)[0];

	        	}

	        }

	        return answer;
	    }

	public static void main(String[] args) {

    ArrayList<Integer> A = new ArrayList<Integer>(
  				Arrays.asList(1, 1, 0, 0, 1, 0, 1, 0 ));
  		ArrayList<Integer> B = new ArrayList<Integer>(
  				Arrays.asList(1, 1, 0, 0, 1, 0, 1, 0 ));

  		int length = A.size();

  		if(A.size() != B.size()) {
  			length = Math.max(A.size(),B.size());
  			if(A.size() < length) {
  				for(int i = A.size(); i < length ; i++) {
  					A.add(i,0);
  				}
  			}else {
  				for(int i = B.size(); i < length ; i++) {
  					B.add(i,0);
  				}

  			}

  		}

  		boolean[] a = new boolean[length];
  		boolean[] b = new boolean[length];


  		for(int i = 0; i< length; i++) {
  			a[i] = (A.get(i)!=0);
  			b[i] = (B.get(i)!=0);
  		}

		boolean[] c = new boolean[a.length+1];

		c = byteadder(a,b);
		for(int i = 0; i< c.length;i++) {
			if(i ==0) {
				System.out.print("["+(c[i]? 1:0)+",");
			}else if(i == c.length-1) {
				System.out.print((c[i]? 1:0)+"]");
			}else{
				System.out.print((c[i]? 1:0)+",");
			}

		}



	}

}
