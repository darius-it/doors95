<template>
  <div class="container">
    <h1>Kirby-Paris Hydra Simulation</h1>
    <div ref="cyContainer" class="cy" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import cytoscape from 'cytoscape'

const cyContainer = ref(null)
let cy
let nodeId = 0
let baseNodeSize = ref(30)
let growInterval = null

const colorPalette = [
  '#0074D9', '#FF4136', '#2ECC40', '#FF851B',
  '#7FDBFF', '#B10DC9', '#FFDC00', '#001f3f',
  '#39CCCC', '#3D9970'
]

function assignNodeColor(id, graph, nodeMap) {
  const usedColors = new Set()
  const neighbors = graph.filter(edge => edge.data.source === id || edge.data.target === id)

  for (const edge of neighbors) {
    const neighborId = edge.data.source === id ? edge.data.target : edge.data.source
    const neighbor = nodeMap.get(neighborId)
    if (neighbor && neighbor.colorIndex !== undefined) {
      usedColors.add(neighbor.colorIndex)
    }
  }

  for (let i = 0; i < colorPalette.length; i++) {
    if (!usedColors.has(i)) return i
  }

  return 0
}

function createHydra() {
  const nodes = []
  const edges = []
  const nodeMap = new Map()

  let idCounter = 0
  function newNodeId() {
    return `n${idCounter++}`
  }

  const rootId = newNodeId()
  const rootColorIndex = 0
  nodes.push({ data: { id: rootId, label: `😦 ${rootId}`, color: colorPalette[rootColorIndex] } })
  nodeMap.set(rootId, { colorIndex: rootColorIndex })

  for (let i = 0; i < 3; i++) {
    const level1Id = newNodeId()
    edges.push({ data: { id: `e${idCounter++}`, source: rootId, target: level1Id } })

    const colorIndex = assignNodeColor(level1Id, edges, nodeMap)
    nodes.push({ data: { id: level1Id, label: `😦 ${level1Id}`, color: colorPalette[colorIndex] } })
    nodeMap.set(level1Id, { colorIndex })

    for (let j = 0; j < 2; j++) {
      const level2Id = newNodeId()
      edges.push({ data: { id: `e${idCounter++}`, source: level1Id, target: level2Id } })

      const colorIndex = assignNodeColor(level2Id, edges, nodeMap)
      nodes.push({ data: { id: level2Id, label: `😦 ${level2Id}`, color: colorPalette[colorIndex] } })
      nodeMap.set(level2Id, { colorIndex })

      for (let k = 0; k < 2; k++) {
        const leafId = newNodeId()
        edges.push({ data: { id: `e${idCounter++}`, source: level2Id, target: leafId } })

        const colorIndex = assignNodeColor(leafId, edges, nodeMap)
        nodes.push({ data: { id: leafId, label: `😦 ${leafId}`, color: colorPalette[colorIndex] } })
        nodeMap.set(leafId, { colorIndex })
      }
    }
  }

  nodeId = idCounter
  return { nodes, edges }
}

function cutHead(head) {
  if (!head) return
  if (head.outgoers('edge').length > 0) {
    alert('Only leaf nodes (heads) can be cut!')
    return
  }

  const parent = head.incomers('node')[0]
  const grandparent = parent?.incomers('node')[0]

  if (grandparent) {
    const newSubtree = cloneSubtree(parent)
    attachSubtree(grandparent.id(), newSubtree)
  }

  cy.remove(head)

  // Reset node size
  baseNodeSize.value = 30
  cy.nodes().forEach(node => {
    node.style('width', baseNodeSize.value)
    node.style('height', baseNodeSize.value)
  })
}

function cloneSubtree(node) {
  const subtree = []
  const edges = []
  const idMap = new Map()

  function recurse(n) {
    const oldId = n.id()
    const newId = `n${++nodeId}`
    idMap.set(oldId, newId)
    const label = `😦 ${newId}`
    const colorIndex = Math.floor(Math.random() * colorPalette.length)
    subtree.push({ data: { id: newId, label, color: colorPalette[colorIndex] } })

    const children = n.outgoers('edge').targets()
    for (const child of children) {
      const childNew = recurse(child)
      edges.push({
        data: {
          id: `e${++nodeId}`,
          source: newId,
          target: childNew.data.id
        }
      })
    }

    return subtree[subtree.length - 1]
  }

  recurse(node)
  return { nodes: subtree, edges }
}

function attachSubtree(parentId, subtree) {
  const rootNode = subtree.nodes[0]
  cy.add([...subtree.nodes, ...subtree.edges])
  cy.add({
    data: {
      id: `e${++nodeId}`,
      source: parentId,
      target: rootNode.data.id
    }
  })

  cy.layout({
    name: 'breadthfirst',
    directed: true,
    animate: true,
    animationDuration: 500,
    padding: 10,
    spacingFactor: 1.5
  }).run()
}

onMounted(() => {
  cy = cytoscape({
    container: cyContainer.value,
    elements: createHydra(),
    style: [
      {
        selector: 'node',
        style: {
          'background-color': 'data(color)',
          'label': 'data(label)',
          'font-size': 16,
          'text-valign': 'center',
          'text-halign': 'center',
          'color': '#000',
          'text-outline-color': '#fff',
          'text-outline-width': 2,
          'width': baseNodeSize.value,
          'height': baseNodeSize.value
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 4,
          'line-color': '#666',
          'target-arrow-shape': 'triangle',
          'target-arrow-color': '#666',
          'curve-style': 'bezier',
          'opacity': 1
        }
      }
    ],
    layout: {
      name: 'breadthfirst',
      directed: true,
      padding: 10,
      spacingFactor: 1.5
    }
  })

  // Set initial node size
  cy.nodes().forEach(node => {
    node.style('width', baseNodeSize.value)
    node.style('height', baseNodeSize.value)
  })

  // Node growth
  growInterval = setInterval(() => {
    baseNodeSize.value *= 2
    cy.nodes().forEach(node => {
      node.style('width', baseNodeSize.value)
      node.style('height', baseNodeSize.value)
    })
  }, 500)

  // Handle node clicks
  cy.on('tap', 'node', (event) => {
    const node = event.target
    cutHead(node)
  })
})

onUnmounted(() => {
  clearInterval(growInterval)
})
</script>

<style>
.container {
  text-align: center;
}
.cy {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  margin-top: 10px;
}
</style>
