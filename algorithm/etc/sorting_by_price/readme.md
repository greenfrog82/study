# Problem: Sorting by Price

Implement the function sort_by_price_ascending, which:

* Accepts a string in JSON format, as in the example below.
* Orders items by price in ascending order.
* If two products have the same price, it orders them by their name in alphabetical order.
* Returns a string in JSON format that is equivalent to the one in the input foramt.

For example, the call

```python
Products.sort_by_price_ascending(
  '[{"name":"eggs","price":1},
  {"name":"coffee","price":9.99},
  {"name":"rice","price":4.04}]'
);
```
should return

```python
'[{"name":"eggs","price":1}, 
{"name":"rice","price":4.04},
{"name":"coffee","price":9.99}]'
```
