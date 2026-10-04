export const dpSolutions = {
  Fibonacci: {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(2^n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    },
    explanation: {
      "Naive Approach": "Use the recurrence F(n) = F(n - 1) + F(n - 2), stopping at F(0) and F(1).",
      "Best Approach": "Keep only the previous two Fibonacci values while iterating from 2 through n.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
}`,
        "C++": `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
};`,
        Python: `class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        return self.fib(n - 1) + self.fib(n - 2)`,
      },
      "Best Approach": {
        Java: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int previous = 0;
        int current = 1;
        for (int i = 2; i <= n; i++) {
            int next = previous + current;
            previous = current;
            current = next;
        }
        return current;
    }
}`,
        "C++": `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int previous = 0;
        int current = 1;
        for (int i = 2; i <= n; i++) {
            int next = previous + current;
            previous = current;
            current = next;
        }
        return current;
    }
};`,
        Python: `class Solution:
    def fib(self, n: int) -> int:
        previous, current = 0, 1
        for _ in range(n):
            previous, current = current, previous + current
        return previous`,
      },
    },
  },
  "Climbing Stairs": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(2^n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    },
    explanation: {
      "Naive Approach": "At each step, recursively count paths that arrive by taking one or two stairs.",
      "Best Approach": "The number of ways to reach step i is the sum of the ways to reach i - 1 and i - 2; retain only those two values.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
}`,
        "C++": `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
};`,
        Python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        return self.climbStairs(n - 1) + self.climbStairs(n - 2)`,
      },
      "Best Approach": {
        Java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int oneStepBefore = 2;
        int twoStepsBefore = 1;
        for (int step = 3; step <= n; step++) {
            int ways = oneStepBefore + twoStepsBefore;
            twoStepsBefore = oneStepBefore;
            oneStepBefore = ways;
        }
        return oneStepBefore;
    }
}`,
        "C++": `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int oneStepBefore = 2;
        int twoStepsBefore = 1;
        for (int step = 3; step <= n; step++) {
            int ways = oneStepBefore + twoStepsBefore;
            twoStepsBefore = oneStepBefore;
            oneStepBefore = ways;
        }
        return oneStepBefore;
    }
};`,
        Python: `class Solution:
    def climbStairs(self, n: int) -> int:
        one_step_before, two_steps_before = 2, 1
        for _ in range(3, n + 1):
            one_step_before, two_steps_before = (
                one_step_before + two_steps_before,
                one_step_before,
            )
        return two_steps_before if n == 1 else one_step_before`,
      },
    },
  },
  "House Robber": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(2^n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    },
    explanation: {
      "Naive Approach": "For each house, compare skipping it with robbing it and skipping the next house.",
      "Best Approach": "Scan once and keep the best total ending at the previous house and the house before it.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public int rob(int[] nums) {
        return robFrom(nums, 0);
    }

    private int robFrom(int[] nums, int index) {
        if (index >= nums.length) return 0;
        return Math.max(
            robFrom(nums, index + 1),
            nums[index] + robFrom(nums, index + 2)
        );
    }
}`,
        "C++": `class Solution {
    int robFrom(vector<int>& nums, int index) {
        if (index >= nums.size()) return 0;
        return max(robFrom(nums, index + 1),
                   nums[index] + robFrom(nums, index + 2));
    }
public:
    int rob(vector<int>& nums) {
        return robFrom(nums, 0);
    }
};`,
        Python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        def rob_from(index: int) -> int:
            if index >= len(nums):
                return 0
            return max(
                rob_from(index + 1),
                nums[index] + rob_from(index + 2),
            )
        return rob_from(0)`,
      },
      "Best Approach": {
        Java: `class Solution {
    public int rob(int[] nums) {
        int twoBack = 0;
        int oneBack = 0;
        for (int amount : nums) {
            int best = Math.max(oneBack, twoBack + amount);
            twoBack = oneBack;
            oneBack = best;
        }
        return oneBack;
    }
}`,
        "C++": `class Solution {
public:
    int rob(vector<int>& nums) {
        int twoBack = 0;
        int oneBack = 0;
        for (int amount : nums) {
            int best = max(oneBack, twoBack + amount);
            twoBack = oneBack;
            oneBack = best;
        }
        return oneBack;
    }
};`,
        Python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        two_back = one_back = 0
        for amount in nums:
            two_back, one_back = one_back, max(
                one_back, two_back + amount
            )
        return one_back`,
      },
    },
  },
  "Frog Jump": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(2^n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    },
    explanation: {
      "Naive Approach": "Recursively try a one-step or two-step jump and add the absolute height difference.",
      "Best Approach": "Compute the minimum energy for each stone in order, retaining the costs for the previous two stones.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public int minCost(int[] height) {
        return jump(height, height.length - 1);
    }

    private int jump(int[] height, int index) {
        if (index == 0) return 0;
        int one = jump(height, index - 1)
                + Math.abs(height[index] - height[index - 1]);
        int two = Integer.MAX_VALUE;
        if (index > 1) {
            two = jump(height, index - 2)
                    + Math.abs(height[index] - height[index - 2]);
        }
        return Math.min(one, two);
    }
}`,
        "C++": `class Solution {
    int jump(vector<int>& height, int index) {
        if (index == 0) return 0;
        int one = jump(height, index - 1)
                + abs(height[index] - height[index - 1]);
        int two = INT_MAX;
        if (index > 1) {
            two = jump(height, index - 2)
                    + abs(height[index] - height[index - 2]);
        }
        return min(one, two);
    }
public:
    int minCost(vector<int>& height) {
        return jump(height, height.size() - 1);
    }
};`,
        Python: `class Solution:
    def minCost(self, height: List[int]) -> int:
        def jump(index: int) -> int:
            if index == 0:
                return 0
            one = jump(index - 1) + abs(height[index] - height[index - 1])
            two = float("inf")
            if index > 1:
                two = jump(index - 2) + abs(height[index] - height[index - 2])
            return min(one, two)
        return jump(len(height) - 1)`,
      },
      "Best Approach": {
        Java: `class Solution {
    public int minCost(int[] height) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = 1; i < height.length; i++) {
            int one = oneBack + Math.abs(height[i] - height[i - 1]);
            int two = Integer.MAX_VALUE;
            if (i > 1) {
                two = twoBack + Math.abs(height[i] - height[i - 2]);
            }
            int current = Math.min(one, two);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }
}`,
        "C++": `class Solution {
public:
    int minCost(vector<int>& height) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = 1; i < height.size(); i++) {
            int one = oneBack + abs(height[i] - height[i - 1]);
            int two = INT_MAX;
            if (i > 1) two = twoBack + abs(height[i] - height[i - 2]);
            int current = min(one, two);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }
};`,
        Python: `class Solution:
    def minCost(self, height: List[int]) -> int:
        two_back = one_back = 0
        for index in range(1, len(height)):
            one = one_back + abs(height[index] - height[index - 1])
            two = float("inf")
            if index > 1:
                two = two_back + abs(height[index] - height[index - 2])
            two_back, one_back = one_back, min(one, two)
        return one_back`,
      },
    },
  },
  "Min Cost Climbing Stairs": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(2^n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    },
    explanation: {
      "Naive Approach": "From each stair, recursively try paying its cost and moving one or two steps; either of the first two stairs can be the start.",
      "Best Approach": "For each stair, add its cost to the cheaper of the previous two paid stairs, then choose the cheaper finish.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        return Math.min(climb(cost, 0), climb(cost, 1));
    }

    private int climb(int[] cost, int index) {
        if (index >= cost.length) return 0;
        return cost[index] + Math.min(
            climb(cost, index + 1),
            climb(cost, index + 2)
        );
    }
}`,
        "C++": `class Solution {
    int climb(vector<int>& cost, int index) {
        if (index >= cost.size()) return 0;
        return cost[index] + min(climb(cost, index + 1),
                                 climb(cost, index + 2));
    }
public:
    int minCostClimbingStairs(vector<int>& cost) {
        return min(climb(cost, 0), climb(cost, 1));
    }
};`,
        Python: `class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        def climb(index: int) -> int:
            if index >= len(cost):
                return 0
            return cost[index] + min(
                climb(index + 1), climb(index + 2)
            )
        return min(climb(0), climb(1))`,
      },
      "Best Approach": {
        Java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = 2; i <= cost.length; i++) {
            int current = Math.min(
                oneBack + cost[i - 1],
                twoBack + cost[i - 2]
            );
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }
}`,
        "C++": `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = 2; i <= cost.size(); i++) {
            int current = min(oneBack + cost[i - 1],
                              twoBack + cost[i - 2]);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }
};`,
        Python: `class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        two_back = one_back = 0
        for index in range(2, len(cost) + 1):
            two_back, one_back = one_back, min(
                one_back + cost[index - 1],
                two_back + cost[index - 2],
            )
        return one_back`,
      },
    },
  },
  "House Robber II": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(2^n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    },
    explanation: {
      "Naive Approach": "Because the first and last houses are adjacent, use recursion to explore choices in two cases: exclude the first house or exclude the last.",
      "Best Approach": "Use a rolling two-value DP for each range, excluding the first or last house, and return the larger total.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(robFrom(nums, 0, nums.length - 2),
                        robFrom(nums, 1, nums.length - 1));
    }

    private int robFrom(int[] nums, int index, int end) {
        if (index > end) return 0;
        return Math.max(
            robFrom(nums, index + 1, end),
            nums[index] + robFrom(nums, index + 2, end)
        );
    }
}`,
        "C++": `class Solution {
    int robFrom(vector<int>& nums, int index, int end) {
        if (index > end) return 0;
        return max(robFrom(nums, index + 1, end),
                   nums[index] + robFrom(nums, index + 2, end));
    }
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];
        return max(robFrom(nums, 0, nums.size() - 2),
                   robFrom(nums, 1, nums.size() - 1));
    }
};`,
        Python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        def rob_from(index: int, end: int) -> int:
            if index > end:
                return 0
            return max(
                rob_from(index + 1, end),
                nums[index] + rob_from(index + 2, end),
            )

        return max(
            rob_from(0, len(nums) - 2),
            rob_from(1, len(nums) - 1),
        )`,
      },
      "Best Approach": {
        Java: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(robRange(nums, 0, nums.length - 2),
                        robRange(nums, 1, nums.length - 1));
    }

    private int robRange(int[] nums, int left, int right) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = left; i <= right; i++) {
            int current = Math.max(oneBack, twoBack + nums[i]);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }
}`,
        "C++": `class Solution {
    int robRange(vector<int>& nums, int left, int right) {
        int twoBack = 0;
        int oneBack = 0;
        for (int i = left; i <= right; i++) {
            int current = max(oneBack, twoBack + nums[i]);
            twoBack = oneBack;
            oneBack = current;
        }
        return oneBack;
    }
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];
        return max(robRange(nums, 0, nums.size() - 2),
                   robRange(nums, 1, nums.size() - 1));
    }
};`,
        Python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        def rob_range(left: int, right: int) -> int:
            two_back = one_back = 0
            for index in range(left, right + 1):
                two_back, one_back = one_back, max(
                    one_back, two_back + nums[index]
                )
            return one_back

        return max(
            rob_range(0, len(nums) - 2),
            rob_range(1, len(nums) - 1),
        )`,
      },
    },
  },
};
