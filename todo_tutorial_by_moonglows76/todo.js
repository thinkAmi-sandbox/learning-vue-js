const vm = new Vue({
    el: '#app',
    data: {
        items: [
            // title: ToDoの内容、 isChecked: チェック済判定
            { title: 'ご飯を食べる', isChecked: true },
            { title: 'お風呂に入る', isChecked: true },
            { title: '寝る', isChecked: false },
        ],
        // ToDoを追加する時にデータバインドするプロパティ
        newItemTitle: ''
    },

    // mountedには、初期表示時に動作するものを定義する
    mounted: function(){
        this.loadTodo();
    },

    // 必要なメソッド類
    methods: {
        // ToDoを追加するためのメソッドを用意
        addTodo: function (newTitle) {
            this.items.push({
                title: newTitle,
                isChecked: false
            });

            // ToDoリストを追加した後に、入力欄をクリアする
            this.newItemTitle = '';

            // ToDoのリストを追加したら、ブラウザのローカルストレージに保存する
            this.saveTodo();
        },
        
        // ToDoを削除するためのメソッド
        deleteTodo: function () {
            // filter()を使う (内包表記みたいなもの?)
            // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            this.items = this.items.filter(function (item) {
                return !item.isChecked;
            });

            // ToDoのリストを削除しても、ローカルストレージに保存する
            this.saveTodo();
        },

        // ToDoをブラウザのローカルストレージに保存する
        // applicationタブで Storage > localStorage > file:// で探す
        saveTodo: function () {
            // .setItem(フィールド名, 値)で、ローカルストレージに保存可能
            // ただし、値は配列のままではNGのため、JSON文字列化しておく
            localStorage.setItem('items', JSON.stringify(this.items));
        },
        
        // ToDoをローカルストレージから読み出す
        loadTodo: function () {
            this.items = JSON.parse(localStorage.getItem('items'));
            // データがない場合は、空配列を入れる
            if (!this.items){
                this.items = [];
            }
        }
    }
});