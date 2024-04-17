import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";
import { addCommentToPost, getPostById } from "@/lib/appwrite/api";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const [comments, setComments] = useState<string[]>(post.comments || []);
  const [comment, setComment] = useState<string>("");
  const [, setPost] = useState<Models.Document | null>(null);

  const updatePostData = async (postId: string | undefined) => {
    try {
      const updatedPost = await getPostById(postId);

      if (updatedPost) {
        setPost(updatedPost);
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error("Error fetching updated post data:", error);
    }
  };

  const handleSubmitComment = async (postId: string, commentText: string) => {
    try {
      if (!commentText.trim()) return;

      await addCommentToPost(postId, commentText);

      setComments([...comments, commentText]);

      setComment("");

      updatePostData(postId);
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle error
    }
  };

  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />

      <div className="comment-list">
        {post.comments.map((comment: string | null | undefined) => (
          <div className="comment italic border border-pink-400 rounded px-2 py-0.5 m-2">
            <p>{comment}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitComment(post.$id, comment);
        }}
        className="mt-4 flex">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="w-12 lg:h-12 rounded-full mr-2"
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Add a comment..."
          className="border border-gray-300 rounded px-2 py-1 w-full text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded ml-2">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostCard;
