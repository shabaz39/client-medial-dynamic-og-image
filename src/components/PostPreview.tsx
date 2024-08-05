import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

interface PostData {
  title: string;
  content: string;
  image: File | null;
}

interface PostPreviewProps {
  post: PostData;
  ogImageUrl: string;
  submedial: string;
  submedialLogo: string;
  loadingOgImage: boolean; // Add loading state prop
}

const PostPreview: React.FC<PostPreviewProps> = ({
  post,
  ogImageUrl,
  submedial,
  submedialLogo,
  loadingOgImage
}) => {
  return (
    <div>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          {/* Left Side - Medial Info */}
          <div className="flex items-center">
            <img
              src="https://img.freepik.com/free-vector/gradient-coding-developers-logo_23-2148809440.jpg"
              alt={`${submedial} logo`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <h3 className="text-lg font-semibold">m/Developers Group</h3>
          </div>
          {/* Right Side - Medial Logo */}
          <div className="text-gray-400">
            <img
              src="https://medial.app/image/medial-purple-logo.png"
              alt="Medial logo"
              className="w-8 h-8"
            />
          </div>
        </div>

        {/* Post Title */}
        <h2 className="text-xl font-bold mt-4">{post.title}</h2>

        {/* Post Content */}
        <p className="text-gray-700 mt-2">{post.content}</p>

        {/* Post Image (if any) */}
        {post.image && (
          <img
            src={URL.createObjectURL(post.image)}
            alt="Post"
            className="mt-4 rounded-lg shadow-lg max-h-80 object-cover w-full"
          />
        )}
      </div>

      {/* OG Image Preview */}
      {!ogImageUrl && loadingOgImage ? (
        <div className="flex items-center justify-center mt-8">
          <BeatLoader color="#3498db" />
        </div>
      ) : ogImageUrl ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Generated OG Image:</h3>
          <a href={ogImageUrl} target="_blank" rel="noopener noreferrer" className="block mt-2">
            <img
              src={ogImageUrl}
              alt="OG Preview"
              className="rounded-lg shadow-lg max-h-80 object-cover w-full"
            />
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default PostPreview;
