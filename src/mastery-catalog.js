import { masterySourceGroups } from "./mastery-source.js";

const problemAliases = {
  addandsearchword: "designaddandsearchwordsdata",
  buystocksi: "besttimetobuyandsellstock",
  buysellstocksi: "besttimetobuyandsellstock",
  stockbuysell: "besttimetobuyandsellstock",
  stockbuyandsell: "besttimetobuyandsellstock",
  mergeoverlappingintervals: "mergeintervals",
  longestsubstringwithoutrepeating: "longestsubstringwithoutrepeatingcharacters",
  combinationsumi: "combinationsum",
  rottenoranges: "rottingoranges",
  circulartourgasstation: "gasstation",
  checkifbtmirrorofitselfornot: "symmetrictree",
  kmostfrequentelements: "topkfrequentelements",
  medianfromstream: "findmedianfromdatastream",
  smallestrangeinksortedlist: "smallestrangecoveringelementsfromklists",
  wordbreakproblem: "wordbreak",
  implementatrie: "implementtrieprefixtree",
  floodfillalgorithm: "floodfill",
  buysellstocksii: "besttimetobuyandsellstockii",
  wildcardpatternmatching: "wildcardmatching",
  maxlengthofpairchain: "maximumlengthofpairchain",
  powerset: "subsets",
  maxxoroftwonumbers: "maximumxoroftwonumbersinanarray",
  kadanesalgorithm: "maximumsubarray",
  findduplicate: "findtheduplicatenumber",
  maxareainhistogram: "largestrectangleinahistogram",
  maxproductsubarray: "maximumproductsubarray",
  searchin2dmatrix: "searcha2dmatrix",
  searchinsortedmatrixii: "searcha2dmatrixii",
  reversewordsinstring: "reversewordsinastring",
  minimumspanningtree: "mincosttoconnectallpoints",
  minimumcosttoconnectallpoints: "mincosttoconnectallpoints",
};

export const normalizeProblem = (name) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return problemAliases[normalized] || normalized;
};

const groups = masterySourceGroups;
const topicIndexes = new Map(groups.map(([name], index) => [name, index]));
const seedTopic = {
  "Two Sum": "Arrays & Hashing",
  "Valid Anagram": "Arrays & Hashing",
  "Contains Duplicate": "Arrays & Hashing",
  "Maximum Subarray": "Prefix Sum & Difference Array",
  "House Robber": "Dynamic Programming",
  "Coin Change": "Dynamic Programming",
  "Merge Intervals": "Intervals",
  "Kth Largest Element in an Array": "Heap / Priority Queue",
  "Jump Game": "Greedy",
  Subsets: "Backtracking",
  "Number of Islands": "Graphs",
  "Binary Search": "Binary Search",
  "3Sum": "Two Pointers",
  "Product of Array Except Self": "Prefix Sum & Difference Array",
  "Longest Substring Without Repeating Characters": "Sliding Window",
  "Word Break": "Dynamic Programming",
  "Course Schedule": "Graphs",
  "Top K Frequent Elements": "Heap / Priority Queue",
  "Daily Temperatures": "Stack & Monotonic Stack",
  "Search in Rotated Sorted Array": "Binary Search",
  "Climbing Stairs": "Dynamic Programming",
  "Valid Parentheses": "Stack & Monotonic Stack",
  "Reverse Linked List": "Linked List",
  "Maximum Depth of Binary Tree": "Trees",
  "Rotting Oranges": "Graphs",
  "Longest Increasing Subsequence": "Dynamic Programming",
  "Container With Most Water": "Two Pointers",
  "Koko Eating Bananas": "Binary Search",
  "Combination Sum": "Backtracking",
  "LRU Cache": "Linked List",
};
const topicOverrides = {
  "Partition Labels": "Greedy",
  "Maximum Population Year": "Prefix Sum & Difference Array",
  "Car Pooling": "Prefix Sum & Difference Array",
  "Video Stitching": "Greedy",
  "Employee Importance": "Trees",
  "Minimum Number of Operations to Make Array Continuous": "Sliding Window",
  "Patching Array": "Greedy",
  "Non-decreasing Array": "Greedy",
  "Word Break": "Dynamic Programming",
  "Word Break II": "Dynamic Programming",
  "Minimum Genetic Mutation": "Advanced Graphs",
  "Word Ladder": "Advanced Graphs",
  "Alien Dictionary": "Advanced Graphs",
  "Count Vowels Permutation": "Advanced DP",
  "Path Sum III": "Trees",
  "Subarray Product Less Than K": "Sliding Window",
  "Trapping Rain Water II": "Advanced Graphs",
  "House Robber": "Dynamic Programming",
};

export const masteryGroups = groups.map(([name, description]) => [name, description, []]);
const seen = new Set();
const addProblem = (question, topicIndex) => {
  const key = normalizeProblem(question[0]);
  if (seen.has(key)) return;
  seen.add(key);
  masteryGroups[topicIndex][2].push({
    name: question[0],
    level: question[1],
    slug: question[0].toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  });
};

groups[0][2].forEach((question) => {
  const topicIndex = topicIndexes.get(seedTopic[question[0]]) ?? 0;
  addProblem(question, topicIndex);
});
groups.slice(9).forEach((group, offset) => {
  const defaultIndex = offset + 9;
  group[2].forEach((question) => {
    const override = topicOverrides[question[0]];
    addProblem(question, override ? topicIndexes.get(override) : defaultIndex);
  });
});

export const masteryProblemCount = masteryGroups.reduce((sum, [, , problems]) => sum + problems.length, 0);
