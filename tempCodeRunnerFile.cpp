#include "iostream"

using namespace std;
void check(int n,int curr, int &cnt){
        if(curr>n){
            return;
        }
        if(curr==n){
            cnt++;
            return;
        }

        check(n, curr+1, cnt);
        check(n, curr+2, cnt);
    }
    int climbStairs(int n) {
        int cnt = 0;
        check(n, 1, cnt);
        return cnt;
    }
int main() {
  cout<<climbStairs(44);
}
// This is a comment