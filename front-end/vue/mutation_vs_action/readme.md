# Mutations vs Actions

## Mutation

* 스토어의 상태를 변경할 수 있는 유일한 방법. 이외의 방법으로도 상태를 변경할 수 있지만 이를 통해 하도록 디자인적으로 강제하고 있음.  
* Mutation에 작성되는 코드는 반드시 추적 가능해야함. 따라서 반드시 동기화 코드들만 작성해야함.

## Action

* 비동기 처리를 위한 코드들을 작성하는 곳.
* 스토어의 상태를 변경 시 Mutation을 호출.

## Consideration

![vuex.png](vuex.png)

위 그림을 보면 사용자 Component에서 특정 이벤트가 발생하였을 때 **Action**을 호출하고, **Action**에서는 Backend API 호출이 필요한 경우 호출 한 후 **Mutation**을 통해 **State**를 변경하고 있다.  
따라서, 위 그림만 보면 **Component**에서는 **Mutation**을 사용하면 안 될 것같은 생각이 든다.  

하지만, 공식 문서의 [Committing Mutations in Components](https://vuex.vuejs.org/guide/mutations.html#committing-mutations-in-components)에 보면 다음과 같은 내용이 있다. 

>You can commit mutations in components with this.$store.commit('xxx'), or use the mapMutations helper which maps component methods to store.commit calls (requires root store injection):

```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // map `this.increment()` to `this.$store.commit('increment')`

      // `mapMutations` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
    })
  }
}
```

공식 문서에서 **Component**에서 **Mutation**을 호출 할 수 있다고 안내하고 있음에도 불구하고 그림은 위와 같기 때문에 어떻게 사용하는 것이 Best Practice인지 혼란스럽다.  
이러한 혼란은 Vuex의 Github 이슈에도 다음과 같이 올라와있고 여전히 결론이 나지 않은 상황이다. 

[Should a component commit a mutation directly? #587](https://github.com/vuejs/vuex/issues/587)

## Conclusion

공식 문서를 아무리 찾아보아도 **Mutation**을 **Component**에서 호출하지 말라는 내용을 찾지 못했다.  
하지만 가이드가 될 만한 내용을 찾았는데 Vuex 공식문서 중 [Application Structure](https://vuex.vuejs.org/guide/structure.html)에 다음과 같은 내용이 있다. 

>Vuex doesn't really restrict how you structure your code. Rather, it enforces a set of high-level principles:
>
>1. Application-level state is centralized in the store.
>
>2. The only way to mutate the state is by committing **mutations**, which are synchronous transactions.
>
>3. Asynchronous logic should be encapsulated in, and can be composed with **actions**.

위와 같이 Vuex에서는 위 세가지 추상화 레벨의 원칙 외에 특별히 코드를 작성하는데 있어서 특별히 제약이 없다.  

따라서 다음과 같은 정도로 이해하고 사요하면 될 것 같다. 

### Mutation

* 오직 상태의 변경을 위한 동기화 코드들을 작성한다. 
* 이때 반드시 Atomic한 단위로 상태를 변경해야한다.  
* **Component**에서도 호출할 수 있다. 

### Action

* 비동기 코드들 예를들어 Back-End API와의 통신 등을 코드들을 작성한다. 
* 특정 이벤트에 대해서 여러가지 Mutation을 commit해야하는 경우 즉, 비즈니스 로직의 경우 **Action**에 코드를 작성한다. 

## Reference

* [Mutations](https://vuex.vuejs.org/guide/mutations.html)
* [Actions](https://vuex.vuejs.org/guide/actions.html)
* [Application Structure](https://vuex.vuejs.org/guide/structure.html)
* [Should a component commit a mutation directly? #587](https://github.com/vuejs/vuex/issues/587)
