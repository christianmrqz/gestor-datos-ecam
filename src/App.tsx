import React, { useState, useEffect } from 'react';
import ContentForm from './components/ContentForm';
import ContentList from './components/ContentList';
import Feedback from './components/Feedback';
import { fetchData, deleteData } from './services/api';
import './App.css';

interface Content {
  info: {
    id: number;
    position: number[];
  };
  content: any[];
}

const App: React.FC = () => {
  const [json, setJson] = useState<Content[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [view, setView] = useState<'form' | 'list'>('form');
  const [selectedContent, setSelectedContent] = useState<any>(null); // Estado para almacenar el contenido seleccionado para editar

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setJson(data);
        setFeedback('Data loaded successfully');
      } catch (error) {
        setFeedback('Error fetching data: ' + error);
      }
    };
    getData();
  }, []);

  const handleFormSubmit = async (newContent: any) => {
    try {
      setJson([...json, newContent]);
      setFeedback('Content added successfully');
    } catch (error) {
      setFeedback('Error adding content: ' + error);
    }
  };

  const handleEditContent = (content: any) => {
    setSelectedContent(content); // Al hacer clic en Edit, establece el contenido seleccionado para editar
    setView('form'); // Cambia a la vista de formulario para la edición
  };

  const handleDeleteContent = async (contentId: number) => {
    try {
      await deleteData(contentId);
      const updatedJson = json.filter(item => item.info.id !== contentId);
      setJson(updatedJson);
      setFeedback('Content deleted successfully');
    } catch (error) {
      setFeedback('Error deleting content: ' + error);
    }
  };

  return (
    <div className="App">
      <section className="bg-white dark:bg-gray-900">
        <div className="flex py-2 px-2 mx-10 lg:py-16">
          <div className="w-1/4 mr-8 text-start">
            <h3 className="text-lg font-bold mb-4">Select View</h3>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer ${
                  view === 'form' ? 'text-blue-600 font-bold' : 'text-gray-600'
                }`}
                onClick={() => setView('form')}
              >
                Content Form
              </li>
              <li
                className={`cursor-pointer ${
                  view === 'list' ? 'text-blue-600 font-bold' : 'text-gray-600'
                }`}
                onClick={() => setView('list')}
              >
                Content List
              </li>
            </ul>
          </div>

          <div className="w-3/4">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Content Manager</h2>
            {view === 'form' && (
              <ContentForm
                onSubmit={handleFormSubmit}
                initialContent={selectedContent} // Pasa el contenido seleccionado para editar
              />
            )}
            {view === 'list' && (
              <ContentList
                json={json}
                onEdit={handleEditContent}
                onDelete={handleDeleteContent}
              />
            )}
            <Feedback message={feedback} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
