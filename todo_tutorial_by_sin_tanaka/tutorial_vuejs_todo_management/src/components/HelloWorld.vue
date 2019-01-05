<template>
  <div>
    {{ msg }}

    <!-- formタグがあるとADD TASKボタンを押してもうまく動作しなかったため、削除した -->
    <!--<form>-->
      <button v-on:click="addTodo()">ADD TASK</button>
      <button v-on:click="removeTodo()">DELETE FINISHED TASKS</button>
      <p>input: <input type="text" v-model="newTodo"></p>
      <!-- データバインドしたnewTodoの値を表示する -->
      <p>task: {{ newTodo }} </p>
    <!--</form>-->
    <div class="task-list">
      <label class="task-list__item"
             v-for="todo in todos"
             v-bind:class="{ 'task-list__item--checked': todo.done }">
        <input type="checkbox" v-model="todo.done"></input>
        <input type="checkbox" v-model="todo.editing"></input>
        <input v-if="todo.editing" v-model="todo.text" @keyup.enter="todo.editing = !todo.editing">
        <span v-else>{{ todo.text }}</span>
      </label>
    </div>
  </div>
</template>

<script>
  // defaultという名前でexportした関数、自動的に default という名前がつけられ、importする際も名前を省略できる
export default {
  name: 'hello',

  // componentでは、dataはfunctionにする必要がある
  // data property should be function
  // data: {
  data () {
    return {
      msg: 'Welcome to Your Vue app',
      todos: [
        {'text': 'vue-router', done: false, editing: false},
        {'text': 'vuex', done: false, editing: false},
        {'text': 'vue-loader', done: false, editing: false},
        {'text': 'awesome-vue', done: true, editing: false}
      ],

      // inputタグにデータバインドするための項目
      newTodo: ''
    }
  },

  methods: {
    addTodo: function () {
      // let text = this.newTodo && this.newTodo.trim();
      let text = this.newTodo;

      if (!text){
        return
      }

      this.todos.push({
        text: text,
        done: false,
        editing: false,
      });
      this.newTodo = ''
    },

    vemoveTodo: function () {
      // todos配列に対し破壊的な変更をすることから、配列の長さが動的に変わるため、0に向かって走査
      for (let i = this.todos.length - 1; i >= 0; i--){
        if (this.todos[i].done){
          this.todos.splice(i, 1)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @mixin flex-vender() {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
  }
  .task-list {
    @include flex-vender;
    flex-direction: column;
    align-items: center;
    &__item {
      width: 270px;
      text-align: left;
      $element: #{&};
      &--checked {
        @extend #{$element};
        color: #85a6c6;
      }
    }
  }
</style>
