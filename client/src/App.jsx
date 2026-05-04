import React, { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { useNoteStore } from './store/noteStore';

const App = () => {
  const { authUser, login, signup, logout, authCheck, isCheckingAuth } = useAuthStore();
  const { notes, fetchNotes, addNote, deleteNote, isFetchingNotes } = useNoteStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  useEffect(() => {
    if (authUser) {
      fetchNotes();
    }
  }, [authUser, fetchNotes]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let res;
    if (isLogin) {
      res = await login({ email, password });
    } else {
      res = await signup({ name, email, password });
    }

    if (!res.success) {
      setError(res.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (content === "" || title === "") {
      alert("Enter both title and content");
      return;
    }
    
    const res = await addNote({ title, content });
    if (res.success) {
      setContent("");
      setTitle("");
    } else {
      alert(res.message);
    }
  };

  const handleLogout = async () => {
    const res = await logout();
    if (!res.success) {
        alert(res.message);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl font-bold">Checking authentication...</p>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white p-5">
        <div className="w-full max-w-md bg-zinc-900 p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded outline-none focus:border-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded outline-none focus:border-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition-colors">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:underline font-medium"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen lg:flex bg-black text-white'>
      <div className='lg:w-1/2 flex flex-col'>
        <div className="p-10 flex justify-between items-center">
            <div>
                <h1 className='text-3xl font-bold'>My Notes</h1>
                <p className="text-zinc-400 text-sm">Welcome, {authUser.name}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-700"
            >
              Logout
            </button>
        </div>
        
        <form className='flex flex-col px-10 pb-10 gap-4'
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              submitHandler(e)
            }
          }}
          onSubmit={submitHandler}>
          <input
            type="text"
            placeholder='Title'
            className='px-5 py-3 bg-zinc-900 border border-zinc-800 rounded outline-none focus:border-white font-medium'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Content'
            className='px-5 h-48 py-3 bg-zinc-900 border border-zinc-800 rounded outline-none focus:border-white font-medium resize-none'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className='bg-white text-black font-bold px-5 py-3 rounded hover:bg-zinc-200 transition-colors'>
            Add Note
          </button>
        </form>
      </div>

      <div className="container flex flex-wrap gap-5 mt-5 lg:mt-0 overflow-y-auto flex-1 bg-zinc-100 p-8">
        {isFetchingNotes ? (
          <p className="text-black">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-zinc-500 w-full text-center mt-20">No notes yet. Add your first note!</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="h-64 w-60 rounded bg-white text-black p-5 flex flex-col shadow-md border border-zinc-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2 border-b pb-2">{note.title}</h3>
              <p className="text-sm text-zinc-600 wrap-break-word flex-1 overflow-y-auto sleek-scroll">
                {note.content}
              </p>
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 py-2 text-white font-medium rounded w-full mt-4 transition-colors"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App;