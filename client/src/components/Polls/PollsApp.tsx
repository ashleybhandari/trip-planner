import React, { useState } from 'react';

type Poll = {
  id: number;
  question: string;
  options: string[];
};

const PollsApp: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [editingPoll, setEditingPoll] = useState<Poll | null>(null);

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const resetForm = () => {
    setQuestion('');
    setOptions(['', '']);
    setEditingPoll(null);
  };

  const handleSubmit = () => {
    if (!question.trim() || options.filter(opt => opt.trim()).length < 2) {
      alert('Enter a question and at least two options.');
      return;
    }

    const trimmedOptions = options.filter(opt => opt.trim());

    if (editingPoll) {
      setPolls(polls.map(p => p.id === editingPoll.id ? { ...p, question, options: trimmedOptions } : p));
    } else {
      const newPoll: Poll = {
        id: Date.now(),
        question,
        options: trimmedOptions,
      };
      setPolls([...polls, newPoll]);
    }

    resetForm();
  };

  const handleEdit = (poll: Poll) => {
    setEditingPoll(poll);
    setQuestion(poll.question);
    setOptions(poll.options);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      setPolls(polls.filter(p => p.id !== id));
      if (editingPoll?.id === id) resetForm();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>{editingPoll ? 'Edit Poll' : 'Create a Poll'}</h2>
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          style={{ width: '100%', marginBottom: '8px' }}
        />
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={e => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            style={{ width: '100%', marginBottom: '4px' }}
          />
        </div>
      ))}
      <button onClick={handleAddOption}>Add Option</button>
      <br /><br />
      <button onClick={handleSubmit}>
        {editingPoll ? 'Update Poll' : 'Create Poll'}
      </button>
      {editingPoll && <button onClick={resetForm} style={{ marginLeft: '10px' }}>Cancel Edit</button>}
      <hr />
      <h3>All Polls</h3>
      {polls.length === 0 ? <p>No polls yet.</p> : (
        <ul>
          {polls.map(poll => (
            <li key={poll.id} style={{ marginBottom: '15px' }}>
              <strong>{poll.question}</strong>
              <ul>
                {poll.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <button onClick={() => handleEdit(poll)}>Edit</button>
              <button onClick={() => handleDelete(poll.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PollsApp;