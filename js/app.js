const app = new Vue({
    el: '#app',
    data: {
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        newTodo: '',
        todoList: [],
        currentUser: null,
    },
    created: function(){
        // 关闭页面后保存todoList和newTodo
        window.onbeforeunload = () => {
            const newTodo = JSON.stringify(this.newTodo);
            const dataString = JSON.stringify(this.todoList);
            window.localStorage.setItem('myTodos', dataString);
            window.localStorage.setItem('newTodo', newTodo);
        }

        let oldDataString = window.localStorage.getItem('myTodos');
        let oldTodoString = window.localStorage.getItem('newTodo');
        let oldData = JSON.parse(oldDataString);
        let oldTodo = JSON.parse(oldTodoString);
        this.todoList = oldData || [];
        this.newTodo = oldTodo || '';

        this.currentUser = this.getCurrentUser();
    },
    methods: {
        signUp: function() {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
            }, function (error) {
                alert('注册失败！');
            });
        },
        login: function() {
            const username = this.formData.username;
            const password = this.formData.password;
            AV.User.logIn(username, password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
                }, function (error) {
                    alert('登陆失败！');
                }
            );
        },
        logout: function() {
            AV.User.logOut();
            this.currentUser = null;
            window.location.reload();
        },
        getCurrentUser: function() {
            let current = AV.User.current();
            if(current) {
                let {id, createdAt, attributes: {username}} = AV.User.current();
                return {id, username, createdAt};
            } else {
                return null;
            }

        },
        getDateNow: function() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const detail = date.toTimeString().split(' ')[0];
            const pretty_time = `${year}年${month}月${day}日${detail}`;
            return pretty_time;
        },
        addTodo: function() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const detail = date.toTimeString().split(' ')[0];
            const pretty_time = `${year}年${month}月${day}日${detail}`;
            this.todoList.push({
                title: this.newTodo,
                createdAt: this.getDateNow(),
                done: false,
            });
            this.newTodo = '';
        },
        removeTodo: function(todo) {
            const index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
        }
    }
})
