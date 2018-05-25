# Mutations vs Actions

## Mutation

* 스토어의 상태를 변경할 수 있는 유일한 방법. 이외의 방법으로도 상태를 변경할 수 있지만 이를 통해 하도록 디자인적으로 강제하고 있음.  
* Mutation에 작성되는 코드는 반드시 추적 가능해야함. 따라서 반드시 동기화 코드들만 작성해야함.

## Action

* 비동기 처리를 위한 코드들을 작성하는 곳.
* 스토어의 상태를 변경 시 Mutation을 호출.

## Consideration

![vuex.png](vuex.png)

## Reference

* [Mutations](https://vuex.vuejs.org/guide/mutations.html)
* [Actions](https://vuex.vuejs.org/guide/actions.html)
* [Application Structure](https://vuex.vuejs.org/guide/structure.html)