import React, { ChangeEvent, FormEvent, useState } from 'react';


interface PostData {
  title: string;
  content: string;
  image: File | null;
}

interface PostFormProps {
  onSubmit: (postData: PostData) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, image });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };


  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src="https://img.freepik.com/free-vector/gradient-coding-developers-logo_23-2148809440.jpg" alt="Submedial Logo" className="w-8 h-8 mr-2 rounded-full" />
          <span className="text-lg font-semibold text-gray-700">m/Developers Group</span>
        </div>
        <img src="https://medial.app/image/medial-purple-logo.png" alt="Medial Logo" className="w-8 h-8" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200"
          />
        </div>

        <div className="flex items-center justify-between">
        <button
            type="reset"
            onClick={handleRemoveImage}
            className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Remove Image
          </button>
          <button
            type="submit"
            className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Generate Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
