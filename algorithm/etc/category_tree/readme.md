# Problem: Category Tree

A category tree is a representation of a set of categories and their parent-child relationships. Each category has a unique name (no two categories have the same name.) A category can have a parent category. Categories without a parent category are called root categories.

To add a category to a category tree, the name and the parent of the category should be provided. When adding a root category, a None value should be provided as the parent. A call to get_children should return an array containing the direct children of the specified category in any order.

KeyError should be thrown when adding a category that has already been added anywhere in the CategoryTree or if a parent is specified but does not exist.

For example:

```python
c = CategoryTree()
c.add_category('A', None)
c.add_category('B', 'A')
c.add_category('C', 'A')
print('.'.join(c.get_children('A')))
```