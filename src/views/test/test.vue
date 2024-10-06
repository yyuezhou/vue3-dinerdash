<template>
  <div>
    <h1>
      <h4>Dijkstra算法实现</h4>
      <!-- <div>{{ distances }}</div>
      <div>{{ distancesTwo }}</div>
      <div>{{ d3 }}</div>
      <div>冒泡排序算法实现</div>
      <div>{{ myArray }}</div>
      <div>是否质数算法</div>
      <div>15 {{ isPrime(15) }}</div>
      <div>17 {{ isPrime(17) }}</div> -->
    </h1>
  </div>
</template>
<script lang="ts" setup>
// Dijkstra用于计算图中一个节点到其他所有节点的最短路径

// 图的邻接表表示
// const graph = {
//   A: { B: 1, C: 4 },
//   B: { A: 1, C: 2, D: 5 },
//   C: { A: 4, B: 2, D: 1 },
//   D: { B: 5, C: 1 }
// };
// const graphTwo = {
//   A: { B: 1, C: 4 },
//   B: { A: 1, C: 2, D: 5 },
//   C: { A: 4, B: 2, D: 1 },
//   D: { B: 5, C: 1 }
// };

// // Dijkstra算法实现
// function dijkstra(graph, start) {
//   // 初始化距离表，所有距离都设为无穷大，除了起点设为0
//   const distances = {};
//   for (const vertex in graph) {
//     if (vertex !== start) {
//       distances[vertex] = Infinity;
//     } else {
//       distances[vertex] = 0;
//     }
//   }

//   // 优先队列，用于选择当前未处理的、距离最小的节点
//   const priorityQueue = [{ distance: 0, vertex: start }];

//   while (priorityQueue.length > 0) {
//     // 取出距离最小的节点
//     priorityQueue.sort((a, b) => a.distance - b.distance);
//     const current: any = priorityQueue.shift();

//     // 遍历当前节点的所有邻居
//     for (const neighbor in graph[current.vertex]) {
//       const edge = graph[current.vertex][neighbor];
//       const distance = current.distance + edge;

//       // 如果找到了更短的路径，则更新距离，并将其加入优先队列
//       if (distance < distances[neighbor]) {
//         distances[neighbor] = distance;
//         priorityQueue.push({ distance, vertex: neighbor });
//       }
//     }
//   }

//   return distances;
// }

// // 使用Dijkstra算法计算从节点'A'到所有其他节点的最短距离
// const distances = dijkstra(graph, "A");
// console.log(distances);
// const distancesTwo = dijkstra(graphTwo, "B");
// console.log(distancesTwo);
// // 输出: { A: 0, B: 1, C: 3, D: 4 }
// // 注意：这里只计算了从起点'A'到所有其他节点的距离

// // *****************************************************************************************************************************************
// // *****************************************************************************************************************************************
// let INF = Number.MAX_SAFE_INTEGER; //1
// const graphThree = [
//   [0, 2, 4, 0, 0, 0],
//   [0, 0, 1, 4, 2, 0],
//   [0, 0, 0, 0, 3, 0],
//   [0, 0, 0, 0, 0, 2],
//   [0, 0, 0, 3, 0, 2],
//   [0, 0, 0, 0, 0, 0]
// ];
// function dijkstraTwo(src) {
//   let dist: any = [], //2
//     visited: any = [], //3
//     length = graphThree.length; //4

//   for (let i = 0; i < length; i++) {
//     dist[i] = INF;
//     visited[i] = false;
//   } //5
//   dist[src] = 0;

//   for (let i = 0; i < length - 1; i++) {
//     let u = minDistance(dist, visited);
//     visited[u] = true;

//     for (let v = 0; v < length; v++) {
//       if (!visited[v] && dist[u] !== INF && graph[u][v] > 0 && dist[u] + graph[u][v] < dist[v]) {
//         dist[v] = dist[u] + graph[u][v];
//       }
//     }
//   }

//   return dist;
// }

// function minDistance(dist, visited) {
//   let min = INF,
//     minIndex = -1;

//   for (let v = 0; v < dist.length; v++) {
//     if (visited[v] === false && dist[v] <= min) {
//       min = dist[v];
//       minIndex = v;
//     }
//   }

//   return minIndex;
// }
// const d3 = dijkstraTwo(graphTwo);
// console.log(d3);

