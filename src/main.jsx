import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { dpSolutions } from "./dp-solutions.js";
import { masteryGroups, normalizeProblem } from "./mastery-catalog.js";
import { supplementalDsaProblems } from "./supplemental-problems.js";
import "./styles.css";

const Icon = ({ name, size = 18, className = "" }) => {
  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    back: <path d="m15 18-6-6 6-6" />,
    grid: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /><path d="M8 7h8m-8 4h8" /></>,
    notes: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" /><path d="M8 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6.05 11A22 22 0 0 1 12 15Z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0m1 7v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01" /></>,
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14ZM5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8L5 2Z" /></>,
    bookmark: <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4V4.75Z" />,
    play: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m10 9 5 3-5 3V9Z" /></>,
    code: <><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></>,
  };
  return <svg {...shared}>{paths[name] || null}</svg>;
};

const makeDay = (title, items) => ({
  title,
  problems: items.map(([name, level]) => ({
    name, level, article: "guide", companies: ["google", "amazon", "microsoft"],
  })),
});

const curriculumDays = [
  makeDay("Day 1 : Array (Part 1)", [
    ["Repeat & missing number", "Easy"], ["Merge 2 sorted array without extra space", "Easy"], ["Single Number", "Easy"], ["Stock Buy & Sell", "Easy"], ["Pow (x^n)", "Medium"], ["Majority Element", "Medium"],
  ]),
  makeDay("Day 2 : Array (Part 2)", [
    ["Kadane's Algorithm", "Medium"], ["Sort array of 0s, 1s & 2s", "Medium"], ["4Sum", "Medium"], ["3Sum", "Medium"], ["Container with most water", "Medium"], ["Search in 2D matrix", "Medium"],
  ]),
  makeDay("Day 3 : Array (Part 3)", [
    ["Set matrix zeroes", "Medium"], ["Word search", "Medium"], ["Next permutation", "Medium"], ["Product of array except self", "Medium"], ["Merge overlapping intervals", "Medium"], ["Longest substring without repeating", "Medium"],
  ]),
  makeDay("Day 4 : Array (Part 4)", [
    ["Spiral Matrix", "Medium"], ["Subarray sum equals k", "Medium"], ["Find Duplicate", "Medium"], ["Count Inversions", "Hard"], ["Search in Sorted matrix II", "Medium"],
  ]),
  makeDay("Day 5 : Array (Part 5)", [
    ["Trapping Rainwater", "Hard"], ["Sliding Window Maximum", "Hard"], ["Largest Rectangle in a Histogram", "Hard"], ["Reverse Pairs", "Hard"],
  ]),
  makeDay("Day 6 : Strings (Part 1)", [
    ["Valid Palindrome", "Easy"], ["Valid Anagram", "Easy"], ["String Compression", "Medium"], ["Reverse Words in String", "Medium"], ["Remove All Occurrences", "Medium"], ["Permutation in String", "Medium"],
  ]),
  makeDay("Day 7 : Strings (Part 2)", [
    ["Group Anagrams", "Medium"], ["Minimum Window Substring", "Hard"], ["Longest Common Prefix", "Easy"], ["KMP Algorithm", "Hard"], ["Robin-Karp Algorithm", "Hard"], ["Reverse Words in String", "Medium"],
  ]),
  makeDay("Day 8 : Binary Search", [
    ["Aggressive Cows", "Medium"], ["Peak Index in Mountain Array", "Medium"], ["Search in Rotated Sorted Array", "Medium"], ["Single Element in Sorted Array", "Medium"], ["Allocate Minimum Pages", "Medium"], ["Painter's Partition", "Medium"], ["Median of 2 Sorted Arrays", "Hard"],
  ]),
  makeDay("Day 9 : Recursion & Backtracking", [
    ["N Queens", "Hard"], ["Palindrome Partitioning", "Medium"], ["M-Coloring Problem", "Medium"], ["Combination Sum I", "Medium"], ["Combination Sum II", "Medium"], ["Sudoku Solver", "Hard"],
  ]),
  makeDay("Day 10 : Recursion & Backtracking", [
    ["Merge Sort", "Easy"], ["Knights Tour", "Medium"], ["Subsets II", "Medium"], ["Rat in a Maze", "Medium"], ["Count Inversions", "Hard"],
  ]),
  makeDay("Day 11 : Linked List (Part 1)", [
    ["Middle of a Linked List", "Easy"], ["Reverse Linked List", "Easy"], ["Remove Cycle in a LL", "Medium"], ["Detect Cycle in a LL", "Easy"], ["Merge 2 Sorted LL", "Easy"], ["Flatten a Linked List", "Medium"],
  ]),
  makeDay("Day 12 : Linked List (Part 2)", [
    ["Is LL a Palindrome or Not", "Easy"], ["Clone List with Random Pointers", "Medium"], ["Reverse Linked List II", "Medium"], ["Add 2 Numbers", "Medium"], ["Reverse Nodes in K Groups", "Hard"], ["Rotate a Linked List", "Medium"],
  ]),
  makeDay("Day 13 : Stacks & Queues (Part 1)", [
    ["Implement Queue using Stack", "Easy"], ["Valid Parentheses", "Easy"], ["Next Greater Element I", "Easy"], ["Implement Stack using Queue", "Easy"], ["1st Non Repeating in Stream", "Easy"], ["Reverse 1st K Elements of Queue", "Easy"],
  ]),
  makeDay("Day 14 : Stacks & Queues (Part 2)", [
    ["Next Greater Element II", "Medium"], ["Celebrity Problem", "Medium"], ["LRU Cache", "Medium"], ["Time needed to Buy Tickets", "Easy"], ["Get Min Element from Stack", "Medium"],
  ]),
  makeDay("Day 15 : Stacks & Queues (Part 3)", [
    ["Stock Span", "Medium"], ["Rotten Oranges", "Medium"], ["Sort a Stack", "Medium"], ["Circular Tour / Gas Station", "Medium"], ["Max Area in Histogram", "Hard"],
  ]),
  makeDay("Day 16 : Binary Trees (Part 1)", [
    ["Preorder Traversal", "Easy"], ["Level Order Traversal", "Medium"], ["Inorder Traversal", "Easy"], ["Minimum Distance between Nodes", "Easy"], ["Symmetric Tree", "Easy"], ["Postorder Traversal", "Easy"],
  ]),
  makeDay("Day 17 : Binary Trees (Part 2)", [
    ["Subtree of Another Tree", "Easy"], ["Is Tree Height Balanced", "Easy"], ["Morris Inorder Traversal", "Easy"], ["Diameter of a Tree", "Easy"], ["Are 2 Trees Identical or Not", "Easy"], ["Check if BT Mirror of itself or not", "Easy"],
  ]),
  makeDay("Day 18 : Binary Trees (Part 3)", [
    ["Transform to Sum Tree", "Medium"], ["Bottom View of a Tree", "Medium"], ["Top View of a Tree", "Medium"], ["Lowest Common Ancestor (LCA)", "Medium"], ["Kth Level of Tree", "Medium"], ["Construct BT from Inorder & Preorder", "Medium"],
  ]),
  makeDay("Day 19 : Binary Trees (Part 4)", [
    ["Flatten BT to LL", "Medium"], ["Max Path Sum", "Hard"], ["Max Width of BT", "Medium"], ["Construct BT from Inorder and Postorder", "Medium"], ["Zig Zag Traversal of BT", "Medium"], ["Kth Ancestor", "Hard"],
  ]),
  makeDay("Day 20 : BST (Part 1)", [
    ["Validate BST", "Medium"], ["LCA in BST", "Hard"], ["Kth largest in BST", "Easy"], ["Sorted Array to Balanced BST", "Easy"], ["Kth Smallest in BST", "Medium"],
  ]),
  makeDay("Day 21 : BST (Part 2)", [
    ["Recover BST", "Hard"], ["Flatten BST to Sorted list", "Medium"], ["BST Iterator", "Easy"], ["Populate Next Right Pointers", "Medium"], ["Construct from Preorder", "Medium"],
  ]),
  makeDay("Day 22 : BST (Part 3)", [
    ["Merge 2 BSTs", "Hard"], ["Serialize & Deserialize BST", "Hard"], ["Inorder Predecessor", "Medium"], ["Largest BST in BT", "Medium"], ["Inorder Successor", "Medium"],
  ]),
  makeDay("Day 23 : Heaps", [
    ["Heap Sort", "Medium"], ["Merge K Sorted Arrays", "Easy"], ["K most Frequent Elements", "Medium"], ["Median from Stream", "Hard"], ["Smallest Range in K Sorted List", "Hard"], ["Kth Smallest Element", "Medium"],
  ]),
  makeDay("Day 24 : Tries", [
    ["Word Break Problem", "Medium"], ["Implement a Trie", "Medium"], ["Longest String with All Prefix", "Medium"], ["Implement a Phone Directory", "Medium"], ["Longest Common Prefix", "Easy"],
  ]),
  makeDay("Day 25 : Graphs (Part 1)", [
    ["BFS : Breadth First Search", "Medium"], ["DFS : Depth First Search", "Medium"], ["Detect Cycle in Undirected using BFS", "Medium"], ["Detect Cycle in Undirected using DFS", "Medium"], ["Detect Cycle in Directed using DFS", "Medium"], ["Detect Cycle in Directed using BFS", "Medium"],
  ]),
  makeDay("Day 26 : Graphs (Part 2)", [
    ["Flood Fill Algorithm", "Easy"], ["Topological Sorting (DFS)", "Medium"], ["Topological Sorting (BFS)", "Medium"], ["Course Schedule II", "Medium"], ["Cheapest Flights within K Stops", "Medium"], ["Dijkstra's Algorithm", "Hard"],
  ]),
  makeDay("Day 27 : Graphs (Part 3)", [
    ["Rotten Oranges", "Medium"], ["Bellman Ford Algorithm", "Hard"], ["Prim's Algorithm (MST)", "Hard"], ["Floyd Warshall Algorithm", "Hard"], ["Kruskal's Algorithm (MST)", "Hard"], ["Clone a Graph", "Medium"], ["Matrix", "Medium"],
  ]),
  makeDay("Day 28 : Graphs (Part 4)", [
    ["Number of Provinces", "Medium"], ["Number of Islands", "Medium"], ["Is Graph Bipartite?", "Medium"], ["Strongly Connected Components (Kosaraju's)", "Hard"], ["Most Stones Removed", "Medium"], ["Number of Ways to Arrive at Destination", "Medium"], ["Critical Connections in a Network", "Hard"],
  ]),
  makeDay("Day 29 : DP (Part 1)", [
    ["0-1 Knapsack", "Medium"], ["Coin Change", "Medium"], ["Buy & Sell Stocks I", "Easy"], ["Target Sum Subset", "Medium"], ["Unbounded Knapsack", "Medium"],
  ]),
  makeDay("Day 30 : DP (Part 2)", [
    ["Longest Common Substring", "Medium"], ["Longest Common Subsequence", "Medium"], ["Longest Increasing Subsequence", "Medium"], ["Edit Distance", "Medium"], ["Longest Palindromic Subsequence", "Medium"], ["Buy & Sell Stocks II", "Medium"],
  ]),
  makeDay("Day 31 : DP (Part 3)", [
    ["Nth Catalan", "Medium"], ["Unique BSTs", "Medium"], ["Rod Cutting", "Hard"], ["Palindromic Partitioning", "Medium"], ["MCM", "Hard"],
  ]),
  makeDay("Day 32 : DP (Part 4)", [
    ["Minimum Partitioning", "Hard"], ["Max Product Subarray", "Medium"], ["Wildcard Pattern Matching", "Hard"], ["Longest Bitonic Subsequence", "Hard"], ["Egg Dropping", "Hard"],
  ]),
  makeDay("Day 33 : Greedy", [
    ["Fractional Knapsack", "Medium"], ["Assign Cookies", "Easy"], ["Indian Coins", "Easy"], ["Job Scheduling", "Medium"], ["Activity Selection", "Medium"], ["Max Length of Pair Chain", "Medium"],
  ]),
  makeDay("Day 34 : Miscellaneous", [
    ["Power Set", "Medium"], ["Max XOR of Two Numbers", "Medium"], ["Power of Two", "Easy"], ["XOR Beauty of Array", "Medium"], ["Watering Plants II", "Medium"],
  ]),
];

