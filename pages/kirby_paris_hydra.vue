<template>
  <div class="container">
    <h1>Kirby-Paris Hydra Simulation</h1>
    <button @click="cutHead">Cut Head</button>
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

// Create a complex hydra tree for a longer game
function createHydra() {
  const nodes = []
  const edges = []

  let idCounter = 0
  function newNodeId() {
    return `n${idCounter++}`
  }

  const rootId = newNodeId()
  nodes.push({ data: { id: rootId, label: `😦 ${rootId}` } })

  for (let i = 0; i < 3; i++) {
    const level1Id = newNodeId()
    nodes.push({ data: { id: level1Id, label: `😦 ${level1Id}` } })
    edges.push({ data: { id: `e${idCounter++}`, source: rootId, target: level1Id } })

    for (let j = 0; j < 2; j++) {
      const level2Id = newNodeId()
      nodes.push({ data: { id: level2Id, label: `😦 ${level2Id}` } })
      edges.push({ data: { id: `e${idCounter++}`, source: level1Id, target: level2Id } })

      for (let k = 0; k < 2; k++) {
        const leafId = newNodeId()
        nodes.push({ data: { id: leafId, label: `😦 ${leafId}` } })
        edges.push({ data: { id: `e${idCounter++}`, source: level2Id, target: leafId } })
      }
    }
  }

  nodeId = idCounter
  return { nodes, edges }
}

function cutHead() {
  const leaves = cy.nodes().filter(n => n.outgoers('edge').length === 0)
  if (leaves.length === 0) {
    alert('No heads to cut!')
    return
  }

  const head = leaves[0]
  const parent = head.incomers('node')[0]
  const grandparent = parent?.incomers('node')[0]

  if (grandparent) {
    const newSubtree = cloneSubtree(parent)
    attachSubtree(grandparent.id(), newSubtree)
  }

  cy.remove(head)

  // Reset node size after cut
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
    subtree.push({ data: { id: newId, label: `😦 ${newId}` } })

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
          'background-color': '#0074D9',
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

  // Initialize node size
  cy.nodes().forEach(node => {
    node.style('width', baseNodeSize.value)
    node.style('height', baseNodeSize.value)
  })

  // Gradually increase node size over time
  growInterval = setInterval(() => {
    baseNodeSize.value *= 2
    cy.nodes().forEach(node => {
      node.style('width', baseNodeSize.value)
      node.style('height', baseNodeSize.value)
    })
  }, 500)
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
