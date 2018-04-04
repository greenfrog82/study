class Node(object):
    pass

def loop_size(node):
    nodes = []
    tail_node = None

    while(not node in nodes):
        nodes.append(node)
        node = node.next

    return len(nodes) - nodes.index(node)
   
node1 = Node()
node1.next = node1

print loop_size(node1) # 1

node1 = Node()
node2 = Node()

node1.next = node2
node2.next = node1

print loop_size(node1) # 2

node1 = Node()
node2 = Node()
node3 = Node()

node1.next = node2
node2.next = node3
node3.next = node2

print loop_size(node1) # 2

# Make a short chain with a loop of 3
node1 = Node()
node2 = Node()
node3 = Node()
node4 = Node()
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node2

print loop_size(node1) # 3

nodes = [Node() for _ in xrange(50)]
for node, next_node in zip(nodes, nodes[1:]):
    node.next = next_node
nodes[49].next = nodes[21]

print loop_size(nodes[0]) # 29

nodes = [Node() for _ in xrange(3904)]
for node, next_node in zip(nodes, nodes[1:]):
    node.next = next_node
nodes[3903].next = nodes[2817]

print loop_size(nodes[0]) # 1087