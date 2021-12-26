
const SCALE = 20
const NODE_SIZE = 5

export function setup(nodes, links) {
    return new Promise(resolve => {
        window.onload = () => {
            const sim = document.getElementById('sim')
            sim.innerHTML = ''

            // setup divs for Nodes
            for(let node of nodes) {
                let newDiv = document.createElement('div')
                newDiv.id = node.id
                newDiv.classList.add('node')
                newDiv.style.width = newDiv.style.height = NODE_SIZE
                newDiv.style.transform = `translate(${node.pos.x() * SCALE}px,${node.pos.y() * SCALE}px)`
                sim.appendChild(newDiv)
            }

            // setup SVG for links
            let linkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            linkSvg.id = 'links'

            // setup lines for Links
            for(let link of links) {
                // create line
                let newLine = document.createElementNS('http://www.w3.org/2000/svg','line')
                newLine.id = link.id
                newLine.classList.add('link')
                // newLine.setAttribute('stroke', 'white')

                // set x's and y's
                setLinePosition(newLine, link.nodeA.pos, link.nodeB.pos)

                // add line to SVG
                linkSvg.appendChild(newLine)
            }

            // add SVG to document
            sim.appendChild(linkSvg)

            resolve()
        }
    })
}

export function draw(nodes, links) {
    for(let node of nodes) {
        let nodeDiv = document.getElementById(node.id)
        nodeDiv.style.transform = `translate(${node.pos.x() * SCALE}px,${node.pos.y() * SCALE}px)`
    }

    for(let link of links)
        setLinePosition(document.getElementById(link.id), link.nodeA.pos, link.nodeB.pos)
}

function setLinePosition(lineElement, v, u) {
    lineElement.setAttribute('x1', round(v.x() * SCALE + NODE_SIZE / 2, 1))
    lineElement.setAttribute('y1', round(v.y() * SCALE + NODE_SIZE / 2, 1))
    lineElement.setAttribute('x2', round(u.x() * SCALE + NODE_SIZE / 2, 1))
    lineElement.setAttribute('y2', round(u.y() * SCALE + NODE_SIZE / 2, 1))
}

function round(num, places) {
    const scale = Math.pow(10, places)
    return Math.round(num * scale) / scale
}