const existingProblemNames = new Set();
const uniqueCurriculumDays = curriculumDays.map((day) => ({
  ...day,
  problems: day.problems.filter((problem) => {
    const key = normalizeProblem(problem.name);
    if (existingProblemNames.has(key)) return false;
    existingProblemNames.add(key);
    return true;
  }),
})).filter((day) => day.problems.length);
const masteryTopicDays = masteryGroups.map(([topic, , problems]) => ({
  title: `Topic : ${topic}`,
  problems: problems
    .filter((problem) => {
      const key = normalizeProblem(problem.name);
      if (existingProblemNames.has(key)) return false;
      existingProblemNames.add(key);
      return true;
    })
    .map((problem) => ({
      ...problem,
      article: "guide",
      companies: ["google", "amazon", "microsoft"],
    })),
})).filter((day) => day.problems.length);
const dsaTopics = [
  "01 Arrays", "02 Strings", "03 Hashing", "04 Two Pointers", "05 Sliding Window",
  "06 Binary Search", "07 Recursion", "08 Backtracking", "09 Linked List", "10 Stack",
  "11 Queue & Deque", "12 Trees", "13 BST", "14 Heap / Priority Queue",
  "15 Trie", "16 Graphs", "17 Greedy", "18 Dynamic Programming", "19 Bit Manipulation",
  "20 Math & Number Theory",
];
const topicIndexByName = new Map(dsaTopics.map((topic, index) => [topic.slice(3), index]));
topicIndexByName.set("Binary Search Tree", topicIndexByName.get("BST"));
const masteryTopicFallbacks = {
  "Arrays & Hashing": "Hashing",
  "Two Pointers": "Two Pointers",
  "Sliding Window": "Sliding Window",
  "Binary Search": "Binary Search",
  "Stack & Monotonic Stack": "Stack",
  "Linked List": "Linked List",
  Trees: "Trees",
  Graphs: "Graphs",
  "Dynamic Programming": "Dynamic Programming",
  Backtracking: "Backtracking",
  Intervals: "Greedy",
  Greedy: "Greedy",
  "Heap / Priority Queue": "Heap / Priority Queue",
  Trie: "Trie",
  "Bit Manipulation": "Bit Manipulation",
  "Prefix Sum & Difference Array": "Arrays",
  "Math & Number Theory": "Math & Number Theory",
  "Matrix / 2D Array": "Arrays",
  "Advanced Graphs": "Graphs",
  "Advanced DP": "Dynamic Programming",
};
const explicitProblemTopics = new Map(Object.entries({
  "3sum": "Two Pointers",
  "4sum": "Two Pointers",
  "circular tour": "Queue & Deque",
  "container with most water": "Two Pointers",
  "find first and last position": "Binary Search",
  "find median from data stream": "Heap / Priority Queue",
  "gas station": "Greedy",
  "group anagrams": "Hashing",
  "is subsequence": "Two Pointers",
  "longest common subsequence": "Dynamic Programming",
  "longest common substring": "Dynamic Programming",
  "longest consecutive sequence": "Hashing",
  "longest increasing subsequence": "Dynamic Programming",
  "longest palindromic subsequence": "Dynamic Programming",
  "longest substring without repeating characters": "Sliding Window",
  "maximum subarray": "Dynamic Programming",
  "majority element": "Hashing",
  "merge 2 sorted array without extra space": "Two Pointers",
  "merge sorted array": "Two Pointers",
  "minimum window substring": "Sliding Window",
  "minimum size subarray sum": "Sliding Window",
  "missing number": "Arrays",
  "number of islands": "Graphs",
  "permutation in string": "Sliding Window",
  "product of array except self": "Arrays",
  "pow (x^n)": "Math & Number Theory",
  "search in rotated sorted array": "Binary Search",
  "subarray sum equals k": "Hashing",
  "two sum": "Hashing",
  "valid anagram": "Hashing",
  "valid palindrome": "Two Pointers",
  "valid parentheses": "Stack",
  "watering plants ii": "Two Pointers",
  "merge intervals": "Arrays",
  "word break": "Dynamic Programming",
  "word break ii": "Dynamic Programming",
  "word ladder": "Graphs",
  "word search ii": "Trie",
}).map(([name, topic]) => [normalizeProblem(name), topic]));
const existingTopicByDay = (title) => {
  if (title.startsWith("Topic : ")) return masteryTopicFallbacks[title.slice(8)] || "Arrays";
  if (/Strings/i.test(title)) return "Strings";
  if (/Linked List/i.test(title)) return "Linked List";
  if (/Stacks & Queues/i.test(title)) return "Stack";
  if (/Binary Trees/i.test(title)) return "Trees";
  if (/\bBST\b/i.test(title)) return "Binary Search Tree";
  if (/Heaps/i.test(title)) return "Heap / Priority Queue";
  if (/Tries/i.test(title)) return "Trie";
  if (/Graphs/i.test(title)) return "Graphs";
  if (/\bDP\b/i.test(title)) return "Dynamic Programming";
  if (/Greedy/i.test(title)) return "Greedy";
  if (/Recursion/i.test(title)) return "Recursion";
  return "Arrays";
};
const problemTopic = (problem, fallbackTopic) => {
  const name = problem.name.toLowerCase();
  const explicitTopic = explicitProblemTopics.get(normalizeProblem(problem.name));
  if (explicitTopic) return explicitTopic;
  if (/bitwise|\bxor\b|\bbits?\b|power of two|single number/.test(name)) return "Bit Manipulation";
  if (/bst|binary search tree|kth .*in bst|inorder .*bst|preorder .*bst|validate bst|recover bst|lowest common ancestor of a binary|lca in bst|sorted array to.*bst/.test(name)) return "BST";
  if (/graph|islands|provinces|course schedule|topological|dijkstra|bellman|floyd|kruskal|prim|mst|network delay|cheapest flights|critical connections|flood fill|bipartite|connected components|shortest path|minimum genetic mutation|bus routes|open the lock/.test(name)) return "Graphs";
  if (/trie|prefix tree|phone directory|autocomplete|search suggestions|word search ii/.test(name)) return "Trie";
  if (/linked list|linked-list|\bll\b|random pointer|k group|k groups|merge 2 sorted ll|middle of a linked/.test(name)) return "Linked List";
  if (/implement queue|queue using|queue reconstruction|circular queue|deque|first non.?repeating|non.?repeating in stream|reverse .*queue|time needed to buy tickets|circular tour/.test(name)) return "Queue & Deque";
  if (/stack|histogram|daily temperatures|next greater|stock span|largest rectangle|valid parentheses|min stack|remove all occurrences/.test(name)) return "Stack";
  if (/heap|priority queue|kth largest|kth smallest|median.*(?:stream|data stream)|median finder|merge k sorted|smallest range|last stone weight|k closest|top k frequent/.test(name)) return "Heap / Priority Queue";
  if (/sliding window|minimum window|minimum size subarray sum|subarray continuous|make array continuous|permutation in string|longest substring without repeating|subarray product less than|character replacement|maximum average subarray|max consecutive ones/.test(name)) return "Sliding Window";
  if (/two pointers|3sum|4sum|container with most water|valid palindrome|trapping rainwater|trapping rain water|move zeroes|remove duplicates|pair with|merge .*sorted array|is subsequence/.test(name)) return "Two Pointers";
  if (/binary search|search in .*matrix|search a .*matrix|search in rotated|search insert|first and last position|peak index|find peak|koko eating|median of .*sorted|allocate .*pages|aggressive cows|painter/.test(name)) return "Binary Search";
  if (/hash|frequency|two sum|contains duplicate|group anagrams|top k frequent|subarray sum|subarray sums|contiguous array|count pairs|anagram|longest consecutive sequence|majority element/.test(name)) return "Hashing";
  if (/backtrack|n.?queens|sudoku|combination sum|permutation|subsets|power set|rat in a maze|knights tour|matchsticks|partition to k equal|restore ip|letter combinations|expression add operators|palindrome partition|word search/.test(name)) return "Backtracking";
  if (/dynamic programming|knapsack|coin change|climb|fibonacci|house robber|edit distance|longest common subsequence|longest common substring|longest increasing subsequence|longest bitonic|longest palindromic subsequence|max(?:imum)? product subarray|target sum|partition equal|rod cutting|catalan|unique paths|minimum path|burst balloons|stock.*iii|stock.*iv|stock.*cooldown|egg drop|palindromic partitioning dp|word break|maximum subarray|kadane/.test(name)) return "Dynamic Programming";
  if (/interval|meeting room|arrows to burst|job scheduling|activity selection|fractional knapsack|assign cookies|jump game|gas station|candy|boats to save|pair chain|greedy|minimum number of taps|video stitching|car pooling|task scheduler/.test(name)) return "Greedy";
  if (/pow\(|power of|sqrt|prime|sieve|gcd|greatest common divisor|lcm|number of good pairs|water bottles|bulb switcher|factorial|integer break|calculator|math|roman|plus one|add binary|perfect squares/.test(name)) return "Math & Number Theory";
  if (/palindrome|anagram|string|substring|character|atoi|common prefix/.test(name)) {
    if (/longest common prefix|common prefix/.test(name) && fallbackTopic === "Trie") return "Trie";
    return "Strings";
  }
  if (/recursion|merge sort|quick sort|tower of hanoi|recursive/.test(name)) return "Recursion";
  if (/tree|binary tree|diameter|symmetric|preorder|inorder|postorder|level order|subtree|ancestor|path sum|morris|zig zag|zigzag|bottom view|top view|width of bt|sum tree/.test(name)) return "Trees";
  return fallbackTopic;
};
const subtopicForProblem = (problem, topic) => {
  const name = problem.name.toLowerCase();
  const includes = (pattern) => pattern.test(name);
  const subtopics = {
    Arrays: [
      [/matrix|2d|spiral|grid|set matrix|rotate image/, "Matrix / 2D Array"],
      [/merge intervals|insert interval|non.?overlapping intervals|meeting rooms|minimum number of arrows|interval/, "Intervals"],
      [/cyclic sort|first missing positive|find all numbers disappeared|find the duplicate number|find duplicate|repeat.*missing|missing.*repeat/, "Cyclic Sort"],
      [/difference array|range addition|flight bookings|maximum population year|car pooling/, "Difference Array"],
      [/maximum subarray|kadane|maximum sum circular subarray/, "Kadane's Algorithm"],
      [/prefix|subarray sum|subarray sums|pivot index|running sum|range sum/, "Prefix Sum"],
      [/sort|inversions|reverse pairs|sort colors|sort an array/, "Sorting"],
      [/product of array|rotate|permutation|majority element|stock buy|stock & sell|water bottles/, "Advanced Arrays"],
      [/.*/, "Basic Arrays"],
    ],
    Strings: [
      [/kmp|rabin|robin.?karp|substring search|z algorithm|strstr|find.*pattern/, "String Matching"],
      [/wildcard|regular expression|pattern matching/, "Pattern Matching"],
      [/palindrome/, "Palindromes"],
      [/reverse|compress|remove|replace|convert|atoi|roman|rotate/, "String Manipulation"],
      [/.*/, "Fundamentals"],
    ],
    Hashing: [
      [/prefix|running sum|range sum|pivot index/, "Prefix Sum + Hashing"],
      [/subarray.*(?:sum|equal|count)|count.*subarray|subarray.*xor|contiguous array/, "Subarray Hashing"],
      [/anagram|frequency|count.*character|top k frequent|majority element/, "Frequency"],
      [/.*/, "Hash Map / Set"],
    ],
    "Two Pointers": [
      [/cycle|middle of|fast.?slow|happy number|circular array loop/, "Fast & Slow"],
      [/palindrome|reverse|container with most water|trapping rain water|two sum ii/, "Opposite Direction"],
      [/3sum|4sum|pair|triplet|two sum/, "Pair / Triplet"],
      [/merge .*sorted|remove duplicates|move zero|sort colors|is subsequence|boats to save/, "Advanced Two Pointer"],
      [/.*/, "Pair / Triplet"],
    ],
    "Sliding Window": [
      [/k constraint|at most .*distinct|exactly .*distinct|fruit into baskets|longest substring with at most/, "K Constraint Problems"],
      [/anagram|frequency|permutation in string|character replacement|longest substring|minimum window/, "Frequency Window"],
      [/minimum size subarray|longest.*subarray|smallest.*subarray|subarray product less than|min.*window/, "Variable Window"],
      [/maximum|fixed|average|sliding window maximum/, "Fixed Window"],
      [/.*/, "Variable Window"],
    ],
    "Binary Search": [
      [/matrix|2d/, "Matrix Search"],
      [/rotated|peak|mountain|single element/, "Rotated Array"],
      [/allocate|painter|aggressive|koko|minimum speed|capacity|minimum time|smallest divisor|ship.*within/, "Binary Search on Answer"],
      [/.*/, "Sorted Array"],
    ],
    Recursion: [
      [/merge sort|quick sort|inversion|binary search/, "Divide & Conquer"],
      [/subsequence|subset|power set|generate.*subsequence/, "Subsequences"],
      [/tower of hanoi|permutation|combination|fibonacci|factorial|sum of/, "Recursive Patterns"],
      [/.*/, "Basic Recursion"],
    ],
    Backtracking: [
      [/n.?queens|sudoku|knights|m.?color|matchsticks|partition to k equal/, "Constraint Problems"],
      [/maze|word search|path|flood fill|unique paths|rat in/, "Grid / Path"],
      [/combination|coin change/, "Combinations"],
      [/permutation/, "Permutations"],
      [/subset|power set/, "Subsets"],
      [/.*/, "Subsets"],
    ],
    "Linked List": [
      [/random pointer|copy list|clone.*list/, "Random Pointer"],
      [/merge|add 2 numbers|add two numbers|add.*linked list/, "Merge"],
      [/reorder|swap.*pair|odd even|partition list|k group/, "Reorder"],
      [/reverse|rotate/, "Reverse"],
      [/cycle|loop|middle|fast.?slow|intersection/, "Fast & Slow"],
      [/.*/, "Basic"],
    ],
    Stack: [
      [/next greater|stock span|daily temperatures|histogram|largest rectangle|132 pattern/, "Monotonic Stack"],
      [/parentheses|bracket|valid expression/, "Parentheses"],
      [/implement stack|min stack|get min|sort a stack|design.*stack/, "Basic"],
      [/.*/, "Stack Applications"],
    ],
    "Queue & Deque": [
      [/sliding window|maximum in window/, "Monotonic Queue"],
      [/deque/, "Deque"],
      [/.*/, "Queue"],
    ],
    Trees: [
      [/construct|build|serialize|deserialize|flatten|convert.*tree|populate next/, "Construction"],
      [/lowest common ancestor|\blca\b/, "LCA"],
      [/path|sum.*tree|tree.*sum|root to leaf/, "Path Problems"],
      [/level order|breadth.?first|zig.?zag|bfs/, "BFS / DFS"],
      [/preorder|inorder|postorder|morris|traversal|view of|dfs/, "Traversals"],
      [/diameter|width|depth|height|balanced|same tree|symmetric|subtree|maximum path/, "Tree Properties"],
      [/.*/, "Tree Properties"],
    ],
    BST: [
      [/iterator/, "Iterator"],
      [/construct|sorted array|preorder/, "Construction"],
      [/recover|validate|largest bst|is valid/, "Validation"],
      [/kth|lca|lowest common/, "LCA / Kth Smallest"],
      [/.*/, "Search / Insert / Delete"],
    ],
    "Heap / Priority Queue": [
      [/merge k|smallest range|k sorted|k-way/, "K-Way Merge"],
      [/median|stream/, "Median"],
      [/kth|top k|frequent|closest|smallest|largest/, "Top K"],
      [/.*/, "Priority Queue Problems"],
    ],
    Trie: [
      [/search suggestion|suggestion|autocomplete|phone directory/, "Suggestions"],
      [/search|prefix/, "Prefix Search"],
      [/word|dictionary|replace|map sum/, "Word Problems"],
      [/.*/, "Fundamentals"],
    ],
    Graphs: [
      [/critical connection|strongly connected|kosaraju|bridges|articulation/, "Bridges / SCC"],
      [/union.?find|disjoint set|accounts merge|most stones removed|redundant connection/, "DSU"],
      [/prim|kruskal|mst|spanning tree|connect all points/, "MST"],
      [/dijkstra|bellman|floyd|shortest path|cheapest flight|network delay|minimum effort|path with minimum/, "Shortest Path"],
      [/topological|course schedule|alien dictionary/, "Topological Sort"],
      [/bipartite|two color/, "Bipartite"],
      [/detect cycle|cycle in|cycle detection/, "Cycle Detection"],
      [/provinces|islands|connected component|number of component|surrounded regions/, "Components"],
      [/bfs|dfs|breadth|depth|flood fill|clone graph|rotting oranges|word ladder|open the lock|bus routes/, "BFS / DFS"],
      [/.*/, "BFS / DFS"],
    ],
    Greedy: [
      [/job scheduling|activity selection|meeting room|task scheduler|course schedule/, "Scheduling"],
      [/interval|calendar|arrows|video stitching|car pooling/, "Intervals"],
      [/fractional|huffman|refuel|minimum cost|assign cookies|candy|boats|gas station|jump|reach|minimum number of taps|pair chain/, "Optimization"],
      [/.*/, "Greedy Basics"],
    ],
    "Dynamic Programming": [
      [/matrix chain|burst balloons|cut a stick|strange printer|remove boxes|palindromic partitioning dp/, "Interval DP"],
      [/stock|buy.*sell/, "Stock DP"],
      [/unique paths|minimum path|triangle|cherry pickup|dungeon|grid/, "Grid DP"],
      [/catalan|generate parentheses|unique bsts|mountain ranges|convex polygons|numbers at most n|number of ways/, "Counting DP"],
      [/knapsack|coin change|partition|target sum|rod cutting|last stone|subset sum/, "Knapsack"],
      [/longest common|edit distances?|word break|subsequence|substring|distinct subsequence|interleaving|wildcard|regular expression|bitonic/, "Subsequences / LCS"],
      [/fibonacci|climb|stairs|house robber|frog jump|maximum subarray|kadane|maximum product/, "1D DP"],
      [/.*/, "Advanced DP"],
    ],
    "Bit Manipulation": [
      [/counting bits|number of 1|hamming|number of bits/, "Bit Counting"],
      [/subset|mask/, "Bit Masks"],
      [/xor/, "XOR"],
      [/.*/, "Bit Basics"],
    ],
    "Math & Number Theory": [
      [/prime|sieve|factorial|trailing zero|factorization|factor/, "Prime / Factorization"],
      [/gcd|greatest common|lcm|fraction/, "GCD / LCM"],
      [/power|pow|sqrt|integer break|fast exponentiation/, "Powers"],
      [/number theory|modular|divisibility|ugly number|perfect squares|bulb switcher/, "Number Theory"],
      [/.*/, "Basic Math"],
    ],
  };
  return (subtopics[topic] || [[/.*/, `${topic} Fundamentals`]]).find(([pattern]) => includes(pattern))[1];
};
const allUniqueDsaProblems = [
  ...uniqueCurriculumDays.flatMap((day) => day.problems.map((problem) => ({ ...problem, sourceTopic: existingTopicByDay(day.title) }))),
  ...masteryTopicDays.flatMap((day) => day.problems.map((problem) => ({ ...problem, sourceTopic: existingTopicByDay(day.title) }))),
];
supplementalDsaProblems.forEach((problem) => {
  const key = normalizeProblem(problem.name);
  if (existingProblemNames.has(key)) return;
  existingProblemNames.add(key);
  const { topic: supplementalTopic, subtopic: supplementalSubtopic, ...problemDetails } = problem;
  allUniqueDsaProblems.push({
    ...problemDetails,
    topicOverride: supplementalTopic.replace(/^\d+\s+/, ""),
    subtopicOverride: supplementalSubtopic,
    article: "guide",
    companies: ["google", "amazon", "microsoft"],
  });
});
const minimumTopicAdditions = [
  ["3Sum Closest", "Medium", "Two Pointers", "3sum-closest"],
  ["Boats to Save People", "Medium", "Two Pointers", "boats-to-save-people"],
  ["Squares of a Sorted Array", "Easy", "Two Pointers", "squares-of-a-sorted-array"],
  ["Remove Duplicates from Sorted Array II", "Medium", "Two Pointers", "remove-duplicates-from-sorted-array-ii"],
  ["Max Consecutive Ones III", "Medium", "Sliding Window", "max-consecutive-ones-iii"],
  ["Find All Anagrams in a String", "Medium", "Sliding Window", "find-all-anagrams-in-a-string"],
  ["Longest Repeating Character Replacement", "Medium", "Sliding Window", "longest-repeating-character-replacement"],
  ["Subarray Sums Divisible by K", "Medium", "Sliding Window", "subarray-sums-divisible-by-k"],
  ["Minimum Recolors to Get K Consecutive Black Blocks", "Easy", "Sliding Window", "minimum-recolors-to-get-k-consecutive-black-blocks"],
  ["K-th Symbol in Grammar", "Medium", "Recursion", "k-th-symbol-in-grammar"],
  ["Different Ways to Add Parentheses", "Medium", "Recursion", "different-ways-to-add-parentheses"],
  ["Decode String", "Medium", "Recursion", "decode-string"],
  ["Score of Parentheses", "Medium", "Recursion", "score-of-parentheses"],
  ["Special Binary String", "Hard", "Recursion", "special-binary-string"],
  ["Maximum Binary Tree", "Medium", "Recursion", "maximum-binary-tree"],
  ["Nested List Weight Sum", "Medium", "Recursion", "nested-list-weight-sum"],
  ["Nested List Weight Sum II", "Medium", "Recursion", "nested-list-weight-sum-ii"],
  ["Count Univalue Subtrees", "Medium", "Recursion", "count-univalue-subtrees"],
  ["Sum of Left Leaves", "Easy", "Recursion", "sum-of-left-leaves"],
  ["Elimination Game", "Medium", "Recursion", "elimination-game"],
  ["Design Circular Queue", "Medium", "Queue & Deque", "design-circular-queue"],
  ["Design Circular Deque", "Medium", "Queue & Deque", "design-circular-deque"],
  ["Number of Recent Calls", "Easy", "Queue & Deque", "number-of-recent-calls"],
  ["Dota2 Senate", "Medium", "Queue & Deque", "dota2-senate"],
  ["Reveal Cards In Increasing Order", "Medium", "Queue & Deque", "reveal-cards-in-increasing-order"],
  ["Moving Average from Data Stream", "Easy", "Queue & Deque", "moving-average-from-data-stream"],
];
minimumTopicAdditions.forEach(([name, level, topicOverride, slug]) => {
  const key = normalizeProblem(name);
  if (existingProblemNames.has(key)) return;
  existingProblemNames.add(key);
  allUniqueDsaProblems.push({
    name,
    level,
    slug,
    article: "guide",
    companies: ["google", "amazon", "microsoft"],
    topicOverride,
  });
});
const groupedDsaProblems = dsaTopics.map((title) => ({ title, problems: [] }));
const subtopicOrderByMajor = {
  "01 Arrays": ["Basic Arrays", "Sorting", "Prefix Sum", "Difference Array", "Kadane's Algorithm", "Cyclic Sort", "Matrix / 2D Array", "Intervals", "Advanced Arrays"],
  "02 Strings": ["Fundamentals", "String Manipulation", "Palindromes", "String Matching", "Pattern Matching"],
  "03 Hashing": ["Hash Map / Set", "Frequency", "Prefix Sum + Hashing", "Subarray Hashing"],
  "04 Two Pointers": ["Pair / Triplet", "Opposite Direction", "Fast & Slow", "Advanced Two Pointer"],
  "05 Sliding Window": ["Fixed Window", "Variable Window", "Frequency Window", "K Constraint Problems"],
  "06 Binary Search": ["Sorted Array", "Rotated Array", "Binary Search on Answer", "Matrix Search"],
  "07 Recursion": ["Basic Recursion", "Subsequences", "Divide & Conquer", "Recursive Patterns"],
  "08 Backtracking": ["Subsets", "Permutations", "Combinations", "Grid / Path", "Constraint Problems"],
  "09 Linked List": ["Basic", "Fast & Slow", "Reverse", "Merge", "Reorder", "Random Pointer"],
  "10 Stack": ["Basic", "Parentheses", "Monotonic Stack", "Stack Applications"],
  "11 Queue & Deque": ["Queue", "Deque", "Monotonic Queue"],
  "12 Trees": ["Traversals", "BFS / DFS", "Tree Properties", "LCA", "Path Problems", "Construction"],
  "13 BST": ["Search / Insert / Delete", "Validation", "LCA / Kth Smallest", "Iterator", "Construction"],
  "14 Heap / Priority Queue": ["Top K", "K-Way Merge", "Median", "Priority Queue Problems"],
  "15 Trie": ["Fundamentals", "Prefix Search", "Word Problems", "Suggestions"],
  "16 Graphs": ["BFS / DFS", "Components", "Cycle Detection", "Bipartite", "Topological Sort", "Shortest Path", "MST", "DSU", "Bridges / SCC"],
  "17 Greedy": ["Greedy Basics", "Intervals", "Scheduling", "Optimization"],
  "18 Dynamic Programming": ["1D DP", "Knapsack", "Subsequences / LCS", "Grid DP", "Interval DP", "Stock DP", "Counting DP", "Advanced DP"],
  "19 Bit Manipulation": ["Bit Basics", "XOR", "Bit Counting", "Bit Masks"],
  "20 Math & Number Theory": ["Basic Math", "Powers", "Prime / Factorization", "GCD / LCM", "Number Theory"],
};
allUniqueDsaProblems.forEach((problem) => {
  const classifiedTopic = problem.topicOverride || problemTopic(problem, problem.sourceTopic);
  const topic = classifiedTopic === "Binary Search Tree" ? "BST" : classifiedTopic;
  const topicIndex = topicIndexByName.get(topic) ?? 0;
  const { sourceTopic, topicOverride, subtopicOverride, ...topicProblem } = problem;
  groupedDsaProblems[topicIndex].problems.push({
    ...topicProblem,
    subtopic: subtopicOverride || subtopicForProblem(topicProblem, topic),
  });
});
const days = groupedDsaProblems;

const dpCompanies = ["google", "amazon", "microsoft"];
const makeDpDay = (title, items) => ({
  title,
  problems: items.map(([name, level, more, timeLimit, companies = dpCompanies]) => ({
    name, level, article: "soon", companies, ...(more ? { more } : {}), ...(timeLimit ? { timeLimit } : {}),
  })),
});

const dpDays = [
  makeDpDay("1D DP", [
    ["Fibonacci", "Easy", 6], ["Climbing Stairs", "Easy", 8], ["House Robber", "Medium", 11],
    ["Frog Jump", "Medium", 3, 60, ["microsoft", "oracle", "google"]],
    ["Min Cost Climbing Stairs", "Easy", 0, 45], ["House Robber II", "Medium", 8, 45, ["uber", "visa", "google"]],
  ]),
  makeDpDay("Knapsack", [
    ["0-1 Knapsack Problem", "Medium", 6], ["Last Stones Weight II", "Medium", 3],
    ["Unbounded Knapsack Problem", "Medium"], ["Target Sum", "Medium", 17],
    ["Coin Change Problem", "Medium", 12], ["Partition Equal Subset Sum", "Medium", 7],
    ["Rod Cutting DP", "Hard", 3],
  ]),
  makeDpDay("LCS", [
    ["Longest Common Subsequnce (LCS)", "Medium", 10], ["Box Stacking", "Medium"],
    ["Shortest Common Supersequence", "Hard", 1], ["Longest Increasing Subsequence (LIS)", "Medium", 8],
    ["Edit Distances", "Medium", 12], ["Longest Bitonic Subsequence (LBS)", "Hard", 3],
  ]),
  makeDpDay("Catalan", [
    ["Generate Parentheses", "Medium", 11], ["Number of BSTs", "Medium", 4], ["Catalan Triangle", "Hard"],
    ["Mountain Ranges", "Medium", 3], ["Convex Polygons", "Medium"],
  ]),
  makeDpDay("Grid DP", [
    ["Unique Paths II", "Easy", 3, 45], ["Cherry Pickup II", "Hard", 4],
    ["Unique Paths", "Medium", 12], ["Min Path Sum", "Medium", 4], ["Triangle", "Medium", 5],
    ["Cherry Pickup", "Hard", 5], ["Dungeon Game", "Hard", 5],
  ]),
  makeDpDay("MCM", [
    ["Matrix Chain Multiplication", "Hard"], ["Strange Printer", "Hard", 4], ["Burst Balloons", "Hard", 9],
    ["Min Cost to Cut a Stick", "Hard", 3], ["Longest Palindromic Subsequences", "Medium", 11], ["Remove Boxes", "Hard", 5],
  ]),
  makeDpDay("Stock DP", [
    ["Best Time to Buy and Sell Stock II", "Medium", 12], ["Best Time to Buy and Sell Stock with Cooldown", "Medium", 2],
    ["Best Time to Buy and Sell Stock with Transaction Fee", "Medium", 3],
    ["Best Time to Buy and Sell Stock III", "Hard", 6], ["Best Time to Buy and Sell Stock IV", "Hard", 4],
  ]),
  makeDpDay("Miscellaneous", [
    ["House Robber III", "Medium", 6], ["Numbers At Most N Given Digit Set", "Hard"],
    ["Super Egg Drop", "Hard", 1], ["Partition to K Equal Sum Subsets", "Medium", 2],
    ["Matchsticks to Square", "Medium", 3], ["Word Break", "Medium", 10],
    ["Palindromic Partitioning DP", "Medium", 5], ["Maximum Product Subarray", "Medium", 13],
  ]),
];

const legacyArticleDays = [
  { title: "Day 1 : Array", problems: ["Set Matrix Zeroes", "Pascal's Triangle", "Next Permutation", "Kadane's Algorithm", "Sort an array of 0s, 1s & 2s", "Best Time to Buy and Sell Stock"] },
  { title: "Day 2 : Array", problems: ["Rotate Image", "Merge Intervals", "Merge Sorted Array", "Find the Duplicate Number"] },
  { title: "Day 3 : Array", problems: ["Search in Rotated Sorted Array", "Find First and Last Position", "Search Insert Position"] },
  { title: "Day 4 : Array", problems: ["Two Sum", "4Sum", "Longest Consecutive Sequence"] },
  { title: "Day 5 : Array", problems: ["Reverse Pairs", "Majority Element", "Subarray Sum Equals K"] },
  { title: "Day 6 : Strings", problems: ["Valid Palindrome", "Valid Anagram", "String Compression", "Reverse Words in String", "Remove All Occurrences", "Permutation in String"] },
  { title: "Day 7 : Strings", problems: ["Longest Substring Without Repeating Characters", "Group Anagrams", "Longest Palindromic Substring"] },
  { title: "Day 8 : Binary Search", problems: ["Binary Search", "Search a 2D Matrix", "Koko Eating Bananas"] },
  { title: "Day 9 : Recursion & Backtracking", problems: ["Subsets", "Combination Sum", "Permutations"] },
  { title: "Day 10 : Recursion & Backtracking", problems: ["N-Queens", "Sudoku Solver", "Word Search"] },
  { title: "Day 11 : Linked List", problems: ["Reverse Linked List", "Middle of the Linked List", "Linked List Cycle"] },
  { title: "Day 12 : Linked List", problems: ["Merge Two Sorted Lists", "Remove Nth Node From End", "Add Two Numbers"] },
  { title: "Day 13 : Stacks & Queues", problems: ["Valid Parentheses", "Min Stack", "Implement Queue using Stacks"] },
  { title: "Day 14 : Stacks & Queues", problems: ["Next Greater Element", "Daily Temperatures", "Largest Rectangle in Histogram"] },
  { title: "Day 15 : Stacks & Queues", problems: ["Sliding Window Maximum", "Online Stock Span"] },
  { title: "Day 16 : Binary Trees", problems: ["Maximum Depth of Binary Tree", "Same Tree", "Invert Binary Tree"] },
  { title: "Day 17 : Binary Trees", problems: ["Binary Tree Level Order Traversal", "Diameter of Binary Tree"] },
  { title: "Day 18 : Binary Trees", problems: ["Binary Tree Zigzag Level Order Traversal", "Lowest Common Ancestor"] },
  { title: "Day 19 : Binary Trees", problems: ["Construct Binary Tree", "Serialize and Deserialize Binary Tree"] },
  { title: "Day 20 : BST", problems: ["Validate Binary Search Tree", "Search in a BST"] },
  { title: "Day 21 : BST", problems: ["Lowest Common Ancestor of a BST", "Kth Smallest Element in a BST"] },
  { title: "Day 22 : BST", problems: ["Delete Node in a BST", "Convert Sorted Array to BST"] },
  { title: "Day 23 : Heaps", problems: ["Kth Largest Element", "Top K Frequent Elements"] },
  { title: "Day 24 : Tries", problems: ["Implement Trie", "Word Search II"] },
  { title: "Day 25 : Graphs", problems: ["Number of Islands", "Clone Graph"] },
  { title: "Day 26 : Graphs", problems: ["Course Schedule", "Rotting Oranges"] },
  { title: "Day 27 : Graphs", problems: ["Network Delay Time", "Cheapest Flights Within K Stops"] },
  { title: "Day 28 : Graphs", problems: ["Word Ladder", "Accounts Merge"] },
  { title: "Day 29 : DP", problems: ["Climbing Stairs", "House Robber"] },
  { title: "Day 30 : DP", problems: ["Coin Change", "Longest Increasing Subsequence"] },
  { title: "Day 31 : DP", problems: ["Unique Paths", "Minimum Path Sum"] },
  { title: "Day 32 : DP", problems: ["Edit Distance", "Longest Common Subsequence"] },
  { title: "Day 33 : Greedy", problems: ["Jump Game", "Gas Station"] },
  { title: "Day 34 : Miscellaneous", problems: ["LRU Cache", "Find Median from Data Stream"] },
];

const articleDays = days.map((day) => ({
  title: day.title.replace(/\s+\(Part \d+\)$/, ""),
  problems: day.problems.map((problem) => problem.name),
}));

const companyClass = (company) => company.toLowerCase().replace(/[^a-z]/g, "");
const leetcodeSlugs = {
  "Repeat & missing number": "set-mismatch",
  "Merge 2 sorted array without extra space": "merge-sorted-array",
  "Single Number": "single-number",
  "Stock Buy & Sell": "best-time-to-buy-and-sell-stock",
  "Pow (x^n)": "powx-n",
  "Majority Element": "majority-element",
  "Kadane's Algorithm": "maximum-subarray",
  "Sort an array of 0s, 1s & 2s": "sort-colors",
  "4Sum": "4sum",
  "3Sum": "3sum",
  "Container with most water": "container-with-most-water",
  "Search in 2D matrix": "search-a-2d-matrix",
  "Maximum Subarray": "maximum-subarray",
  "Merge Intervals": "merge-intervals",
  "Find the Duplicate Number": "find-the-duplicate-number",
  "Missing Number": "missing-number",
  "Reverse a Linked List": "reverse-linked-list",
  "Middle of the Linked List": "middle-of-the-linked-list",
  "Set Matrix Zeroes": "set-matrix-zeroes",
  "Pascal's Triangle": "pascals-triangle",
  "Next Permutation": "next-permutation",
  "Valid Anagram": "valid-anagram",
  "Valid Palindrome": "valid-palindrome",
  "String Compression": "string-compression",
  "Reverse Words in String": "reverse-words-in-a-string",
  "Remove All Occurrences": "remove-all-occurrences-of-a-substring",
  "Permutation in String": "permutation-in-string",
  "Fibonacci": "fibonacci-number",
  "Climbing Stairs": "climbing-stairs",
  "House Robber": "house-robber",
  "Min Cost Climbing Stairs": "min-cost-climbing-stairs",
  "House Robber II": "house-robber-ii",
  "Search a 2D Matrix": "search-a-2d-matrix",
  "Reverse Linked List": "reverse-linked-list",
  "Maximum Depth of Binary Tree": "maximum-depth-of-binary-tree",
  "Longest Common Subsequence": "longest-common-subsequence",
  "Longest Increasing Subsequence": "longest-increasing-subsequence",
  "Unique Paths": "unique-paths",
  "Minimum Path Sum": "minimum-path-sum",
  "Coin Change": "coin-change",
  "Edit Distance": "edit-distance",
  "Kadane's Algorithm": "maximum-subarray",
  "Sort array of 0s, 1s & 2s": "sort-colors",
  "Search in 2D matrix": "search-a-2d-matrix",
  "Set matrix zeroes": "set-matrix-zeroes",
  "Word search": "word-search",
  "Next permutation": "next-permutation",
  "Product of array except self": "product-of-array-except-self",
  "Merge overlapping intervals": "merge-intervals",
  "Longest substring without repeating": "longest-substring-without-repeating-characters",
  "Spiral Matrix": "spiral-matrix",
  "Subarray sum equals k": "subarray-sum-equals-k",
  "Find Duplicate": "find-the-duplicate-number",
  "Search in Sorted matrix II": "search-a-2d-matrix-ii",
  "Trapping Rainwater": "trapping-rain-water",
  "Sliding Window Maximum": "sliding-window-maximum",
  "Largest Rectangle in a Histogram": "largest-rectangle-in-histogram",
  "Reverse Pairs": "reverse-pairs",
  "Group Anagrams": "group-anagrams",
  "Minimum Window Substring": "minimum-window-substring",
  "Longest Common Prefix": "longest-common-prefix",
  "Robin-Karp Algorithm": "",
  "Peak Index in Mountain Array": "peak-index-in-a-mountain-array",
  "Search in Rotated Sorted Array": "search-in-rotated-sorted-array",
  "Single Element in Sorted Array": "single-element-in-a-sorted-array",
  "Median of 2 Sorted Arrays": "median-of-two-sorted-arrays",
  "N Queens": "n-queens",
  "Palindrome Partitioning": "palindrome-partitioning",
  "Combination Sum I": "combination-sum",
  "Combination Sum II": "combination-sum-ii",
  "Knights Tour": "",
  "Subsets II": "subsets-ii",
  "Sudoku Solver": "sudoku-solver",
  "Middle of a Linked List": "middle-of-the-linked-list",
  "Remove Cycle in a LL": "",
  "Detect Cycle in a LL": "linked-list-cycle",
  "Merge 2 Sorted LL": "merge-two-sorted-lists",
  "Flatten a Linked List": "",
  "Is LL a Palindrome or Not": "palindrome-linked-list",
  "Clone List with Random Pointers": "copy-list-with-random-pointer",
  "Reverse Linked List II": "reverse-linked-list-ii",
  "Add 2 Numbers": "add-two-numbers",
  "Reverse Nodes in K Groups": "reverse-nodes-in-k-group",
  "Rotate a Linked List": "rotate-list",
  "Implement Queue using Stack": "implement-queue-using-stacks",
  "Valid Parentheses": "valid-parentheses",
  "Next Greater Element I": "next-greater-element-i",
  "Implement Stack using Queue": "implement-stack-using-queues",
  "1st Non Repeating in Stream": "",
  "Next Greater Element II": "next-greater-element-ii",
  "LRU Cache": "lru-cache",
  "Time needed to Buy Tickets": "time-needed-to-buy-tickets",
  "Stock Span": "online-stock-span",
  "Rotten Oranges": "rotting-oranges",
  "Max Area in Histogram": "largest-rectangle-in-histogram",
  "Preorder Traversal": "binary-tree-preorder-traversal",
  "Level Order Traversal": "binary-tree-level-order-traversal",
  "Inorder Traversal": "binary-tree-inorder-traversal",
  "Symmetric Tree": "symmetric-tree",
  "Postorder Traversal": "binary-tree-postorder-traversal",
  "Subtree of Another Tree": "subtree-of-another-tree",
  "Is Tree Height Balanced": "balanced-binary-tree",
  "Diameter of a Tree": "diameter-of-binary-tree",
  "Are 2 Trees Identical or Not": "same-tree",
  "Check if BT Mirror of itself or not": "symmetric-tree",
  "Lowest Common Ancestor (LCA)": "lowest-common-ancestor-of-a-binary-tree",
  "Construct BT from Inorder & Preorder": "construct-binary-tree-from-preorder-and-inorder-traversal",
  "Flatten BT to LL": "flatten-binary-tree-to-linked-list",
  "Max Path Sum": "binary-tree-maximum-path-sum",
  "Max Width of BT": "maximum-width-of-binary-tree",
  "Construct BT from Inorder and Postorder": "construct-binary-tree-from-inorder-and-postorder-traversal",
  "Zig Zag Traversal of BT": "binary-tree-zigzag-level-order-traversal",
  "Validate BST": "validate-binary-search-tree",
  "LCA in BST": "lowest-common-ancestor-of-a-binary-search-tree",
  "Kth largest in BST": "",
  "Sorted Array to Balanced BST": "convert-sorted-array-to-binary-search-tree",
  "Kth Smallest in BST": "kth-smallest-element-in-a-bst",
  "Recover BST": "recover-binary-search-tree",
  "BST Iterator": "binary-search-tree-iterator",
  "Populate Next Right Pointers": "populating-next-right-pointers-in-each-node",
  "Construct from Preorder": "construct-binary-search-tree-from-preorder-traversal",
  "Serialize & Deserialize BST": "serialize-and-deserialize-bst",
  "Merge 2 BSTs": "all-elements-in-two-binary-search-trees",
  "K most Frequent Elements": "top-k-frequent-elements",
  "Median from Stream": "find-median-from-data-stream",
  "Kth Smallest Element": "",
  "Word Break Problem": "word-break",
  "Implement a Trie": "implement-trie-prefix-tree",
  "Longest Common Prefix": "longest-common-prefix",
  "Detect Cycle in Undirected using BFS": "",
  "Detect Cycle in Undirected using DFS": "",
  "Detect Cycle in Directed using DFS": "",
  "Detect Cycle in Directed using BFS": "",
  "Topological Sorting (DFS)": "",
  "Topological Sorting (BFS)": "",
  "Flood Fill Algorithm": "flood-fill",
  "Course Schedule II": "course-schedule-ii",
  "Cheapest Flights within K Stops": "cheapest-flights-within-k-stops",
  "Clone a Graph": "clone-graph",
  "Number of Provinces": "number-of-provinces",
  "Number of Islands": "number-of-islands",
  "Is Graph Bipartite?": "is-graph-bipartite",
  "Most Stones Removed": "most-stones-removed-with-same-row-or-column",
  "Number of Ways to Arrive at Destination": "number-of-ways-to-arrive-at-destination",
  "Coin Change": "coin-change",
  "Longest Common Substring": "maximum-length-of-repeated-subarray",
  "Longest Palindromic Subsequence": "longest-palindromic-subsequence",
  "Buy & Sell Stocks II": "best-time-to-buy-and-sell-stock-ii",
  "Unique BSTs": "unique-binary-search-trees",
  "Max Product Subarray": "maximum-product-subarray",
  "Wildcard Pattern Matching": "wildcard-matching",
  "Assign Cookies": "assign-cookies",
  "Max Length of Pair Chain": "maximum-length-of-pair-chain",
  "Power of Two": "power-of-two",
  "Watering Plants II": "watering-plants-ii",
  "Get Min Element from Stack": "min-stack",
  "Longest substring without repeating": "longest-substring-without-repeating-characters",
  "Matrix": "",
  "Power Set": "subsets",
  "Max XOR of Two Numbers": "maximum-xor-of-two-numbers-in-an-array",
  "Circular Tour / Gas Station": "gas-station",
  "Flatten BST to Sorted list": "increasing-order-search-tree",
  "Smallest Range in K Sorted List": "smallest-range-covering-elements-from-k-lists",
  "XOR Beauty of Array": "find-xor-beauty-of-array",
  "Minimum Distance between Nodes": "",
  "Max Width of BT": "maximum-width-of-binary-tree",
  "Serialize & Deserialize BST": "serialize-and-deserialize-bst",
  "Kth largest in BST": "",
  "Frog Jump": "",
  "Target Sum Subset": "target-sum",
  "Buy & Sell Stocks I": "best-time-to-buy-and-sell-stock",
  "Maximum Subarray": "maximum-subarray",
  "Last Stones Weight II": "last-stone-weight-ii",
  "Target Sum": "target-sum",
  "Coin Change Problem": "coin-change",
  "Partition Equal Subset Sum": "partition-equal-subset-sum",
  "Longest Common Subsequnce (LCS)": "longest-common-subsequence",
  "Longest Increasing Subsequence (LIS)": "longest-increasing-subsequence",
  "Edit Distances": "edit-distance",
  "Generate Parentheses": "generate-parentheses",
  "Number of BSTs": "unique-binary-search-trees",
  "Unique Paths II": "unique-paths-ii",
  "Cherry Pickup II": "cherry-pickup-ii",
  "Min Path Sum": "minimum-path-sum",
  "Triangle": "triangle",
  "Cherry Pickup": "cherry-pickup",
  "Dungeon Game": "dungeon-game",
  "Strange Printer": "strange-printer",
  "Burst Balloons": "burst-balloons",
  "Min Cost to Cut a Stick": "minimum-cost-to-cut-a-stick",
  "Longest Palindromic Subsequences": "longest-palindromic-subsequence",
  "Remove Boxes": "remove-boxes",
  "Best Time to Buy and Sell Stock II": "best-time-to-buy-and-sell-stock-ii",
  "Best Time to Buy and Sell Stock with Cooldown": "best-time-to-buy-and-sell-stock-with-cooldown",
  "Best Time to Buy and Sell Stock with Transaction Fee": "best-time-to-buy-and-sell-stock-with-transaction-fee",
  "Best Time to Buy and Sell Stock III": "best-time-to-buy-and-sell-stock-iii",
  "Best Time to Buy and Sell Stock IV": "best-time-to-buy-and-sell-stock-iv",
  "House Robber III": "house-robber-iii",
  "Numbers At Most N Given Digit Set": "numbers-at-most-n-given-digit-set",
  "Super Egg Drop": "super-egg-drop",
  "Partition to K Equal Sum Subsets": "partition-to-k-equal-sum-subsets",
  "Matchsticks to Square": "matchsticks-to-square",
  "Word Break": "word-break",
  "Palindromic Partitioning DP": "palindrome-partitioning-ii",
  "Maximum Product Subarray": "maximum-product-subarray",
};

const validateDsaCatalog = () => {
  const problemNames = new Set();
  const leetcodeSlugsInUse = new Set();

  days.forEach((day) => {
    const requiredSubtopics = subtopicOrderByMajor[day.title] || [];
    requiredSubtopics.forEach((subtopic) => {
      const count = day.problems.filter((problem) => problem.subtopic === subtopic).length;
      if (count < 10) {
        throw new Error(`${day.title} / ${subtopic} needs at least 10 problems; found ${count}`);
      }
    });

    day.problems.forEach((problem) => {
      const nameKey = normalizeProblem(problem.name);
      if (problemNames.has(nameKey)) {
        throw new Error(`Duplicate DSA problem title: ${problem.name}`);
      }
      problemNames.add(nameKey);

      const slug = problem.slug || leetcodeSlugs[problem.name];
      if (slug && leetcodeSlugsInUse.has(slug)) {
        throw new Error(`Duplicate LeetCode problem link: ${slug}`);
      }
      if (slug) leetcodeSlugsInUse.add(slug);
    });
  });
};
validateDsaCatalog();

const leetcodeUrl = (problem) => problem.slug
  ? `https://leetcode.com/problems/${problem.slug}/`
  : leetcodeSlugs[problem.name]
  ? `https://leetcode.com/problems/${leetcodeSlugs[problem.name]}/`
  : `https://leetcode.com/problemset/?search=${encodeURIComponent(problem.name)}`;
const articleSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const problemKey = (dayTitle, problemName) => `${dayTitle}::${problemName}`;
const allDsaProblems = days.flatMap((day) => day.problems.map((problem) => ({ ...problem, dayTitle: day.title })));
const allDpProblems = dpDays.flatMap((day) => day.problems.map((problem) => ({ ...problem, dayTitle: day.title })));
const articlePath = (name, dayTitle) => {
  const dayIndex = days.findIndex((day) => day.title === dayTitle);
  if (dayIndex !== -1) return `/article/dsa/${String(dayIndex + 1).padStart(2, "0")}/${articleSlug(name)}`;
  const dpDayIndex = dpDays.findIndex((day) => day.title === dayTitle);
  return `/article/dp/${dpDayIndex + 1}/${articleSlug(name)}`;
};
const articleForPath = (pathname) => {
  const [, , sheet, dayNumber, ...slugParts] = pathname.split("/");
  const day = (sheet === "dp" ? dpDays : days)[Number(dayNumber) - 1];
  const slug = slugParts.join("/");
  return day?.problems.find((problem) => articleSlug(problem.name) === slug)?.name || "Valid Anagram";
};
const timerDuration = (problem) => (problem.timeLimit || (problem.level === "Easy" ? 30 : problem.level === "Medium" ? 45 : 60)) * 60;
const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
const ACCESS_CODE = "9756996666";
const ACCESS_STORAGE_KEY = "dsa360:v1:access-granted";

const readLocalState = (key, fallback) => {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error(`Could not read saved DSA360 data for "${key}".`, error);
    return fallback;
  }
};

