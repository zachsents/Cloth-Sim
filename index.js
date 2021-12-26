import Node from "./Node.js"
import Link from "./Link.js"
import * as Renderer from "./Renderer.js"
import Vector from "./Vector.js"

const NUM_NODES_X = 20,
      NUM_NODES_Y = 15,
      GRAVITY = new Vector(0, 0.05)

window.id = 0   // simple unique IDs

/*
*   Runs every time step
*/
function loop(nodes, links) {

    // Apply gravitational force
    nodes.forEach(node => {
        node.applyForce(GRAVITY)
    })

    // Apply damped-spring force
    links.forEach(link => {
        link.calculateForce()
    })

    // Apply forces to positions
    nodes.forEach(node => node.collapseVectors())

    // Redraw
    Renderer.draw(nodes, links)
}

/*
*   Main function
*/
async function run() {

    // Set up environment
    let {nodes, links} = createMesh(NUM_NODES_X, NUM_NODES_Y)
    // let {nodes, links} = createMesh(2, 2)
    
    // Set up renderer
    await Renderer.setup(nodes, links)

    // Start loop
    window.loopInt = setInterval(() => loop(nodes, links), 25)
    // for(let i = 0; i < 100; i++)
    //     loop(nodes, links)
}

function createMesh(numX, numY) {
    let nodes = [], links = []
    for(let i = 0; i < numX; i++) {
        nodes[i] = []   // start with 2D array to make link-forming easier
        for(let j = 0; j < numY; j++) {
            // create new node
            let newNode = new Node({
                x: i,
                y: j,
                pinned: j == 0
            })
            nodes[i].push(newNode)

            // create links to adjacent existing nodes
            if(i > 0) {
                links.push(new Link({
                    nodeA: newNode,
                    nodeB: nodes[i - 1][j]
                }))
            }
            if(j > 0) {
                links.push(new Link({
                    nodeA: newNode,
                    nodeB: nodes[i][j - 1]
                }))
            }
        }
    }
    return {nodes: nodes.flat(), links}
}

run()

window.stop = () => clearInterval(window.loopInt)