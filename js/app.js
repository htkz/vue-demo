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
        // 关闭页面后保存newTodo
        window.onbeforeunload = () => {
            const newTodo = JSON.stringify(this.newTodo);
            window.localStorage.setItem('newTodo', newTodo);
        }
        let oldTodoString = window.localStorage.getItem('newTodo');
        let oldTodo = JSON.parse(oldTodoString);
        this.newTodo = oldTodo || '';

        // 从数据库读取todolist
        this.currentUser = this.getCurrentUser();
        this.fetchTodos();
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
                console.log(error);
            });
        },
        login: function() {
            const username = this.formData.username;
            const password = this.formData.password;
            AV.User.logIn(username, password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
                this.fetchTodos();
                }, function (error) {
                    alert('登陆失败！');
                    console.log(error);
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
            this.todoList.push({
                title: this.newTodo,
                createdAt: this.getDateNow(),
                done: false,
            });
            this.newTodo = '';
            this.saveOrUpdateTodos();
        },
        removeTodo: function(todo) {
            const index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
            this.saveOrUpdateTodos();
        },
        saveTodos: function() {
            const dataString = JSON.stringify(this.todoList);
            const AVTodos = AV.Object.extend('AllTodos');
            let avTodos = new AVTodos();
            // set access control list
            let acl = new AV.ACL();
            acl.setReadAccess(AV.User.current(), true);
            acl.setWriteAccess(AV.User.current(), true);

            avTodos.set('content', dataString);
            avTodos.setACL(acl);
            avTodos.save().then((todo) => {
                this.todoList.id = todo.id;
                console.log(this.todoList);
                console.log(todo);
                console.log('save success!');
            }, function(error) {
                alert('保存失败！');
                console.log(error);
            })
        },
        updateTodos: function() {
            const dataString = JSON.stringify(this.todoList);
            console.log(this.todoList.id);
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id);
            avTodos.set('content', dataString);
            avTodos.save().then(() => {
                console.log('update successfully!');
            })
        },
        saveOrUpdateTodos: function() {
            if(this.todoList.id){
                console.log('update');
                this.updateTodos();
            } else {
                console.log('save');
                this.saveTodos();
            }
        },
        fetchTodos: function() {
            if(this.currentUser) {
                const query = new AV.Query('AllTodos');
                query.find().then((todos) => {
                    const avAllTodos = todos[0];
                    const id = avAllTodos.id;
                    this.todoList = JSON.parse(avAllTodos.attributes.content);
                    this.todoList.id = id;
                }, function(error) {
                    console.log(error);
                })
            }
        }
    }
})
