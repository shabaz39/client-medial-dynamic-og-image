import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostPreview from './components/PostPreview';


interface PostData {
  title: string;
  content: string;
  image: File | null;
}

const App: React.FC = () => {
  const [post, setPost] = useState<PostData | null>(null);
  const [ogImageUrl, setOgImageUrl] = useState<string>('');

  const handleGeneratePost = async (postData: PostData) => {
    setPost(postData);

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    if (postData.image) {
      formData.append('image', postData.image);
    }

    try {


      const response = await fetch(`http://localhost:8080/generate-og-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOgImageUrl(data.ogImageUrl);
    } catch (error) {
      console.error('Error generating OG image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Dynamic Post Page with OG Image Generation</h1>
      <div className="w-full max-w-4xl">
        <PostForm onSubmit={handleGeneratePost} />
      </div>
      {post && (
        <div className="w-full max-w-4xl mt-8">
          <PostPreview
            post={post}
            ogImageUrl={ogImageUrl}
            submedial="m/Developers Group"
            submedialLogo="https://medial.app/image/medial-purple-logo.png"
          />
        </div>
      )}
    </div>
  );
};

export default App;
