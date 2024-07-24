import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
    const DirAccessEndpoint = 'http://localhost:3001/API/DirAccess/';
    const fileAccessEndpoint = 'http://localhost:3001/API/FileAccess/';

    const [dirStack, setDirStack] = useState(['College/']);
    const [dirContents, setDirContents] = useState(null);

    useEffect(() => {
        const currURL = dirStack.map(dir => encodeURIComponent(dir.replace(/\//g, ''))).join('/');
        axios.get(DirAccessEndpoint + currURL)
            .then(response => {
                setDirContents(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [dirStack]);

    const handleDoubleClick = (item) => {
        if (item.includes('.')) {
            const fileURL = fileAccessEndpoint + dirStack.map(dir => encodeURIComponent(dir.replace(/\//g, ''))).join('/') + '/' + encodeURIComponent(item);
            window.open(fileURL, '_blank');
        } else {
            setDirStack([...dirStack, item + '/']);
        }
    }

    const handleBackClick = () => {
        if (dirStack.length > 1) {
            setDirStack(dirStack.slice(0, -1));
        }
    }

    return (
        <div>
            {dirContents && dirContents.map((item, index) => (
                <div key={index} onDoubleClick={() => handleDoubleClick(item)}>
                    {item}
                </div>
            ))}
            <br />
            <button onClick={handleBackClick}>Back</button>
        </div>
    );
}

export default Homepage;



/*

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
    const DirAccessEndpoint = 'http://localhost:3001/API/DirAccess/';
    const fileAccessEndpoint = 'http://localhost:3001/API/FileAccess/';

    const [currURL, setCurrURL] = useState('College/');
    const [dirContents, setDirContents] = useState(null);

    useEffect(() => {
        axios.get(DirAccessEndpoint + currURL)
            .then(response => {
                setDirContents(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [currURL]);

    const handleDoubleClick = (item) => {
        if (item.includes('.')) {
            window.open(fileAccessEndpoint + currURL + item, '_blank');
        } else {
            setCurrURL(currURL + item + '/');
        }
    }

    return (
        <div>
            {dirContents && dirContents.map((item, index) => (
                <div key={index} onDoubleClick={() => handleDoubleClick(item)}>
                    {item}
                </div>
            ))}
        </div>
    );
}

export default Homepage;

*/