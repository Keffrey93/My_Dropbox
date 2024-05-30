import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import Loader from './Loader';
import FileIcon from '../assets/file-icon.png';
import ImageIcon from '../assets/image-icon.png';
import DownloadIcon from '../assets/download-icon.png';
import DeleteIcon from '../assets/delete-icon.png';
import ShareIcon from '../assets/share-icon.png';

const FileList = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [copyText, setCopyText] = useState('');
  const [error, setError] = useState('');

  const getFiles = async () => {
    setLoading(true);
    setError('');
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUserId(authUser.username);
      const response = await axios.get(`https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-list?userId=${authUser.username}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const fileDownload = async (fileName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-download?userId=${userId}&fileName=${fileName}`);
      window.open(response.data.url);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Error downloading file');
    } finally {
      setLoading(false);
    }
  };

  const fileDelete = async (fileName) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-delete?userId=${userId}&fileName=${fileName}`);
      getFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      setError('Error deleting file');
      setLoading(false);
    }
  };

  const copyLink = (fileName) => {
    const link = `https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-download?userId=${userId}&fileName=${fileName}`;
    navigator.clipboard.writeText(link);
    setCopyText('Link copied!');
    setTimeout(() => setCopyText(''), 3000);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {copyText && <p className="text-green-500 text-center">{copyText}</p>}
      <div className="mt-5 w-11/12 mx-auto">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Folder</th>
                <th scope="col" className="px-6 py-3">File Name</th>
                <th scope="col" className="px-6 py-3">Preview</th>
                <th scope="col" className="px-6 py-3">Last Modified</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 text-center">/</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                  <td className="px-6 py-4">
                    <img src={item.type.includes('application') ? FileIcon : ImageIcon} alt="" className="w-8 h-8" />
                  </td>
                  <td className="px-6 py-4">{item.lastModified}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <img className="cursor-pointer w-6 h-6" src={DownloadIcon} alt="Download" onClick={() => fileDownload(item.name)} />
                    <img className="cursor-pointer w-6 h-6" src={DeleteIcon} alt="Delete" onClick={() => fileDelete(item.name)} />
                    <img className="cursor-pointer w-6 h-6" src={ShareIcon} alt="Share" onClick={() => copyLink(item.name)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FileList;
