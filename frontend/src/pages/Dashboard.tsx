import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import { Task } from '../types';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
  }>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks({ search, status: statusFilter, priority: priorityFilter });
      setTasks(response.data);
    } catch {
      console.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter, priorityFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask._id, formData);
      } else {
        await taskAPI.createTask(formData);
      }
      setFormData({ title: '', description: '', status: 'pending' as const, priority: 'medium' as const });
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch {
      console.error('Failed to save task');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        fetchTasks();
      } catch {
        console.error('Failed to delete task');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Task Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span>Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">
                  {editingTask ? 'Edit Task' : 'Add New Task'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Task title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <textarea
                    placeholder="Description (optional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      {editingTask ? 'Update' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingTask(null);
                        setFormData({ title: '', description: '', status: 'pending' as const, priority: 'medium' as const });
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid gap-4">
              {tasks.length === 0 ? (
                <div className="text-center text-gray-500">No tasks found</div>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{task.title}</h3>
                        {task.description && (
                          <p className="text-gray-600 mt-1">{task.description}</p>
                        )}
                        <div className="flex space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;