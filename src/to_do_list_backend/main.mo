import Array "mo:base/Array";
import Iter "mo:base/Iter";
actor {
  stable var todos : [Text] = [];

  public func addTask(task : Text) : async () {
    todos := Array.append(todos, [task]);
  };

  public func removeTask(index : Nat) : async () {
    if (index < todos.size()) {
      var newTodos : [Text] = [];
      for (i in Iter.range(0, todos.size() - 1)) {
        if (i != index) {
          newTodos := Array.append(newTodos, [todos[i]]);
        };
      };
      todos := newTodos;
    };
  };

  public query func getTasks() : async [Text] {
    return todos;
  };
};
