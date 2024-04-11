#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int selectStock(int saving, vector<int>& currentValue, vector<int>& futureValue) {
    int n = currentValue.size();
    vector<vector<int>> dp(n + 1, vector<int>(saving + 1, 0));

    for (int i = 1; i <= n; ++i) {
        for (int j = 0; j <= saving; ++j) {
            dp[i][j] = dp[i - 1][j]; 
            if (j >= currentValue[i - 1]) {
                dp[i][j] = max(dp[i][j], dp[i - 1][j - currentValue[i - 1]] + futureValue[i - 1] - currentValue[i - 1]);
            }
        }
    }

    return dp[n][saving];
}

int main() {
    int saving;
    cin >> saving;

    int n;
    cin >> n;

    vector<int> currentValue(n);
    vector<int> futureValue(n);

    for (int i = 0; i < n; ++i) {
        cin >> currentValue[i];
    }

    for (int i = 0; i < n; ++i) {
        cin >> futureValue[i];
    }

    int maxProfit = selectStock(saving, currentValue, futureValue);
    cout << maxProfit << endl;

    return 0;
}