const useLocalState = (key, fallback) => {
  const [value, setValue] = useState(() => readLocalState(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Could not save DSA360 data for "${key}".`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

function App() {
  const [accessGranted, setAccessGranted] = useState(() => readLocalState(ACCESS_STORAGE_KEY, false));
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [expandedDays, setExpandedDays] = useState([0]);
  const [expandedSubtopics, setExpandedSubtopics] = useState(() => new Set(
    days[0]?.problems[0]?.subtopic ? [`${days[0].title}::${days[0].problems[0].subtopic}`] : [],
  ));
  const [completed, setCompleted] = useLocalState("dsa360:v1:completed", {});
  const [saved, setSaved] = useLocalState("dsa360:v1:saved", {});
  const [query, setQuery] = useState("");
  const [dark, setDark] = useLocalState("dsa360:v1:dark-mode", false);
  const [modal, setModal] = useState("");
  const [activeNav, setActiveNav] = useState("DSA Sheet");
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMinimized, setTimerMinimized] = useState(false);
  const [page, setPage] = useState("sheet");
  const [sheetKind, setSheetKind] = useState(window.location.pathname === "/sheet/dp-sheet" ? "DP" : "DSA");
  const [selectedArticle, setSelectedArticle] = useState(() => articleForPath(window.location.pathname));
  const [expandedArticleDays, setExpandedArticleDays] = useState([]);
  const [articleQuery, setArticleQuery] = useState("");
  const [activeMethod, setActiveMethod] = useState("Naive Approach");
  const [openMenu, setOpenMenu] = useState("");

  const sheetDays = sheetKind === "DP" ? dpDays : days;
  const articleNavigationDays = window.location.pathname.startsWith("/article/dp/")
    ? dpDays.map((day) => ({ title: day.title, problems: day.problems.map((problem) => problem.name) }))
    : articleDays;
  const totalQuestions = sheetDays.reduce((total, day) => total + day.problems.length, 0);
  const levelCounts = Object.fromEntries(["Easy", "Medium", "Hard"].map((level) => [
    level,
    sheetDays.reduce((total, day) => total + day.problems.filter((problem) => problem.level === level).length, 0),
  ]));
  const doneCount = sheetDays.flatMap((day) => day.problems.map((problem) => ({ ...problem, dayTitle: day.title })))
    .filter((problem) => completed[problemKey(problem.dayTitle, problem.name)]).length;
  useEffect(() => {
    if (!timerRunning || !activeTimer) return undefined;
    const interval = window.setInterval(() => {
      setTimerRemaining((remaining) => Math.max(remaining - 1, 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning, activeTimer]);

  useEffect(() => {
    if (timerRemaining === 0) setTimerRunning(false);
  }, [timerRemaining]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("Could not enable offline caching for DSA360.", error);
    });
  }, []);

  const filteredDays = useMemo(() => {
    if (!query.trim()) return sheetDays;
    return sheetDays.map((day) => ({
      ...day,
      problems: day.problems.filter((problem) => problem.name.toLowerCase().includes(query.toLowerCase())),
    })).filter((day) => day.problems.length);
  }, [query, sheetDays]);

  useEffect(() => {
    const syncLocation = () => {
      if (window.location.pathname === "/valid-anagram" || window.location.pathname.startsWith("/article/")) {
        const sheetPath = window.location.pathname.startsWith("/article/dp/") ? "/sheet/dp-sheet" : "/sheet/dsa-sheet";
        window.history.replaceState({}, "", sheetPath);
      }
      setPage("sheet");
      setSheetKind(window.location.pathname === "/sheet/dp-sheet" ? "DP" : "DSA");
    };
    syncLocation();
    window.addEventListener("popstate", syncLocation);
    return () => window.removeEventListener("popstate", syncLocation);
  }, []);

  useEffect(() => {
    document.title = page === "article" ? `${selectedArticle} | DSA360` : `${sheetKind} Sheet | DSA360`;
  }, [page, selectedArticle, sheetKind]);

  const navigate = (path, nextPage = "sheet") => {
    window.history.pushState({}, "", path);
    setPage(nextPage);
    setOpenMenu("");
    window.scrollTo(0, 0);
  };

  const openArticle = (name, dayTitle) => {
    const matchingDay = days.find((day) => day.title === dayTitle)
      || dpDays.find((day) => day.title === dayTitle)
      || days.find((day) => day.problems.some((problem) => problem.name === name))
      || dpDays.find((day) => day.problems.some((problem) => problem.name === name));
    setSelectedArticle(name);
    setArticleQuery("");
    setActiveMethod("Naive Approach");
    navigate(articlePath(name, matchingDay?.title), "article");
  };

  const toggleDay = (index) => {
    setExpandedDays((current) => current.includes(index) ? current.filter((day) => day !== index) : [...current, index]);
  };

  const startTimer = (problem, dayTitle) => {
    const totalSeconds = timerDuration(problem);
    setActiveTimer({ name: problem.name, dayTitle, key: problemKey(dayTitle, problem.name), level: problem.level, totalSeconds });
    setTimerRemaining(totalSeconds);
    setTimerRunning(true);
    setTimerMinimized(false);
  };

  const resetTimer = () => {
    if (!activeTimer) return;
    setTimerRemaining(activeTimer.totalSeconds);
    setTimerRunning(false);
  };

  if (!accessGranted) {
    return (
      <main className="access-screen">
        <form className="access-card" onSubmit={(event) => {
          event.preventDefault();
          if (accessCode.trim() !== ACCESS_CODE) {
            setAccessError("That access code is not correct. Try again.");
            return;
          }
          try {
            window.localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(true));
          } catch (error) {
            console.error("Could not remember DSA360 access on this device.", error);
          }
          setAccessGranted(true);
          setAccessError("");
        }}>
          <a className="access-brand" href="/" aria-label="DSA360 home"><span>DSA</span><strong>360</strong></a>
          <span className="access-kicker">DSA360 • DSA PRACTICE</span>
          <h1>Enter access code</h1>
          <p>Use the shared code to open the DSA and DP sheets. Access is remembered on this device.</p>
          <label className="access-label" htmlFor="access-code">Access code</label>
          <input
            id="access-code"
            className="access-input"
            type="password"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            autoComplete="off"
            value={accessCode}
            onChange={(event) => setAccessCode(event.target.value)}
            aria-describedby={accessError ? "access-error" : undefined}
            required
          />
          {accessError && <p className="access-error" id="access-error" role="alert">{accessError}</p>}
          <button className="access-submit" type="submit">Open DSA360 <Icon name="arrow" size={16} /></button>
        </form>
      </main>
    );
  }

  return (
    <div className={`app-shell${dark ? " dark" : ""}`}>
      <header className="topbar">
        <a className="brand" href="/" aria-label="DSA360 home">
          <span>DSA</span><strong>360</strong>
        </a>
        <nav className="top-links" aria-label="Main navigation">
          <div className="menu-wrap"><button onClick={() => setOpenMenu(openMenu === "courses" ? "" : "courses")}>Courses <Icon name="chevron" size={15} /></button>{openMenu === "courses" && <div className="header-dropdown"><button onClick={() => { setSheetKind("DSA"); navigate("/sheet/dsa-sheet"); }}>DSA Sheet</button><button onClick={() => { setSheetKind("DP"); navigate("/sheet/dp-sheet"); }}>DP Sheet</button><button onClick={() => setModal("Explore Courses")}>Explore all courses →</button></div>}</div>
          <div className="menu-wrap"><button onClick={() => setOpenMenu(openMenu === "resources" ? "" : "resources")}>Resources <Icon name="chevron" size={15} /></button>{openMenu === "resources" && <div className="header-dropdown"><button onClick={() => setModal("Practice Problems")}>Practice Problems</button></div>}</div>
        </nav>
        <label className={`search-box${page === "article" ? " article-header-search" : ""}`}>
          <Icon name="search" size={19} />
          <input value={page === "article" ? articleQuery : query} onChange={(event) => page === "article" ? setArticleQuery(event.target.value) : setQuery(event.target.value)} placeholder={page === "article" ? "Search article title..." : "Microsoft questions..."} aria-label={page === "article" ? "Search article title" : "Search DSA problems"} />
          {(page === "article" ? articleQuery : query) && <button className="clear-search" onClick={() => page === "article" ? setArticleQuery("") : setQuery("")} aria-label="Clear search">×</button>}
        </label>
        <div className="top-actions">
          <div className="menu-wrap"><button className="results-link" onClick={() => setOpenMenu(openMenu === "results" ? "" : "results")}>Our Results <Icon name="chevron" size={14} /></button>{openMenu === "results" && <div className="header-dropdown results-dropdown"><strong>Our Results</strong><p>Students placed at top companies</p><button onClick={() => setModal("Our Results")}>View placement stories →</button></div>}</div>
          <button className="theme-button" onClick={() => setDark(!dark)} aria-label="Toggle theme"><Icon name="sun" size={21} /></button>
          <span className="public-access">Code access</span>
        </div>
      </header>

      <aside className={`sidebar${page === "article" ? " article-sidebar" : ""}`}>
        <button className="collapse-button" aria-label="Collapse sidebar"><Icon name="back" size={19} /></button>
        {page === "article" ? <div className="article-nav"><button className="go-back" onClick={() => navigate(window.location.pathname.startsWith("/article/dp/") ? "/sheet/dp-sheet" : "/sheet/dsa-sheet")}><span>←</span> Go Back</button>{articleNavigationDays.map((day) => {
          const matchingProblems = day.problems.filter((problem) => problem.toLowerCase().includes(articleQuery.toLowerCase()));
          if (articleQuery && !day.title.toLowerCase().includes(articleQuery.toLowerCase()) && matchingProblems.length === 0) return null;
          const isExpanded = expandedArticleDays.includes(day.title) || Boolean(articleQuery);
          return <div className="article-day" key={day.title}><button onClick={() => setExpandedArticleDays((current) => current.includes(day.title) ? current.filter((title) => title !== day.title) : [...current, day.title])}><span>{isExpanded ? "⌄" : "›"}</span>{day.title}</button>{isExpanded && (articleQuery ? matchingProblems : day.problems).map((problem) => <button key={problem} className={`article-nav-problem${selectedArticle === problem ? " active" : ""}`} onClick={() => openArticle(problem, day.title)}><span className="article-radio" />{problem}</button>)}</div>;
        })}</div> : <div className="sidebar-menu">
          <button className="nav-category active" onClick={() => setActiveNav(activeNav === "Sheets" ? "" : "Sheets")}>
            <Icon name="grid" size={18} /><span>Sheets</span><Icon name="chevron" size={13} className="up-chevron" />
          </button>
          {activeNav !== "" && <div className="subnav">
            {["DSA Sheet", "DP Sheet"].map((item) => <button key={item} className={(item === "DP Sheet" ? sheetKind === "DP" : sheetKind === "DSA") ? "selected" : ""} onClick={() => { setSheetKind(item === "DP Sheet" ? "DP" : "DSA"); setExpandedDays([0]); navigate(item === "DP Sheet" ? "/sheet/dp-sheet" : "/sheet/dsa-sheet"); }}>
              <span className="subnav-arrow">➜</span>{item}
            </button>)}
          </div>}
        </div>}
      </aside>

      {page === "article" ? <ArticlePage article={selectedArticle} activeMethod={activeMethod} setActiveMethod={setActiveMethod} onPractice={() => window.open(leetcodeUrl({ name: selectedArticle }), "_blank", "noopener,noreferrer")} /> : <main className="main-content">
        <section className="hero">
          <div className="hero-copy">
            <h1><span>{sheetKind} Sheet</span> - {sheetKind === "DP" ? <>Important DP Patterns<br className="wide-break" /> for Interviews</> : <>Most Important<br className="wide-break" /> Interview Questions</>}</h1>
            <ul className="intro-list">
              <li>{sheetKind === "DP" ? "Important DP Questions" : "All DSA topics covered"}</li>
              {sheetKind === "DSA" && <li>Will this be enough for Placements, is this for me? <button className="view-more" onClick={() => setDescriptionOpen(!descriptionOpen)}>View {descriptionOpen ? "Less" : "More"} <Icon name="chevron" size={12} /></button>
                {descriptionOpen && <p className="extra-description">A carefully curated list of interview questions to help you practice the most important DSA concepts, one day at a time.</p>}
              </li>}
              <li><b>Easy: {levelCounts.Easy} | Medium: {levelCounts.Medium} | Hard: {levelCounts.Hard}</b></li>
            </ul>
            <div className="social-proof">
              <div className="avatars"><span>👩🏻‍💻</span><span>👨🏽‍💻</span><span>👩🏾‍💻</span><span>👨🏻‍💻</span></div>
              <strong>50K+ New users in last 30 days 🚀</strong>
            </div>
            <div className="hero-pills">
              <button onClick={() => setModal("Group Study")}><Icon name="users" size={14} /> Group Study</button>
              <button onClick={() => setModal("Saved Questions")}><Icon name="bookmark" size={14} /> Saved Questions</button>
            </div>
            <button className="launch-banner" onClick={() => setModal("DSA 360 Sheet")}><Icon name="sparkle" size={17} /><span className="new-tag">NEW</span> DSA 360 Sheet coming soon</button>
          </div>
          <div className="progress-panel">
            <div className="getting-started">
              <div className="rocket-icon"><Icon name="rocket" size={22} /></div>
              <div><h3>Let's get started!</h3><p>Solve your first problem to begin the<br /> journey.</p></div>
            </div>
            <div className="total-progress">
              <div className="progress-ring" style={{ "--progress": `${doneCount / totalQuestions * 100}%` }}><strong>{Math.round(doneCount / totalQuestions * 100)}%</strong><span>{doneCount}/{totalQuestions}</span></div>
            <div><h3>Total progress</h3><p>{totalQuestions - doneCount} questions to go</p></div>
            </div>
            <div className="difficulty-progress">
              {[["Easy", "easy"], ["Medium", "medium"], ["Hard", "hard"]].map(([label, className]) => {
                const count = levelCounts[label];
                const levelDone = sheetDays.reduce((total, day) => total + day.problems.filter((problem) => problem.level === label && completed[problemKey(day.title, problem.name)]).length, 0);
                return <div className={`difficulty ${className}`} key={label}>
                <div><strong>{label}</strong><span>{levelDone}/{count} {Math.round(levelDone / count * 100)}%</span></div><div className="bar"><i style={{ width: `${Math.min(levelDone / count * 100, 100)}%` }} /></div>
              </div>;
              })}
            </div>
          </div>
        </section>

        <section className="roadmap">
          <div className="calendar-tile"><Icon name="calendar" size={23} /></div>
          <div className="roadmap-copy">          <div className="eyebrow">YOUR {sheetKind} ROADMAP <span>•</span> <em>Personalized</em></div><h2>Plan Your <span>{sheetKind} Journey</span></h2><p>Turn your goals into a simple daily plan and stay consistent until you complete your<br className="desktop-only" /> preparation.</p></div>
          <button className="create-plan" onClick={() => setModal("Create My Plan")}>Create My Plan <Icon name="arrow" size={17} /></button>
        </section>

        <section className="day-list" aria-label="DSA questions by day">
          {filteredDays.map((day) => {
            const originalIndex = sheetDays.findIndex((originalDay) => originalDay.title === day.title);
            const isOpen = expandedDays.includes(originalIndex);
            const checked = day.problems.reduce((total, problem) => total + (completed[problemKey(day.title, problem.name)] ? 1 : 0), 0);
            return <article className={`day-card${isOpen ? " expanded" : ""}`} key={day.title}>
              <button className="day-heading" onClick={() => toggleDay(originalIndex)} aria-expanded={isOpen}>
                <strong>{day.title}</strong><span className="day-count">{checked}/{day.problems.length}</span><span className="day-toggle"><Icon name="chevron" size={17} /></span>
              </button>
              {isOpen && <div className="table-wrap">
                {(sheetKind === "DP"
                  ? [{ title: "", problems: day.problems }]
                  : (query
                    ? [...new Set(day.problems.map((problem) => problem.subtopic))]
                    : subtopicOrderByMajor[day.title] || [...new Set(day.problems.map((problem) => problem.subtopic))])
                    .map((subtopic) => ({
                    title: subtopic,
                    problems: day.problems.filter((problem) => problem.subtopic === subtopic),
                  }))).map((group) => {
                  const subtopicKey = `${day.title}::${group.title}`;
                  const groupOpen = sheetKind === "DP" || expandedSubtopics.has(subtopicKey) || Boolean(query);
                  return <section className="subtopic-group" key={group.title || "dp-problems"}>
                    {group.title && <button className="subtopic-heading" onClick={() => setExpandedSubtopics((current) => {
                      const next = new Set(current);
                      if (next.has(subtopicKey)) next.delete(subtopicKey);
                      else next.add(subtopicKey);
                      return next;
                    })} aria-expanded={groupOpen}>
                      <span>{groupOpen ? "⌄" : "›"}</span><strong>{group.title}</strong><span className="subtopic-count">{group.problems.length}</span>
                    </button>}
                    {groupOpen && group.problems.length > 0 && <div className="subtopic-table-wrap"><table>
                      <thead><tr><th className="check-column"><span className="empty-radio" /></th><th className="problem-column">Problem</th><th>Practice</th><th>Level</th><th>Timer</th><th>Company</th><th>Save</th></tr></thead>
                      <tbody>{group.problems.map((problem) => <tr key={problem.name}>
                        <td><button className={`check-circle${completed[problemKey(day.title, problem.name)] ? " checked" : ""}`} onClick={() => { const key = problemKey(day.title, problem.name); setCompleted((current) => ({ ...current, [key]: !current[key] })); }} aria-label={`Mark ${problem.name} ${completed[problemKey(day.title, problem.name)] ? "incomplete" : "complete"}`}>{completed[problemKey(day.title, problem.name)] && <Icon name="check" size={13} />}</button></td>
                        <td className={`problem-name${completed[problemKey(day.title, problem.name)] ? " done" : ""}`}><a href={leetcodeUrl(problem)} target="_blank" rel="noreferrer">{problem.name}</a>{problem.paidOnly && <span className="premium-pill" title="This LeetCode problem requires Premium">Premium</span>}</td>
                        <td><a className="round-action" href={leetcodeUrl(problem)} target="_blank" rel="noopener noreferrer" aria-label={`Practice ${problem.name} on LeetCode`} title="Practice on LeetCode"><Icon name="code" size={19} /></a></td>
                        <td><span className={`level ${problem.level.toLowerCase()}`}>{problem.level}</span></td>
                        <td><button className="timer" onClick={() => startTimer(problem, day.title)}>{activeTimer?.key === problemKey(day.title, problem.name) ? formatTime(timerRemaining) : `${timerDuration(problem) / 60}Min`}</button></td>
                        <td><div className="companies">{problem.companies.map((company) => <span key={company} className={`company-mark ${companyClass(company)}`}>{company === "amazon" ? "a" : company === "google" ? "G" : company === "microsoft" ? "▦" : company === "adobe" ? "A" : company === "flipkart" ? "f" : company === "uber" ? "U" : company === "walmart" ? "✣" : company === "oracle" ? "◉" : "C"}</span>)}{problem.more && <span className="more-companies">+{problem.more}</span>}{problem.companies.length === 0 && !problem.more && "—"}</div></td>
                        <td><button className={`save-button${saved[problemKey(day.title, problem.name)] ? " saved" : ""}`} onClick={() => { const key = problemKey(day.title, problem.name); setSaved((current) => ({ ...current, [key]: !current[key] })); }} aria-label={`${saved[problemKey(day.title, problem.name)] ? "Unsave" : "Save"} ${problem.name}`}>{saved[problemKey(day.title, problem.name)] ? "Saved" : "Save"}</button></td>
                      </tr>)}</tbody>
                    </table></div>}
                    {groupOpen && group.problems.length === 0 && <p className="subtopic-empty">No questions mapped yet.</p>}
                  </section>;
                })}
              </div>}
            </article>;
          })}
          {filteredDays.length === 0 && <div className="no-results">No questions found for “{query}”. Try another search.</div>}
        </section>
        <footer className="page-footer">Made for your next big interview <span>♥</span></footer>
      </main>}

      {activeTimer && <aside className={`timer-panel${timerMinimized ? " minimized" : ""}`} aria-label="Problem timer">
        <div className="timer-panel-heading"><strong>{activeTimer.level} Timer</strong><button onClick={() => setTimerMinimized(!timerMinimized)} aria-label={timerMinimized ? "Expand timer" : "Minimize timer"}>{timerMinimized ? "+" : "−"}</button></div>
        {!timerMinimized && <>
          <div className="timer-display">{formatTime(timerRemaining)}</div>
          <div className="timer-controls">
            <button className="mark-complete" onClick={() => { setCompleted((current) => ({ ...current, [activeTimer.key]: true })); setTimerRunning(false); setActiveTimer(null); }}>✓ &nbsp;Mark Complete</button>
            <button className="reset-timer" onClick={resetTimer}>■ &nbsp;Reset</button>
          </div>
          <dl className="timer-details"><dt>Topic:</dt><dd>{activeTimer.dayTitle}</dd><dt>Question:</dt><dd><a href={leetcodeUrl({ name: activeTimer.name })} target="_blank" rel="noreferrer">{activeTimer.name}</a></dd><dt>Time Limit:</dt><dd>{activeTimer.totalSeconds / 60} min</dd><dt>Level:</dt><dd>{activeTimer.level}</dd></dl>
          <div className="timer-remaining-label"><span>Time Remaining</span><span>{Math.round(timerRemaining / activeTimer.totalSeconds * 100)}% ({formatTime(timerRemaining)})</span></div>
          <div className="timer-progress"><i style={{ width: `${timerRemaining / activeTimer.totalSeconds * 100}%` }} /></div>
          <button className="timer-pause" onClick={() => setTimerRunning(!timerRunning)}>{timerRunning ? "Pause timer" : timerRemaining === 0 ? "Time is up" : "Resume timer"}</button>
        </>}
      </aside>}

      {modal && <div className="modal-backdrop" onClick={() => setModal("")} role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-label={modal} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={() => setModal("")} aria-label="Close dialog">×</button><div className="modal-icon"><Icon name={modal.includes("Plan") ? "calendar" : modal.includes("Group") ? "users" : "sparkle"} size={24} /></div>
        <h2>{modal}</h2><p>{modal === "Create My Plan" ? "Build a personalized DSA roadmap that fits your schedule." : "This feature is coming soon. Keep practicing and stay tuned!"}</p>
        {modal === "Create My Plan" && <><label className="modal-label">How many days can you study each week?<select defaultValue="5"><option value="3">3 days</option><option value="5">5 days</option><option value="7">Every day</option></select></label><button className="create-plan modal-submit" onClick={() => setModal("Your DSA plan is ready!")}>Create my roadmap <Icon name="arrow" size={16} /></button></>}
      </section></div>}
    </div>
  );
}

const articleCode = {
  Java: `class Solution {
    public boolean isAnagram(String s, String t) {
        char[] arr1 = s.toCharArray();
        char[] arr2 = t.toCharArray();
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        return Arrays.equals(arr1, arr2);
    }
}`,
  "C++": `class Solution {
public:
    bool isAnagram(string s, string t) {
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        return s == t;
    }
};`,
  Python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)`,
};

const articleMethodCode = {
  "Better Approach": {
    Java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) counts.merge(c, 1, Integer::sum);
        for (char c : t.toCharArray()) {
            int count = counts.getOrDefault(c, 0);
            if (count == 0) return false;
            counts.put(c, count - 1);
        }
        return true;
    }
}`,
    "C++": `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        unordered_map<char, int> counts;
        for (char c : s) counts[c]++;
        for (char c : t) if (--counts[c] < 0) return false;
        return true;
    }
};`,
    Python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        counts = {}
        for char in s:
            counts[char] = counts.get(char, 0) + 1
        for char in t:
            if counts.get(char, 0) == 0:
                return False
            counts[char] -= 1
        return True`,
  },
  "Best Approach": {
    Java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for (int count : counts) if (count != 0) return false;
        return true;
    }
}`,
    "C++": `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        int counts[26] = {};
        for (int i = 0; i < s.size(); i++) {
            counts[s[i] - 'a']++;
            counts[t[i] - 'a']--;
        }
        for (int count : counts) if (count != 0) return false;
        return true;
    }
};`,
    Python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        counts = [0] * 26
        for left, right in zip(s, t):
            counts[ord(left) - ord('a')] += 1
            counts[ord(right) - ord('a')] -= 1
        return all(count == 0 for count in counts)`,
  },
};

