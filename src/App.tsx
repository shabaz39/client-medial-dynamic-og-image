import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostPreview from './components/PostPreview';
import { Helmet } from 'react-helmet';


interface PostData {
  title: string;
  content: string;
  image: File | null;
}

const App: React.FC = () => {
  const [post, setPost] = useState<PostData | null>(null);
  const [ogImageUrl, setOgImageUrl] = useState<string>('');
  const [loadingOgImage, setLoadingOgImage] = useState<boolean>(false);



  const handleGeneratePost = async (postData: PostData) => {
    setPost(postData);
    setLoadingOgImage(true); // Set loading state for OG image


    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    if (postData.image) {
      formData.append('image', postData.image);
    }

    try {


      const response = await fetch('https://server-medial-repo-image-33kongoinq-uc.a.run.app/generate-og-image', {
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

    console.log(ogImageUrl)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
       <Helmet>
        <meta property="og:title" content={post?.title || 'Dynamic Post Page with OG Image Generation'} />
        <meta property="og:description" content={post?.content.slice(0, 150) || ''} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://client-medial-dynamic-og-image-33kongoinq-uc.a.run.app/" />
      </Helmet>

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
            loadingOgImage={loadingOgImage} // Pass loading state
          />
        </div>
      )}
    </div>
  );
};

export default App;