// // *****************************************************************************************************************************************
// // *****************************************************************************************************************************************
// function bubbleSort(arr) {
//   let n = arr.length;
//   let swapped;
//   do {
//     swapped = false;
//     for (let i = 1; i < n; i++) {
//       // 比较相邻的元素，如果前一个比后一个大，则交换它们
//       if (arr[i - 1] > arr[i]) {
//         // 交换 arr[i-1] 和 arr[i]
//         let temp = arr[i - 1];
//         arr[i - 1] = arr[i];
//         arr[i] = temp;
//         swapped = true;
//       }
//     }
//     // 每次遍历后，最后一个元素是最大的，所以可以减少遍历的范围
//     n -= 1;
//   } while (swapped);
//   return arr;
// }

// // 测试冒泡排序
// let myArray = [64, 34, 25, 12, 22, 11, 90];
// console.log("Original array:", myArray);
// bubbleSort(myArray);
// console.log("Sorted array: ", myArray);

// // *****************************************************************************************************************************************
// // *****************************************************************************************************************************************
// function isPrime(num) {
//   // 小于2的数不是质数
//   if (num < 2) {
//     return false;
//   }
//   // 检查从2到sqrt(num)之间是否有能整除num的数
//   // 只需要检查到sqrt(num)即可，因为如果num有一个因子大于sqrt(num)，
//   // 那么另一个因子必定小于sqrt(num)，而我们已经在前面的迭代中检查过了
//   for (let i = 2, sqrtNum = Math.sqrt(num); i <= sqrtNum; i++) {
//     if (num % i === 0) {
//       // 如果找到了一个能整除num的数，则num不是质数
//       return false;
//     }
//   }
//   // 如果没有找到能整除num的数，则num是质数
//   return true;
// }

// 测试质数检测函数
// console.log(isPrime(1)); // false
// console.log(isPrime(2)); // true
// console.log(isPrime(3)); // true
// console.log(isPrime(4)); // false
// console.log(isPrime(11)); // true
// console.log(isPrime(15)); // false
// *****************************************************************************************************************************************
// *****************************************************************************************************************************************
// 给定一个列表，在坐标中，求出能覆盖所有坐标的直线的最小数目。
// function minLinesToCover(points) {
//   if (points.length <= 1) return points.length;

//   points.sort((a, b) => {
//     if (a[0] === b[0]) return a[1] - b[1]; // 如果x相同，按y排序
//     return a[0] - b[0]; // 按x排序
//   });

//   let lines: any = [];
//   let currentLine: any = [points[0], points[0]]; // 初始化当前直线为通过第一个点的水平线

//   for (let i = 1; i < points.length; i++) {
//     let [x, y] = points[i];

//     // 检查点是否在当前直线的“合理延伸”上
//     // 这里我们使用一个非常简化的判断：如果y坐标与当前直线结束点的y坐标相同或非常接近
//     // 在实际应用中，你可能需要更复杂的逻辑来确定“合理延伸”
//     if (Math.abs(y - currentLine[1][1]) < 1e-6) {
//       // 假设非常接近（考虑浮点数精度）
//       currentLine[1] = points[i]; // 更新当前直线的结束点
//     } else {
//       // 如果不在当前直线的合理延伸上，则开始一条新直线
//       lines.push(currentLine);
//       currentLine = [points[i - 1], points[i]]; // 使用前一个点和当前点开始新直线
//     }
//   }

//   // 不要忘记添加最后一条直线（如果它存在）
//   if (currentLine[0] !== currentLine[1]) {
//     lines.push(currentLine);
//   }

//   return lines.length;
// }

// 测试
// let points = [
//   [1, 2],
//   [2, 3],
//   [3, 5],
//   [4, 4],
//   [5, 1]
// ];
// console.log(minLinesToCover(points)); // 输出可能不是最优的，因为贪心策略可能不是全局最优的

//
// function handleCount(parent: string, sub: string) {
//   let count = 0;
//   let index = 0;
//   let isExit = (index = parent.indexOf(sub, index)) !== -1;
//   if (!isExit) return 0;
//   while (isExit) {
//     count++;
//     index += sub.length;
//   }
//   return count;
// }
// let t = handleCount("anccsan", "an");
// console.log("t", t);
</script>
