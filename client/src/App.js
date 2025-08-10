import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setLoading(true);
        setError('');
        setResult('');

        try {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
          const response = await uploadFile(data);
          setResult(response.path);
        } catch (err) {
          setError(err.message || 'Upload failed. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <div className="main-wrapper">
      {/* Floating Pokémon silhouettes */}
      <div className="flying-silhouettes">
        <div className="silhouette" style={{ top: '20%', backgroundImage: "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png')" }}></div>
        <div className="silhouette" style={{ top: '50%', animationDelay: '4s', backgroundImage: "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png')" }}></div>
        <div className="silhouette" style={{ top: '70%', animationDelay: '8s', backgroundImage: "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png')" }}></div>
      </div>

      <div className="container">
        <div className="wrapper">
          <h1 className="pokemon-title">
            <span>Kinetic</span>
            <span>Share</span>
          </h1>
          <p>Catch your files and share them instantly ⚡</p>

          {/* Pokéball Upload Box */}
          <div className="pokeball-wrapper" onClick={onUploadClick}>
            <svg className="pokeball" viewBox="0 0 496 496" xmlns="http://www.w3.org/2000/svg">
              <circle cx="248" cy="248" r="240" fill="white" stroke="black" strokeWidth="16" />
              <path d="M8,248a240,240 0 0,1 480,0" fill="red" stroke="black" strokeWidth="16"/>
              <circle cx="248" cy="248" r="64" fill="white" stroke="black" strokeWidth="16"/>
              <circle cx="248" cy="248" r="32" fill="white" stroke="black" strokeWidth="8"/>
            </svg>
            <div className="sparkles"></div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          {result && (
            <a href={result} target="_blank" rel="noopener noreferrer">
              {result}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
