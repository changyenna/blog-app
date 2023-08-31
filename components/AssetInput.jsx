import { useState } from 'react';
import 'isomorphic-fetch';

export default function AssetInput({ onAssetUploaded }) {
  const [url, setUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const fetchRes = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!fetchRes.ok) {
        setUploadStatus('Upload failed');
      } else {
        const data = await fetchRes.json();
        if (onAssetUploaded) {
          onAssetUploaded(data.id);
          setUploadStatus('Upload successful');
          try {
            const publishRes = await fetch(`/api/publish-asset/${data.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            console.log('Publishing response status:', publishRes.status);

            if (!publishRes.ok) {
              console.error('Publishing failed:', await publishRes.text());
            } else {
              console.log('Asset published successfully');
            }
          } catch (error) {
            console.error('Error while making the publish request:', error);
          }
        }
      }
    } catch (error) {
      setUploadStatus('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="py-3 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 flex-initial"
          placeholder="copy & paste image address"
        />
        <div className="flex-none">
          <button
            type="submit"
            className={`ml-2 py-3 px-4 bg-indigo-500 text-white rounded-lg flex items-center ${
              uploading ? 'cursor-wait' : 'hover:bg-indigo-600'
            }`}
            disabled={uploading}
          >
            {uploading && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {uploading ? 'Processing...' : 'Upload'}
          </button>
        </div>
      </form>
      {uploadStatus && (
        <p
          className={
            uploadStatus === 'Upload successful'
              ? 'text-green-500 mt-2'
              : 'text-red-500 mt-2'
          }
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
}
