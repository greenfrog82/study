class Node():
        def __init__(self, name):
            self.name = name
            self.child = []

class CategoryTree:
    def __init__(self):
        self.root = None

    def add_category(self, name, parent):
        if not parent:
            self.root = Node(name)
        else:
            if self.get_node(self.root, name) or not self.get_node(self.root, parent):
                raise KeyError()
            else:
                node = self.get_node(self.root, parent)
                node.child.append(Node(name))
    
    def get_node(self, node, name):
        if node.name == name:
            return node
        else:
            for child_node in node.child:
                ret = self.get_node(child_node, name)
                if ret:
                    return ret

            return None

    def get_children(self, parent):
        if not self.get_node(self.root, parent):
            raise KeyError()
        else:
            found_node = self.get_node(self.root, parent)
            return [child.name for child in found_node.child]

c = CategoryTree()
c.add_category('A', None)
c.add_category('B', 'A')
c.add_category('C', 'A')
# c.add_category('B', 'A')
c.add_category('D', 'C')
c.add_category('F', 'C')

print('.'.join(c.get_children('C')))