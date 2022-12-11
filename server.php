<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-Requested-With");

$file_url = './todo.json';

$file_text = file_get_contents($file_url);
$todo_list = json_decode($file_text);


if (isset($_POST['newTodoText'])) {
    // aggiungo un todo

    $newTodo = [
        'text' => $_POST['newTodoText'],
        'done' => false
    ];

    array_push($todo_list, $newTodo);
    file_put_contents($file_url, json_encode($todo_list));
} 
elseif (isset($_POST['toggleTodoIndex'])) {
    //togglo un todo
    $indexTodo = $_POST['toggleTodoIndex'];

    if($todo_list[$indexTodo]->done == 1){
        $todo_list[$indexTodo]->done = 0;
    } else {
        $todo_list[$indexTodo]->done = 1;
    }
    
    file_put_contents($file_url, json_encode($todo_list));
}
elseif (isset($_POST['deleteTodoIndex'])) {
    //elimino un todo

    $indexTodo = $_POST['deleteTodoIndex'];

    array_splice($todo_list, $indexTodo, 1);

    file_put_contents($file_url, json_encode($todo_list));

} 
else {

    header('Content-Type: application/json');
    echo json_encode($todo_list);

}

?>
