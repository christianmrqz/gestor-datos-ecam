export const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/data');
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data: ' + error);
  }
};

export const postData = async (newContent: { title: string; desc: string; url: string; type: string; }) => {
  try {
    console.log('Sending data:', newContent);
    const response = await fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContent),
    });
    if (!response.ok) {
      throw new Error('Failed to save content');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Failed to save content: ' + error);
  }
};

export const deleteData = async (contentId: number) => {
  try {
    const response = await fetch(`http://localhost:5000/api/data/${contentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Error deleting content: ' + error);
  }
};
