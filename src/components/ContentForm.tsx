import React, { useState } from 'react';
import { postData } from '../services/api';

interface ContentFormProps {
  onSubmit: (response: any) => void;
  initialContent?: any;
}

const ContentForm: React.FC<ContentFormProps> = ({ onSubmit, initialContent }) => {
  const [title, setTitle] = useState(initialContent?.title || '');
  const [desc, setDesc] = useState(initialContent?.desc || '');
  const [url, setUrl] = useState(initialContent?.url || '');
  const [type, setType] = useState(initialContent?.type || 'image');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    if ((type === 'image' || type === 'video') && !isValidURL(url)) {
      alert('Invalid URL for the selected type');
      return;
    }

    const contentItem = {
      url,
      desc,
      type,
      title
    };

    try {
      const response = await postData(contentItem);
      onSubmit(response);
      setTitle('');
      setDesc('');
      setUrl('');
      setType('image');
    } catch (error) {
      alert('Error saving content');
    }
  };

  const isValidURL = (inputURL: string): boolean => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(inputURL);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="desc" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      {type === 'image' && (
        <div className="mb-2">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Image URL</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      {type === 'video' && (
        <div className="mb-2">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Video URL</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      {type === 'modelo2d' && (
        <div className="mb-2">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Model 2D URL</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      {type === 'game' && (
        <div className="mb-2">
          <label htmlFor="gameId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Game ID</label>
          <input
            id="gameId"
            type="text"
            value={url} // Aquí url contiene el ID del juego en lugar de la URL
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      <div className="mb-2">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Type</label>
        <select
          id="type"
          value={type}
          onChange={handleTypeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="modelo2d">Model 2D</option>
          <option value="game">Game</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialContent ? 'Update Content' : 'Add Content'}
      </button>
    </form>
  );
};

export default ContentForm;