const validPalindromeCode = {
  "Naive Approach": {
    Java: `class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder cleaned = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                cleaned.append(Character.toLowerCase(c));
            }
        }
        String normalized = cleaned.toString();
        return normalized.equals(
            cleaned.reverse().toString()
        );
    }
}`,
    "C++": `class Solution {
public:
    bool isPalindrome(string s) {
        string cleaned;
        for (unsigned char c : s) {
            if (isalnum(c)) {
                cleaned += tolower(c);
            }
        }
        string reversed = cleaned;
        reverse(reversed.begin(), reversed.end());
        return cleaned == reversed;
    }
};`,
    Python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        cleaned = "".join(
            char.lower() for char in s
            if char.isalnum()
        )
        return cleaned == cleaned[::-1]`,
  },
  "Best Approach": {
    Java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            while (left < right
                    && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right
                    && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            if (Character.toLowerCase(s.charAt(left))
                    != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
    "C++": `class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0;
        int right = static_cast<int>(s.size()) - 1;

        while (left < right) {
            while (left < right
                   && !isalnum(static_cast<unsigned char>(s[left]))) {
                left++;
            }
            while (left < right
                   && !isalnum(static_cast<unsigned char>(s[right]))) {
                right--;
            }
            if (tolower(static_cast<unsigned char>(s[left]))
                != tolower(static_cast<unsigned char>(s[right]))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
};`,
    Python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1

        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
  },
};

const additionalStringSolutions = {
  "String Compression": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    },
    explanation: {
      "Naive Approach": "Read each consecutive character group, build its compressed representation in a separate buffer, then copy that buffer back into the input array.",
      "Best Approach": "Use read and write pointers to count each consecutive group and write its character and count directly into the input array.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public int compress(char[] chars) {
        StringBuilder encoded = new StringBuilder();
        int index = 0;
        while (index < chars.length) {
            char current = chars[index];
            int end = index;
            while (end < chars.length && chars[end] == current) {
                end++;
            }
            encoded.append(current);
            int count = end - index;
            if (count > 1) encoded.append(count);
            index = end;
        }
        for (int i = 0; i < encoded.length(); i++) {
            chars[i] = encoded.charAt(i);
        }
        return encoded.length();
    }
}`,
        "C++": `class Solution {
public:
    int compress(vector<char>& chars) {
        string encoded;
        int index = 0;
        while (index < chars.size()) {
            char current = chars[index];
            int end = index;
            while (end < chars.size() && chars[end] == current) {
                end++;
            }
            encoded += current;
            int count = end - index;
            if (count > 1) encoded += to_string(count);
            index = end;
        }
        copy(encoded.begin(), encoded.end(), chars.begin());
        return encoded.size();
    }
};`,
        Python: `class Solution:
    def compress(self, chars: List[str]) -> int:
        encoded = []
        index = 0
        while index < len(chars):
            end = index
            while end < len(chars) and chars[end] == chars[index]:
                end += 1
            encoded.append(chars[index])
            count = end - index
            if count > 1:
                encoded.extend(str(count))
            index = end
        chars[:len(encoded)] = encoded
        return len(encoded)`,
      },
      "Best Approach": {
        Java: `class Solution {
    public int compress(char[] chars) {
        int read = 0;
        int write = 0;
        while (read < chars.length) {
            char current = chars[read];
            int start = read;
            while (read < chars.length && chars[read] == current) {
                read++;
            }
            chars[write++] = current;
            int count = read - start;
            if (count > 1) {
                for (char digit : String.valueOf(count).toCharArray()) {
                    chars[write++] = digit;
                }
            }
        }
        return write;
    }
}`,
        "C++": `class Solution {
public:
    int compress(vector<char>& chars) {
        int read = 0;
        int write = 0;
        while (read < chars.size()) {
            char current = chars[read];
            int start = read;
            while (read < chars.size() && chars[read] == current) {
                read++;
            }
            chars[write++] = current;
            int count = read - start;
            if (count > 1) {
                for (char digit : to_string(count)) {
                    chars[write++] = digit;
                }
            }
        }
        return write;
    }
};`,
        Python: `class Solution:
    def compress(self, chars: List[str]) -> int:
        read = write = 0
        while read < len(chars):
            current = chars[read]
            start = read
            while read < len(chars) and chars[read] == current:
                read += 1
            chars[write] = current
            write += 1
            count = read - start
            if count > 1:
                for digit in str(count):
                    chars[write] = digit
                    write += 1
        return write`,
      },
    },
  },
  "Reverse Words in String": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(n)", "O(n)"],
      "Best Approach": ["O(n)", "O(n)"],
    },
    explanation: {
      "Naive Approach": "Trim and split the string into words, then join those words in reverse order with one space between them.",
      "Best Approach": "Compact words into a character buffer, reverse the full buffer, then reverse each word to restore its letters.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder answer = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            if (words[i].isEmpty()) continue;
            if (answer.length() > 0) answer.append(' ');
            answer.append(words[i]);
        }
        return answer.toString();
    }
}`,
        "C++": `class Solution {
public:
    string reverseWords(string s) {
        stringstream input(s);
        vector<string> words;
        string word;
        while (input >> word) words.push_back(word);
        reverse(words.begin(), words.end());
        string answer;
        for (const string& item : words) {
            if (!answer.empty()) answer += ' ';
            answer += item;
        }
        return answer;
    }
};`,
        Python: `class Solution:
    def reverseWords(self, s: str) -> str:
        return " ".join(reversed(s.split()))`,
      },
      "Best Approach": {
        Java: `class Solution {
    private void reverse(char[] chars, int left, int right) {
        while (left < right) {
            char temp = chars[left];
            chars[left++] = chars[right];
            chars[right--] = temp;
        }
    }

    public String reverseWords(String s) {
        char[] chars = s.toCharArray();
        int write = 0;
        int read = 0;
        while (read < chars.length) {
            while (read < chars.length && chars[read] == ' ') read++;
            if (read == chars.length) break;
            if (write > 0) chars[write++] = ' ';
            while (read < chars.length && chars[read] != ' ') {
                chars[write++] = chars[read++];
            }
        }
        reverse(chars, 0, write - 1);
        int start = 0;
        for (int end = 0; end <= write; end++) {
            if (end == write || chars[end] == ' ') {
                reverse(chars, start, end - 1);
                start = end + 1;
            }
        }
        return new String(chars, 0, write);
    }
}`,
        "C++": `class Solution {
public:
    string reverseWords(string s) {
        int write = 0;
        int read = 0;
        while (read < s.size()) {
            while (read < s.size() && s[read] == ' ') read++;
            if (read == s.size()) break;
            if (write > 0) s[write++] = ' ';
            while (read < s.size() && s[read] != ' ') {
                s[write++] = s[read++];
            }
        }
        s.resize(write);
        reverse(s.begin(), s.end());
        int start = 0;
        for (int end = 0; end <= s.size(); end++) {
            if (end == s.size() || s[end] == ' ') {
                reverse(s.begin() + start, s.begin() + end);
                start = end + 1;
            }
        }
        return s;
    }
};`,
        Python: `class Solution:
    def reverseWords(self, s: str) -> str:
        chars = list(s)
        write = read = 0
        while read < len(chars):
            while read < len(chars) and chars[read] == " ":
                read += 1
            if read == len(chars):
                break
            if write:
                chars[write] = " "
                write += 1
            while read < len(chars) and chars[read] != " ":
                chars[write] = chars[read]
                write += 1
                read += 1
        chars = chars[:write]
        chars.reverse()
        start = 0
        for end in range(len(chars) + 1):
            if end == len(chars) or chars[end] == " ":
                chars[start:end] = reversed(chars[start:end])
                start = end + 1
        return "".join(chars)`,
      },
    },
  },
  "Remove All Occurrences": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O(n²)", "O(n)"],
      "Best Approach": ["O(nm)", "O(n)"],
    },
    explanation: {
      "Naive Approach": "Repeatedly locate the leftmost occurrence of the pattern and remove it until no occurrence remains.",
      "Best Approach": "Scan the input once into a character stack; whenever its suffix matches the pattern, remove that suffix.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public String removeOccurrences(String s, String part) {
        while (s.contains(part)) {
            int index = s.indexOf(part);
            s = s.substring(0, index)
                    + s.substring(index + part.length());
        }
        return s;
    }
}`,
        "C++": `class Solution {
public:
    string removeOccurrences(string s, string part) {
        size_t index = s.find(part);
        while (index != string::npos) {
            s.erase(index, part.size());
            index = s.find(part);
        }
        return s;
    }
};`,
        Python: `class Solution:
    def removeOccurrences(self, s: str, part: str) -> str:
        while part in s:
            s = s.replace(part, "", 1)
        return s`,
      },
      "Best Approach": {
        Java: `class Solution {
    public String removeOccurrences(String s, String part) {
        StringBuilder stack = new StringBuilder();
        for (char current : s.toCharArray()) {
            stack.append(current);
            int size = stack.length();
            int partLength = part.length();
            if (size >= partLength
                    && stack.substring(size - partLength).equals(part)) {
                stack.setLength(size - partLength);
            }
        }
        return stack.toString();
    }
}`,
        "C++": `class Solution {
public:
    string removeOccurrences(string s, string part) {
        string stack;
        for (char current : s) {
            stack += current;
            if (stack.size() >= part.size()
                && stack.compare(stack.size() - part.size(),
                                 part.size(), part) == 0) {
                stack.resize(stack.size() - part.size());
            }
        }
        return stack;
    }
};`,
        Python: `class Solution:
    def removeOccurrences(self, s: str, part: str) -> str:
        stack = []
        for current in s:
            stack.append(current)
            if (len(stack) >= len(part)
                    and "".join(stack[-len(part):]) == part):
                del stack[-len(part):]
        return "".join(stack)`,
      },
    },
  },
  "Permutation in String": {
    methods: ["Naive Approach", "Best Approach"],
    complexity: {
      "Naive Approach": ["O((n-m)m log m)", "O(m)"],
      "Best Approach": ["O(n)", "O(1)"],
    },
    explanation: {
      "Naive Approach": "Sort the pattern once, then sort every window of the same length in the other string and compare the sorted characters.",
      "Best Approach": "Maintain 26 lowercase-letter counts for a fixed-size sliding window and compare them with the pattern counts.",
    },
    code: {
      "Naive Approach": {
        Java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        int size = s1.length();
        if (size > s2.length()) return false;
        char[] target = s1.toCharArray();
        Arrays.sort(target);
        for (int start = 0; start + size <= s2.length(); start++) {
            char[] window = s2.substring(start, start + size).toCharArray();
            Arrays.sort(window);
            if (Arrays.equals(target, window)) return true;
        }
        return false;
    }
}`,
        "C++": `class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int size = s1.size();
        if (size > s2.size()) return false;
        sort(s1.begin(), s1.end());
        for (int start = 0; start + size <= s2.size(); start++) {
            string window = s2.substr(start, size);
            sort(window.begin(), window.end());
            if (window == s1) return true;
        }
        return false;
    }
};`,
        Python: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        size = len(s1)
        target = sorted(s1)
        for start in range(len(s2) - size + 1):
            if sorted(s2[start:start + size]) == target:
                return True
        return False`,
      },
      "Best Approach": {
        Java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        int size = s1.length();
        if (size > s2.length()) return false;
        int[] target = new int[26];
        int[] window = new int[26];
        for (int i = 0; i < size; i++) {
            target[s1.charAt(i) - 'a']++;
            window[s2.charAt(i) - 'a']++;
        }
        if (Arrays.equals(target, window)) return true;
        for (int right = size; right < s2.length(); right++) {
            window[s2.charAt(right) - 'a']++;
            window[s2.charAt(right - size) - 'a']--;
            if (Arrays.equals(target, window)) return true;
        }
        return false;
    }
}`,
        "C++": `class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int size = s1.size();
        if (size > s2.size()) return false;
        array<int, 26> target{};
        array<int, 26> window{};
        for (int i = 0; i < size; i++) {
            target[s1[i] - 'a']++;
            window[s2[i] - 'a']++;
        }
        if (target == window) return true;
        for (int right = size; right < s2.size(); right++) {
            window[s2[right] - 'a']++;
            window[s2[right - size] - 'a']--;
            if (target == window) return true;
        }
        return false;
    }
};`,
        Python: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        size = len(s1)
        if size > len(s2):
            return False
        target = [0] * 26
        window = [0] * 26
        for index in range(size):
            target[ord(s1[index]) - ord("a")] += 1
            window[ord(s2[index]) - ord("a")] += 1
        if target == window:
            return True
        for right in range(size, len(s2)):
            window[ord(s2[right]) - ord("a")] += 1
            window[ord(s2[right - size]) - ord("a")] -= 1
            if target == window:
                return True
        return False`,
      },
    },
  },
};

