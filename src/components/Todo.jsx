import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaTrash, FaCheck, FaEdit, FaSave } from 'react-icons/fa';
import "./Todo.scss";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Erro ao carregar tarefas:", e);
        localStorage.removeItem('tasks');
      }
    }
  }, []);

  // Salvar tarefas no localStorage quando alteradas
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Focar no input de edição quando um item é marcado para edição
  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      date: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    
    // Adicionar animação ao elemento
    setTimeout(() => {
      const taskElement = document.getElementById(`task-${task.id}`);
      if (taskElement) {
        taskElement.classList.add('appear');
      }
    }, 10);
    
    // Focar no input novamente
    inputRef.current.focus();
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    const taskElement = document.getElementById(`task-${id}`);
    if (taskElement) {
      taskElement.classList.add('disappear');
      // Esperar a animação terminar antes de remover o item
      setTimeout(() => {
        setTasks(tasks.filter(task => task.id !== id));
      }, 300);
    } else {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === '') return;
    
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: editText } : task
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // Filtrar tarefas de acordo com o filtro selecionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Formatar data
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Lista de Tarefas</h2>
      
      <form className="todo-form" onSubmit={handleAddTask}>
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Adicionar nova tarefa..."
          className="todo-input"
        />
        <button type="submit" className="add-button" disabled={newTask.trim() === ''}>
          <FaPlus />
        </button>
      </form>
      
      <div className="todo-filters">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Ativas
        </button>
        <button 
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Concluídas
        </button>
      </div>
      
      <div className="todo-status">
        <span>{filteredTasks.length} {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}</span>
        {tasks.some(task => task.completed) && (
          <button 
            className="clear-completed"
            onClick={() => setTasks(tasks.filter(task => !task.completed))}
          >
            Limpar Concluídas
          </button>
        )}
      </div>
      
      <ul className="todo-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <li 
              key={task.id} 
              id={`task-${task.id}`}
              className={`todo-item ${task.completed ? 'completed' : ''}`}
            >
              {editingId === task.id ? (
                <div className="edit-container">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                    className="edit-input"
                  />
                  <button onClick={() => saveEdit(task.id)} className="save-button">
                    <FaSave />
                  </button>
                </div>
              ) : (
                <>
                  <div className="task-content">
                    <button 
                      className={`complete-button ${task.completed ? 'active' : ''}`}
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.completed && <FaCheck />}
                    </button>
                    <div className="task-text-container">
                      <p className="task-text">{task.text}</p>
                      <span className="task-date">{formatDate(task.date)}</span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button 
                      className="edit-button"
                      onClick={() => startEditing(task)}
                      disabled={task.completed}
                    >
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(task.id)} className="delete-button">
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li className="no-tasks">
            <p>Nenhuma tarefa encontrada</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Todo; 