const additionalStringArticleDetails = {
  "String Compression": {
    statement: "Compress consecutive repeated characters in the input character array. A character with a count of one is written by itself; larger counts are written as the character followed by the count's digits. Return the length of the compressed prefix.",
    example: "Input: chars = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]  →  Output: 6; the compressed prefix is [\"a\",\"2\",\"b\",\"2\",\"c\",\"3\"].",
  },
  "Reverse Words in String": {
    statement: "Given a string containing words separated by spaces, reverse the order of the words. The result must contain exactly one space between words and no leading or trailing spaces.",
    example: "Input: s = \"  the sky is blue  \"  →  Output: \"blue is sky the\".",
  },
  "Remove All Occurrences": {
    statement: "Repeatedly remove the leftmost occurrence of the non-empty pattern part from s until part no longer occurs, then return the remaining string.",
    example: "Input: s = \"daabcbaabcbc\", part = \"abc\"  →  Output: \"dab\".",
  },
  "Permutation in String": {
    statement: "Return true if s2 contains a contiguous substring that is a permutation of s1; otherwise, return false. The strings contain lowercase English letters.",
    example: "Input: s1 = \"ab\", s2 = \"eidbaooo\"  →  Output: true; the substring \"ba\" is a permutation of s1.",
  },
};

function ArticlePage({ article, activeMethod, setActiveMethod, onPractice }) {
  const [language, setLanguage] = useState("Java");
  const [copied, setCopied] = useState(false);
  const isAnagramArticle = article === "Valid Anagram";
  const isPalindromeArticle = article === "Valid Palindrome";
  const articleSolution = additionalStringSolutions[article] || dpSolutions[article];
  const articleProblem = [...allDsaProblems, ...allDpProblems].find((problem) => problem.name === article);
  const topic = articleProblem?.dayTitle.replace(/^Day \d+\s*:\s*/, "").replace(/\s+\(Part \d+\)$/, "") || "Interview Preparation";
  const topicApproach = topic.includes("Array")
    ? "Try sorting, a two-pointer scan, a prefix sum, or a sliding window. Choose the pattern that matches the input constraints."
    : topic.includes("String")
      ? "Look for repeated-character structure, frequency counts, two pointers, or a sliding window."
      : topic.includes("Binary Search")
        ? "Identify a sorted range or a monotonic condition, then narrow the search space while preserving a clear invariant."
        : topic.includes("Recursion")
          ? "Define the state, base case, and choices at each step. Backtrack only when the current choice cannot lead to a valid answer."
          : topic.includes("Linked List")
            ? "Track pointer movement carefully. Draw a small example and account for empty, single-node, and boundary cases."
            : topic.includes("Stacks")
              ? "Determine whether the next action depends on recent unresolved values; a stack or queue can preserve that order."
              : topic.includes("Tree") || topic.includes("BST")
                ? "Choose DFS or BFS based on the required traversal. State what each recursive call returns and handle empty children."
                : topic.includes("Heap")
                  ? "Use a heap when the next step repeatedly needs the smallest or largest remaining value."
                  : topic.includes("Trie")
                    ? "Represent shared prefixes with trie nodes and define how insertion, lookup, and terminal words are tracked."
                    : topic.includes("Graph")
                      ? "Model the input as vertices and edges, then choose traversal, topological ordering, or shortest-path processing."
                      : topic.includes("DP")
                        ? "Define a state, recurrence, and base cases before coding. Check whether the state can be reduced to save space."
                        : topic.includes("Greedy")
                          ? "Identify a locally optimal choice and verify why it remains safe for a global optimum."
                          : "Clarify the input constraints, identify the useful invariant, and test edge cases before optimizing.";
  const methods = articleSolution
    ? articleSolution.methods
    : isPalindromeArticle
      ? ["Naive Approach", "Best Approach"]
      : ["Naive Approach", "Better Approach", "Best Approach"];
  const selectedMethod = methods.includes(activeMethod) ? activeMethod : methods[0];
  const codeForArticle = isAnagramArticle
    ? (articleMethodCode[selectedMethod] || articleCode)[language]
    : isPalindromeArticle ? validPalindromeCode[selectedMethod]?.[language] : articleSolution?.code[selectedMethod]?.[language] || "";
  const copyCode = async () => {
    if (!codeForArticle) return;
    await navigator.clipboard.writeText(codeForArticle);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const methodComplexities = articleSolution
    ? articleSolution.complexity
    : isAnagramArticle
    ? {
      "Naive Approach": ["O(n log(n))", "O(1)"],
      "Better Approach": ["O(n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    }
    : {
      "Naive Approach": ["O(n)", "O(n)"],
      "Better Approach": ["O(n)", "O(n)"],
      "Best Approach": ["O(n)", "O(1)"],
    };
  return <main className="main-content article-main">
    <div className="article-layout">
      <article className="article-body">
        <div className="article-title-row"><h1>{article}</h1><div className="article-company-mini"><span className="company-mark adobe">A</span><span className="company-mark amazon">a</span><span className="more-companies">+3</span></div></div>
        <div className="article-chips"><button onClick={onPractice}>Practice Here <Icon name="arrow" size={13} /></button><button onClick={() => document.getElementById("article-topics")?.scrollIntoView({ behavior: "smooth" })}><Icon name="grid" size={13} /> Topics</button></div>
        {isAnagramArticle ? <section className="article-section" id="problem-statement">
          <h3>Problem Statement :</h3>
          <p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.</p>
          <p><strong>What is Anagram ?</strong><br />An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.</p>
          <div className="anagram-diagram" aria-label="Valid anagram letter rearrangement example"><strong>Valid Anagrams</strong><div><span>s:</span>{[..."anagram"].map((letter, index) => <i key={`s-${index}`}>{letter}</i>)}</div><svg className="diagram-arrows" viewBox="0 0 250 54" role="img" aria-label="Letters rearranged"><defs><marker id="arrowhead" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0 0 L5 2.5 L0 5" fill="none" stroke="#19c330" /></marker></defs><path d="M30 1 L55 51 M55 1 L30 51 M75 1 L100 51 M100 1 L75 51 M125 1 L125 51 M155 1 L155 51 M185 1 L185 51 M215 1 L215 51" /></svg><div><span>t:</span>{[..."nagaram"].map((letter, index) => <i key={`t-${index}`}>{letter}</i>)}</div></div>
          <h3>Same Ingredients, Different Words!</h3>
          <p>Reena and her friend were preparing cookies. She has cookie cutters that are in the shape of letters; using them, she created the word "listen." When her friend got there, they rearranged the letters to form "silent." Reena started laughing and said, "Hey! The same letters were used by you“! Exactly — that's called an anagram!” Reena discovered that the ingredients are the same, but the shape is different, exactly like in baking.</p>
          <div className="example-card"><strong>Example 1:</strong><br />Input: s = "anagram", t = "nagaram"<br />Output: true</div>
          <div className="example-card"><strong>Example 2:</strong><br />Input: s = "rat", t = "car"<br />Output: false</div>
        </section> : isPalindromeArticle ? <section className="article-section" id="problem-statement">
          <h3>Problem Statement :</h3>
          <p>A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.</p>
          <p>Given a string <code>s</code>, return <code>true</code> if it is a palindrome, or <code>false</code> otherwise.</p>
          <div className="example-card"><strong>Example 1:</strong><br />Input: s = "A man, a plan, a canal: Panama"<br />Output: true<br />Explanation: "amanaplanacanalpanama" is a palindrome.</div>
          <div className="example-card"><strong>Example 2:</strong><br />Input: s = "race a car"<br />Output: false</div>
          <div className="example-card"><strong>Example 3:</strong><br />Input: s = " "<br />Output: true<br />Explanation: After removing non-alphanumeric characters, s is empty. An empty string reads the same forward and backward.</div>
        </section> : additionalStringArticleDetails[article] ? <section className="article-section" id="problem-statement">
          <h3>Problem Statement :</h3>
          <p>{additionalStringArticleDetails[article].statement}</p>
          <div className="example-card">{additionalStringArticleDetails[article].example}</div>
          <a className="official-problem-link" href={leetcodeUrl({ name: article })} target="_blank" rel="noreferrer">View the official problem on LeetCode <Icon name="arrow" size={14} /></a>
        </section> : <section className="article-section" id="problem-statement">
          <h3>Problem Statement :</h3>
          <p>This article covers <strong>{article}</strong>, a {topic} interview problem. Open the original LeetCode prompt for its complete statement, constraints, and examples.</p>
          <a className="official-problem-link" href={leetcodeUrl({ name: article })} target="_blank" rel="noreferrer">View the official problem on LeetCode <Icon name="arrow" size={14} /></a>
          <h3>How to approach this problem</h3>
          <p>{topicApproach}</p>
          <ol className="article-checklist"><li>Read the constraints and identify important edge cases.</li><li>Write down the invariant or state your solution must maintain.</li><li>Test the approach on a small example before implementing it.</li><li>Check the expected time and space complexity against the input limits.</li></ol>
        </section>}
        <section className="article-section" id="complexity-table">
          {isAnagramArticle || isPalindromeArticle || articleSolution ? <table className="complexity-table"><thead><tr><th>Method</th><th>Time Complexity</th><th>Space Complexity</th></tr></thead><tbody>{methods.map((method) => <tr key={method} className={selectedMethod === method ? "selected" : ""} onClick={() => setActiveMethod(method)}><td>{method} <span className="info-dot">i</span></td><td>{methodComplexities[method][0]}</td><td>{methodComplexities[method][1]}</td></tr>)}</tbody></table> : <a className="official-problem-link" href={leetcodeUrl({ name: article })} target="_blank" rel="noreferrer">See constraints and complexity on LeetCode <Icon name="arrow" size={14} /></a>}
        </section>
        <section className="article-section methods-section" id="methods">
          <div className={`method-flow${methods.length === 2 ? " two-methods" : ""}`} aria-label="Choose a solution method">
            <svg viewBox="0 0 580 170" preserveAspectRatio="none" aria-hidden="true"><path className={selectedMethod === methods[0] ? "active" : ""} d="M290 37 C290 83 100 76 100 133" />{methods.length === 3 && <path className={selectedMethod === methods[1] ? "active" : ""} d="M290 37 L290 133" />}<path className={selectedMethod === methods[methods.length - 1] ? "active" : ""} d="M290 37 C290 83 480 76 480 133" /></svg>
            <button className="flow-root" onClick={() => document.getElementById("methods")?.scrollIntoView({ behavior: "smooth" })}>Method</button>
            <div className="flow-branches">{methods.map((method) => <button key={method} className={`flow-node${selectedMethod === method ? " active" : ""}`} onClick={() => setActiveMethod(method)}>{method}</button>)}</div>
          </div>
          <h3>{selectedMethod}</h3>
          {isAnagramArticle ? selectedMethod === "Naive Approach" ? <><h4>Using Sorting and Comparing :</h4><p>Sorting both words places identical letters side-by-side. If the sorted words match, they're anagrams; otherwise, they're not.</p><h4>1. Sorting the String</h4><p>Sort both given strings (s and t) alphabetically at the same time.</p><h4>2. Comparing the strings</h4><p>Check if the sorted strings match exactly.<br />If they match, they’re anagrams—return true.<br />If no, they aren’t anagrams—return false.</p></> : <><h4>{selectedMethod === "Better Approach" ? "Using a Frequency Map :" : "Using a Character Frequency Array :"}</h4><p>Count the frequency of each character in both strings. If any character counts differ, the strings are not anagrams. The best approach uses a fixed-size frequency array for constant extra space.</p></> : isPalindromeArticle ? <><h4>{selectedMethod === "Naive Approach" ? "Normalize and Compare :" : "Two Pointers :"}</h4><p>{selectedMethod === "Naive Approach" ? "Build a normalized string containing only lowercase letters and digits, then compare it with its reverse." : "Scan inward from both ends, skip punctuation and spaces, and compare each pair of characters without creating another string."}</p></> : articleSolution ? <><h4>{selectedMethod}</h4><p>{articleSolution.explanation[selectedMethod]}</p></> : <><h4>{selectedMethod}</h4><p>{topicApproach}</p><p>Use the LeetCode prompt linked above to validate the required input, output, and edge cases before coding.</p></>}
          {(isAnagramArticle || isPalindromeArticle || articleSolution) && <div className="complexity-callout"><span>Time Complexity</span><strong>{methodComplexities[selectedMethod][0]}</strong><span>Space Complexity</span><strong>{methodComplexities[selectedMethod][1]}</strong></div>}
          <div className="code-block"><div className="code-toolbar"><strong>Code</strong><div className="language-tabs">{["Java", "C++", "Python"].map((item) => <button key={item} className={language === item ? "active" : ""} onClick={() => setLanguage(item)}>{item}</button>)}</div></div><div className="code-content">{codeForArticle ? <><button className="copy-code" onClick={copyCode}>{copied ? "Copied ✓" : "▢ Copy"}</button><pre className="numbered-code"><code>{codeForArticle.split("\n").map((line, index) => <span className="code-line" key={`${language}-${activeMethod}-${index}`}><span className="line-number">{index + 1}</span><span className="line-source">{line || " "}</span></span>)}</code></pre></> : <div className="code-unavailable">Open the official LeetCode problem to view its input format and write your solution in the online editor.<a href={leetcodeUrl({ name: article })} target="_blank" rel="noreferrer">Open LeetCode <Icon name="arrow" size={14} /></a></div>}</div></div>
        </section>
        <section id="article-topics" className="article-section"><h3>Topics</h3><div className="topic-tags"><span>String</span><span>Sorting</span><span>Hash Table</span><span>Interview Preparation</span></div></section>
        <footer className="article-footer"><a className="footer-brand" href="/"><span>DSA</span><strong>360</strong></a><span>Terms &amp; Conditions</span><span>Privacy Policy</span><button onClick={() => window.alert("Gift rewards are coming soon!")}>🎁 &nbsp;Claim gift</button><span>© 2026 DSA360. All rights reserved.</span></footer>
      </article>
      <aside className="article-toc"><h3>On this page</h3><a href="#problem-statement">Problem Statement</a><a href="#complexity-table">Complexity Table</a><a className="toc-method" href="#methods">Method</a>{methods.map((method, index) => <button key={method} className={activeMethod === method ? "active" : ""} onClick={() => { setActiveMethod(method); document.getElementById("methods")?.scrollIntoView({ behavior: "smooth" }); }}>{["I.", "II.", "III."][index]} {method}</button>)}</aside>
    </div>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
